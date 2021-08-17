import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { updateDiary } from '../../businessLogic/diaries'
import { UpdateDiaryRequest } from '../../requests/UpdateDiaryRequest'
import { getUserId } from '../utils'

const logger =  createLogger('lambda:updateDiary');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const diaryId = event.pathParameters.diaryId
    const updatedDiary: UpdateDiaryRequest = JSON.parse(event.body)
    const userId = getUserId(event)

    if (!diaryId) {
      
      logger.error(`diary id ${diaryId} is missing`)
      
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'diaryId is required'
        }) 
      }
    }

    logger.info(`user id ${userId} makes a request to update diary id ${diaryId}`)

    await updateDiary(diaryId, userId, updatedDiary)

    return {
      statusCode: 200,
      body: JSON.stringify({})
    }
  }
)

handler
  .use(
    cors({
      credentials: true
    })
  )

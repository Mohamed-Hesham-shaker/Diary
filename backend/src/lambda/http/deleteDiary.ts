import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { deleteDiary } from '../../businessLogic/diaries'
import { getUserId } from '../utils'

const logger =  createLogger('lambda:deleteDiary');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const diaryId = event.pathParameters.diaryId
    const userId = getUserId(event)

    logger.info(`user id ${userId} makes a request to delete diary with id ${diaryId}`)

    if (!diaryId) {
      
      logger.error(`diary id ${diaryId} is missing`)
      
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'diaryId is required'
        }) 
      }
    }


    await deleteDiary(diaryId, userId)

    logger.info(`Delete diary item ${diaryId}`)

    return {
      statusCode: 200,
      body: JSON.stringify({})
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )

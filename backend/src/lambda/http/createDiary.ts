import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateDiaryRequest } from '../../requests/CreateDiaryRequest'
import { getUserId } from '../utils';
import { createDiary } from '../../businessLogic/diaries'
import { createLogger } from '../../utils/logger'

const logger =  createLogger('lambda:createDiary');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newDiary: CreateDiaryRequest = JSON.parse(event.body)

    const userId = getUserId(event)

    logger.info(`user id ${userId} makes a request to create diary`)

    const item = await createDiary(newDiary, userId)

    logger.info(`Creating diary item ${item} for ${userId}`)
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        item
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)

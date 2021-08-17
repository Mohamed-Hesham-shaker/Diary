import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { getDiariesForUser as getDiariesForUser } from '../../businessLogic/diaries'
import { getUserId } from '../utils';

const logger = createLogger('lambda:getDiaries')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    
    logger.info(`User ${userId} is requesting his diaries items`)
    
    const items = await getDiariesForUser(userId);

    logger.info(`Getting diaries items ${items} of ${userId}`)
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        items
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
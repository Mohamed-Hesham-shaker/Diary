import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { getDiaryById } from '../../businessLogic/diaries'
import { createAttachmentPresignedUrl } from '../../businessLogic/diaries'
import { getUserId } from '../utils'

const logger = createLogger('lambda:generateUploadUrl')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const diaryId = event.pathParameters.diaryId
    const userId = getUserId(event)

    if(!diaryId){
      logger.error(`diary id ${diaryId} is missing`)
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'diaryId is required'
        }) 
      }
    }

    const item = await getDiaryById(diaryId, userId)
    if (item.Count == 0){
      logger.error(`diary id ${diaryId} is not found`)
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'diary is not found'
        }) 
      }
    }

    if (item.Items[0].userId !== userId) {
      logger.error(`the user ${userId} is requesting diary put url and this this diary ${diaryId} is owned by another user`)
      return {
        statusCode: 401,
        body: 'diary belong to another user'
      }
    }

    const url = await createAttachmentPresignedUrl(diaryId);
    
    logger.info(`Getting signed URL ${url} for diary id ${diaryId}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: url
      })
    }
  }
)

handler
  .use(
    cors({
      credentials: true
    })
  )

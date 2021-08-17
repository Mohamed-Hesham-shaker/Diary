import { DiariesAccess } from '../dataLayer/diariesAccess'
import { CreateDiaryRequest } from '../requests/CreateDiaryRequest'
// import { getUploadUrl } from '../dataLayer/attachmentUtils';
import { DiaryItem } from '../models/DiaryItem'
import { UpdateDiaryRequest } from '../requests/UpdateDiaryRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

const logger = createLogger('businessLogic:diaries')

const diariesAccess = new DiariesAccess()
const bucketName = process.env.ATTACHMENT_S3_BUCKET

export async function getDiaryById(diaryId: string, userId: string) : Promise<any>{
    return await diariesAccess.getDiaryById(diaryId, userId)
}  

export async function createAttachmentPresignedUrl(diaryId: string): Promise<string> {
    return await getUploadUrl(diaryId)
} 

export async function createDiary(
    createDiaryRequest: CreateDiaryRequest,
    userId: string
): Promise<DiaryItem>{

    const diaryId = uuid.v4()
    logger.info(`Generating uuid value ${diaryId}`)

    return await diariesAccess.createDiary({
        diaryId,
        userId,
        ...createDiaryRequest,
        createdAt: new Date().toISOString(),
        dayGoalDone: false,
        attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${diaryId}`
    })
}

// export async function getTodosForUser(userId: string) : Promise<TodoItem[]>{
//     return await todoAccess.getTodosForUser(userId)
// } 

// export async function deleteTodo(todoId: string, userId: string){
//     return await todoAccess.deleteTodo(todoId, userId)
// }

export async function updateDiary(diaryId: string, userId: string, updatedDiary: UpdateDiaryRequest){
    return await diariesAccess.updateDiary(diaryId, userId, updatedDiary)
}

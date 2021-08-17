import { DiaryAccess } from '../dataLayer/diariesAccess'
import { CreateDiaryRequest } from '../requests/CreateDiaryRequest'
import { getUploadUrl } from '../dataLayer/attachmentUtils';
import { DiaryItem } from '../models/DiaryItem'
// import { UpdateDiaryRequest } from '../requests/UpdateDiaryRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

const logger = createLogger('businessLogic:diaries')

const diaryAccess = new DiaryAccess()
const bucketName = process.env.ATTACHMENT_S3_BUCKET

// export async function getTodoById(diaryId: string, userId: string) : Promise<any>{
//     return await todoAccess.getTodoById(todoId, userId)
// }  

// export async function createAttachmentPresignedUrl(todoId: string): Promise<string> {
//     return await getUploadUrl(todoId)
// } 

export async function createDiary(
    createDiaryRequest: CreateDiaryRequest,
    userId: string
): Promise<DiaryItem>{

    const diaryId = uuid.v4()
    logger.info(`Generating uuid value ${diaryId}`)

    return await diaryAccess.createDiary({
        diaryId,
        userId,
        ...createDiaryRequest,
        createdAt: new Date().toISOString(),
        done: false,
        attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${diaryId}`
    })
}

// export async function getTodosForUser(userId: string) : Promise<TodoItem[]>{
//     return await todoAccess.getTodosForUser(userId)
// } 

// export async function deleteTodo(todoId: string, userId: string){
//     return await todoAccess.deleteTodo(todoId, userId)
// }

// export async function updateTodo(todoId: string, userId: string, updatedTodo: UpdateTodoRequest){
//     return await todoAccess.updateTodo(todoId, userId, updatedTodo)
// }

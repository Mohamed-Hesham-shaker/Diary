import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { DiaryItem } from '../models/DiaryItem'
// import { DiaryUpdate } from '../models/DiaryUpdate';


const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
  
const logger = createLogger('dataLayer:diariesAccess')

export class DiariesAccess {
    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly diariesTable = process.env.DIARIES_TABLE,
        private readonly createdAtIndex = process.env.CREATED_AT_INDEX 
        ){
    }

    async getDiaryById(diaryId: string, userId: string): Promise<AWS.DynamoDB.QueryOutput>{
        
        logger.info(`Getting diary item by id ${diaryId} for user ${userId}`)

        return await this.docClient.query({
            TableName: this.diariesTable,
            IndexName: this.createdAtIndex,
            KeyConditionExpression: 'diaryId = :diaryId and userId = :userId',
            ExpressionAttributeValues:{
                ':diaryId': diaryId,
                ":userId": userId
            }
        }).promise()   
    }

    

    async createDiary(diaryItem: DiaryItem): Promise<DiaryItem>{
        
        await this.docClient.put({
            TableName: this.diariesTable,
            Item: diaryItem
        }).promise()
        
        return diaryItem
    }

    // async getTodosForUser(userId: string): Promise<TodoItem[]> {
       
    //    const result = await this.docClient.query({
    //       TableName: this.todosTable,
    //       IndexName: this.createdAtIndex,
    //       KeyConditionExpression: 'userId = :userId',
    //       ExpressionAttributeValues:{
    //           ":userId": userId
    //       }
    //     }).promise() 
        
    //     return result.Items as TodoItem[]
    // }

    // async deleteTodo(todoId: string, userId: string) {
        
    //     await this.docClient.delete({
    //         TableName: this.todosTable,
    //         Key: {
    //           todoId,
    //           userId
    //         }
    //     }).promise() 
        
    //     logger.info(`Deleted todo ${todoId} for user ${userId}`)
    // }

    // async updateTodo(todoId: string, userId: string, updatedTodo: TodoUpdate){
         
    //     await this.docClient.update({
    //         TableName: this.todosTable,
    //         Key: {
    //           todoId,
    //           userId
    //         },
    //         UpdateExpression: 'set #name = :name, #dueDate = :dueDate, #done = :done',
    //         ExpressionAttributeNames: {
    //           '#name': 'name',
    //           '#dueDate': 'dueDate',
    //           '#done': 'done'
    //         },
    //         ExpressionAttributeValues: {
    //             ':name': updatedTodo.name,
    //             ':dueDate': updatedTodo.dueDate,
    //             ':done': updatedTodo.done
    //         }
    //     }).promise()
        
    //     logger.info(`Updated todo ${todoId} for user ${userId}`) 
    // }

}
export interface DiaryItem {
  userId: string
  diaryId: string
  createdAt: string
  mood: string
  activities: string
  dayGoalDone: boolean
  attachmentUrl?: string
}

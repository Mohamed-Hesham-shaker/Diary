export interface DiaryItem {
  userId: string
  diaryId: string
  createdAt: string
  Mood: string
  Activities: string
  dayGoalDone: boolean
  attachmentUrl?: string
}

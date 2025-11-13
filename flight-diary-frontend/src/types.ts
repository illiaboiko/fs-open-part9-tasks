export interface DiaryEntry {
  id: number
  date: string
  weather: string
  visibility: string
}

export interface DiaryEntryExtended extends DiaryEntry {
  comment: string
}

export type NewDiaryEntry = Omit<DiaryEntryExtended, 'id'>

export interface AppNotification {
    text: string
    type: "success" | "error"
}

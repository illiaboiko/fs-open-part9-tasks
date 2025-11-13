import { useEffect, useState } from 'react'
import './App.css'
import type { DiaryEntry, AppNotification } from './types'
import { getAllDiaries } from './services/diaryService'
import Content from './components/Content'
import NewEntryForm from './components/NewEntryForm'
import NotificationComponent from './components/NotificationComponent'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [appNotification, setAppNotification] = useState<AppNotification | null>(null)

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data))
  }, [])

  const addEntry = (entry: DiaryEntry) => {
    setDiaries(diaries.concat(entry))
  }

  const notify = (notification: AppNotification): void => {
    setAppNotification(notification)
    setTimeout(() => {
      setAppNotification(null)
    }, 3000)
  }

  return (
    <>
      <div className="container">
        <h1>Flight Diaries</h1>
        <NotificationComponent notification={appNotification}/>
        <NewEntryForm onAddDiary={addEntry} notify={notify}/>
        <Content diaries={diaries} />
      </div>
    </>
  )
}

export default App

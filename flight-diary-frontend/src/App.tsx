import { useEffect, useState } from 'react'
import './App.css'
import type { DiaryEntry } from './types'
import { getAllDiaries } from './services/diaryService'
import Content from './components/Content'
import NewEntryForm from './components/NewEntryForm'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data))
  }, [])

  const addEntry = (entry: DiaryEntry) => {
    setDiaries(diaries.concat(entry))
  }

  return (
    <>
      <h1>Flight Diaries</h1>
      <NewEntryForm onAddDiary={addEntry} />
      <Content diaries={diaries} />
    </>
  )
}

export default App

import React, { useState } from 'react'
import type { DiaryEntry } from '../types'
import { createDiary } from '../services/diaryService'

type newEntryFormProps = {
  onAddDiary: (entry: DiaryEntry) => void
}

const NewEntryForm = ({ onAddDiary }: newEntryFormProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const newEntry = await createDiary({ date, visibility, weather, comment })
      onAddDiary(newEntry)
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    } catch (error) {
      console.log('Error Adding entry:', error)
    }
  }

  return (
    <div>
      <form>
        <h3>New Diary</h3>

        <div>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="visibility">Visibility</label>
          <input
            type="text"
            name="visibility"
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="weather">Weather</label>
          <input
            type="text"
            name="weather"
            id="weather"
            value={weather}
            onChange={(e) => {
              setWeather(e.target.value)
            }}
          />
        </div>

        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>
  )
}

export default NewEntryForm

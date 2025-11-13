import React, { useState } from 'react'
import { visibilityValues, weatherValues, type AppNotification, type DiaryEntry, type Visibility, type Weather } from '../types'
import { createDiary } from '../services/diaryService'
import axios from 'axios'

type newEntryFormProps = {
  onAddDiary: (entry: DiaryEntry) => void
  notify: (notification: AppNotification) => void
}

const NewEntryForm = ({ onAddDiary, notify }: newEntryFormProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility | undefined>(
    undefined
  )
  const [weather, setWeather] = useState<Weather | undefined>(undefined)
  const [comment, setComment] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!visibility || !weather) {
      notify({ text: 'Please select weather or visibility', type: 'error' })
      return
    }

    try {
      const newEntry = await createDiary({ date, visibility, weather, comment })
      onAddDiary(newEntry)
      setDate('')
      setVisibility(undefined)
      setWeather(undefined)
      setComment('')
      notify({ text: 'Success! Diary added', type: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const msg =
          error.response.data.error?.message || error.response.data.message
        notify({ text: msg, type: 'error' })
        // notify({ text: `smth went wrong: ${error.message}`, type: 'error' })
      } else {
        notify({ text: 'Unknown Error', type: 'error' })
      }
    }
  }

  return (
    <div>
      <form>
        <h3>New Diary</h3>

        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Visibility: </label>
          {visibilityValues.map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
              {v}
            </label>
          ))}
        </div>

        <div>
          <label>Weather: </label>
          {weatherValues.map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
              {w}
            </label>
          ))}
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

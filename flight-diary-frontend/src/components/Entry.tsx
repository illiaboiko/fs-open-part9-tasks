import type { DiaryEntry } from '../types'

const Entry = ({ date, weather, visibility }: DiaryEntry) => {
  return (
    <div>
      <h3>{date}</h3>
      <p>visibility: {visibility}</p>
      <p>weather: {weather}</p>
    </div>
  )
}

export default Entry

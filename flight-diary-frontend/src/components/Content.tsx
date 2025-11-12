import type { DiaryEntry } from '../types'
import Entry from './Entry'

const Content = ({ diaries }:{diaries: DiaryEntry[]}) => {
  return (
    <>
      <h2>Diary Entries</h2>
      {diaries.map((d) => (
        <Entry
              key={d.id}
              date={d.date}
              weather={d.weather}
              visibility={d.visibility} id={0}        />
      ))}
    </>
  )
}

export default Content

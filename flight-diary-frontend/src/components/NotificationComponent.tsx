import type { AppNotification } from '../types'

interface NotificationProps {
  notification: AppNotification | null
}

const NotificationComponent = ({ notification }: NotificationProps) => {
  return (
    <span
      className={`notification ${notification ? 'show' : ''} ${
        notification?.type || ''
      }`}
    >
      {notification?.text}
    </span>
  )
}

export default NotificationComponent

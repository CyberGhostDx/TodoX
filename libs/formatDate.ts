const formatDate = (d: string) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const time = new Date(d)
  const today = new Date()
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  )
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
  )
  const day = time.getDay()
  const date = time.getDate()
  const month = time.getMonth()
  const year = time.getFullYear()
  if (time.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) return "Today"
  if (time.setHours(0, 0, 0, 0) == tomorrow.getTime()) return "Tomorrow"
  if (time.setHours(0, 0, 0, 0) == yesterday.getTime()) return "Yesterday"
  if (year != today.getFullYear())
    return `${days[day]}, ${date} ${months[month]} ${year}`

  return `${days[day]}, ${date} ${months[month]}`
}

export default formatDate

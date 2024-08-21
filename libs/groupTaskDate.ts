import type { Task, TaskCategories } from "@/types"
import formatDate from "@/libs/formatDate"

type GroupByDate = {
  name: string
  tasks: (Task & { category: string })[]
}[]

const groupTaskByDate = (categories: TaskCategories) => {
  let today = new Date()
  today = new Date(today.setHours(0, 0, 0, 0))

  const allTasks = categories
    .map((category) =>
      category.tasks.map((task) => ({ ...task, category: category.name })),
    )
    .flat()

  const groupByDate: GroupByDate = [
    { name: "Today", tasks: [] },
    { name: "Tomorrow", tasks: [] },
    { name: "Late", tasks: [] },
    { name: "No Date", tasks: [] },
  ]

  let taskByDate: GroupByDate = []

  allTasks.forEach((task) => {
    const group = formatGroupDate(task.date)
    if (groupByDate.find((g) => g.name == group)) {
      const groupIndex = groupByDate.findIndex((g) => g.name == group)
      groupByDate[groupIndex].tasks.push(task)
    } else {
      taskByDate.push({ name: task.date, tasks: [task] })
    }
  })

  taskByDate = taskByDate
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
    .map((task) => ({ ...task, name: formatDate(task.name) }))

  return [...groupByDate, ...taskByDate]
}

const formatGroupDate = (d: string) => {
  if (!d) return "No Date"
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
  if (time.getTime() < today.setHours(0, 0, 0, 0)) return "Late"
  if (time.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) return "Today"
  if (time.setHours(0, 0, 0, 0) == tomorrow.getTime()) return "Tomorrow"
  if (time.setHours(0, 0, 0, 0) == yesterday.getTime()) return "Yesterday"
  return d
}

export default groupTaskByDate

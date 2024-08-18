import { ButtonProps as NextButtonProps } from "@nextui-org/button"

export type ButtonProps = NextButtonProps & {
  icon?: React.ReactNode
}

export type Task = {
  id: string
  name: string
  note: string
  tag: string
  date: string
  starred: boolean
  done: boolean
}

export type TaskCategory = {
  name: string
  tasks: Task[]
}

export type Tag = {
  name: string
  color: Color
}

export type Color = `#${string}`

export type TaskCategories = TaskCategory[]

import React, { useEffect, useMemo } from "react"
import Sidebar from "@/components/Sidebar"
import { TaskBox } from "@/components/Task"
import TaskBoxByDate from "@/components/Task/TaskBoxByDate"
import { Button } from "@nextui-org/button"
import { useState } from "react"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useAppDispatch, useAppSelector } from "@/libs/hooks"
import { setTask } from "@/store/features/tasksSlice"
import { setTag } from "@/store/features/tagsSlice"
import groupTaskByDate from "@/libs/groupTaskDate"

const Tasks = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(["categories"]),
  )
  const tasks = useAppSelector((state) => state.tasks)
  const categoryFilter = useAppSelector((state) => state.categoryFilter)
  const dispatch = useAppDispatch()

  const handleSelectChange = (key: React.Key) => {
    setSelectedKeys(new Set([key.toString()]))
  }

  const categories = useMemo(
    () => tasks.filter((category) => !categoryFilter.includes(category.name)),
    [tasks, categoryFilter],
  )

  const groupByDate = useMemo(() => groupTaskByDate(tasks), [tasks])

  useEffect(() => {
    const taskStr = localStorage.getItem("tasks") || JSON.stringify([])
    const tagStr = localStorage.getItem("tags") || JSON.stringify([])
    const tasks = JSON.parse(taskStr)
    const tags = JSON.parse(tagStr)
    dispatch(setTag(tags))
    dispatch(setTask(tasks))
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full min-h-screen bg-gray-100 p-5 space-y-5">
        <Dropdown>
          <DropdownTrigger>
            <Button
              color="primary"
              endContent={<ChevronDownIcon className="size-5" />}
            >
              Group by <span className="capitalize">{selectedKeys}</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode="single"
            selectedKeys={selectedKeys}
            onAction={handleSelectChange}
          >
            <DropdownItem key="categories">Categories</DropdownItem>
            <DropdownItem key="date">Date</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {selectedKeys.has("date")
            ? groupByDate.map((category) => (
                <TaskBoxByDate
                  name={category.name}
                  key={category.name}
                  tasks={category.tasks}
                />
              ))
            : categories.map((category) => (
                <TaskBox name={category.name} key={category.name} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks

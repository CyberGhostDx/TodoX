import React, { useEffect, useMemo } from "react"
import Sidebar from "@/components/Sidebar"
import { TaskBox } from "@/components/Task"
import { Button } from "@nextui-org/button"
import { useState } from "react"
import { SharedSelection } from "@nextui-org/system"
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

const Tasks = () => {
  const [selectedKeys, setSelectedKeys] = useState<string>("categories")
  const tasks = useAppSelector((state) => state.tasks)
  const categoryFilter = useAppSelector((state) => state.categoryFilter)
  const dispatch = useAppDispatch()

  const categories = useMemo(
    () => tasks.filter((category) => !categoryFilter.includes(category.name)),
    [tasks, categoryFilter],
  )

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
            onSelectionChange={
              setSelectedKeys as (key: SharedSelection) => void
            }
          >
            <DropdownItem key="categories">Categories</DropdownItem>
            <DropdownItem key="date">Date</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <TaskBox name={category.name} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks

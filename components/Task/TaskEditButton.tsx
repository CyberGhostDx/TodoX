import React, { useRef, useState } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Select, SelectItem } from "@nextui-org/select"
import { DatePicker } from "@nextui-org/date-picker"
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown"
import { useAppDispatch, useAppSelector, useDisclosure } from "@/libs/hooks"
import { TaskCategories, Task } from "@/types"
import { deleteTask, editTask } from "@/store/features/tasksSlice"
import { parseDate } from "@internationalized/date"

type Props = {
  categoryName: string
  task: Task
}

const TaskEditButton: React.FC<Props> = ({ categoryName, task }) => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector((state) => state.tags)
  const [isInvalid, setIsInvalid] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const noteInputRef = useRef<HTMLInputElement>(null)
  const tagSelectRef = useRef<HTMLSelectElement>(null)
  const datePickerRef = useRef<HTMLInputElement>(null)

  const { isOpen, onClose, onToggle } = useDisclosure()

  const handleSaveEdit = () => {
    const taskName = nameInputRef.current?.value
    const taskNote = noteInputRef.current?.value || ""
    const taskDate = datePickerRef.current?.value || ""
    const taskTag = tagSelectRef.current?.value || ""
    if (!taskName) return setIsInvalid(true)
    setIsInvalid(false)
    const newTask: Task = {
      id: task.id,
      name: taskName,
      note: taskNote,
      tag: tags.find((tag) => tag.name == taskTag)?.id || "",
      date: taskDate,
      starred: task.starred,
      done: task.done,
    }
    dispatch(editTask({ category: categoryName, task: newTask }))
    onClose()
    const newTasks: TaskCategories = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    )
    const categoryIndex = newTasks.findIndex((c) => c.name == categoryName)
    const taskIndex = newTasks[categoryIndex].tasks.findIndex(
      (c) => c.id == task.id,
    )
    newTasks[categoryIndex].tasks[taskIndex] = newTask
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }
  const handleDeleteTask = () => {
    dispatch(deleteTask({ category: categoryName, taskID: task.id }))
    const newCategories: TaskCategories = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    )
    const categoryIndex = newCategories.findIndex((c) => c.name == categoryName)
    newCategories[categoryIndex].tasks = newCategories[
      categoryIndex
    ].tasks.filter((t) => t.id != task.id)
    localStorage.setItem("tasks", JSON.stringify(newCategories))
  }

  return (
    <React.Fragment>
      <Popover isOpen={isOpen} onOpenChange={onToggle} placement="bottom">
        <PopoverTrigger className="invisible">.</PopoverTrigger>
        <PopoverContent>
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p
                className="text-small font-bold text-foreground"
                {...titleProps}
              >
                Edit Task
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Input
                  label="Name"
                  size="sm"
                  variant="bordered"
                  autoFocus
                  defaultValue={task.name}
                  classNames={{
                    inputWrapper: ["group-data-[focus=true]:border-blue-500"],
                  }}
                  ref={nameInputRef}
                  isInvalid={isInvalid}
                  errorMessage="Please enter task name"
                  isRequired
                />
                <Input
                  label="Note"
                  size="sm"
                  variant="bordered"
                  defaultValue={task.note}
                  classNames={{
                    inputWrapper: ["group-data-[focus=true]:border-blue-500"],
                  }}
                  ref={noteInputRef}
                />
                <Select
                  label="tag"
                  size="sm"
                  variant="bordered"
                  defaultSelectedKeys={[task.tag]}
                  ref={tagSelectRef}
                  classNames={{
                    trigger: [
                      "data-[open=true]:border-blue-500",
                      "data-[focus=true]:border-blue-500",
                    ],
                  }}
                >
                  {tags.map((tag) => (
                    <SelectItem
                      key={tag.name}
                      startContent={
                        <div
                          className="w-4 h-4 rounded-md pointer-pointer border mr-1"
                          style={{ backgroundColor: `${tag.color}` }}
                        ></div>
                      }
                    >
                      {tag.name}
                    </SelectItem>
                  ))}
                </Select>
                <DatePicker
                  label="Date"
                  size="sm"
                  variant="bordered"
                  defaultValue={task.date ? parseDate(task.date) : null}
                  inputRef={datePickerRef}
                  dateInputClassNames={{
                    inputWrapper: ["focus-within:!border-blue-400"],
                  }}
                />
                <Button color="primary" onPress={handleSaveEdit}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            aria-label={`edit ${task.name} menu`}
            size="sm"
            variant="light"
          >
            <EllipsisVerticalIcon className="size-5 text-gray-500" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onPress={onToggle}>Edit</DropdownItem>
          <DropdownItem className="text-danger" onPress={handleDeleteTask}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default TaskEditButton

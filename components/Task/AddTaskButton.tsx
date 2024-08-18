import React, { useRef, useState } from "react"
import { Input } from "@nextui-org/input"
import { DatePicker } from "@nextui-org/date-picker"
import { Button } from "@nextui-org/button"
import { Select, SelectItem } from "@nextui-org/select"
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover"
import { SquaresPlusIcon } from "@heroicons/react/24/outline"
import { v7 as uuid } from "uuid"
import { Task, TaskCategories } from "@/types"
import { addTask } from "@/store/features/tasksSlice"
import { useAppDispatch, useAppSelector, useDisclosure } from "@/libs/hooks"

type Props = {
  categoryName: string
}

const AddTaskButton: React.FC<Props> = ({ categoryName }) => {
  const [isInvalid, setIsInvalid] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const noteInputRef = useRef<HTMLInputElement>(null)
  const tagSelectRef = useRef<HTMLSelectElement>(null)
  const datePickerRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const tags = useAppSelector((state) => state.tags)
  const { isOpen, onClose, onToggle } = useDisclosure()

  const handleSaveTask = () => {
    const taskName = nameInputRef.current?.value
    const taskNote = noteInputRef.current?.value || ""
    const taskDate = datePickerRef.current?.value || ""
    const taskTag = tagSelectRef.current?.value || ""
    if (!taskName) return setIsInvalid(true)
    setIsInvalid(false)
    const taskID = uuid()
    const newTask: Task = {
      id: taskID,
      name: taskName,
      note: taskNote,
      tag: taskTag,
      date: taskDate,
      starred: false,
      done: false,
    }
    dispatch(addTask({ category: categoryName, task: newTask }))
    onClose()
    const newTasks: TaskCategories = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    )
    const categoryIndex = newTasks.findIndex((c) => c.name == categoryName)
    newTasks[categoryIndex].tasks.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }

  return (
    <Popover
      placement="bottom"
      showArrow
      isOpen={isOpen}
      onOpenChange={onToggle}
    >
      <PopoverTrigger className="!outline-none">
        <Button
          variant="light"
          size="lg"
          className="p-1 px-2 text-blue-500 h-fit hover:!bg-blue-200"
          startContent={<SquaresPlusIcon className="size-6" />}
        >
          add task
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Add Task
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input
                label="Name"
                size="sm"
                variant="bordered"
                autoFocus
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
                classNames={{
                  inputWrapper: ["group-data-[focus=true]:border-blue-500"],
                }}
                ref={noteInputRef}
              />
              <Select
                label="tag"
                size="sm"
                variant="bordered"
                ref={tagSelectRef}
                classNames={{
                  trigger: [
                    "data-[open=true]:border-blue-500",
                    "data-[focus=true]:border-blue-500",
                  ],
                }}
              >
                {tags.map((tag) => (
                  <SelectItem key={tag.name}>{tag.name}</SelectItem>
                ))}
              </Select>
              <DatePicker
                label="Date"
                size="sm"
                variant="bordered"
                inputRef={datePickerRef}
                dateInputClassNames={{
                  inputWrapper: ["focus-within:!border-blue-400"],
                }}
                className="data-[today=true]:*:bg-blue-400"
              />
              <Button color="primary" onPress={handleSaveTask}>
                Save
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default AddTaskButton

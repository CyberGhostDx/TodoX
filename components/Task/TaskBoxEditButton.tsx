import React, { useRef, useState } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown"
import { useAppSelector, useAppDispatch, useDisclosure } from "@/libs/hooks"
import { deleteCategory, editCategory } from "@/store/features/tasksSlice"
import { TaskCategories, TaskCategory } from "@/types"

type Props = {
  categoryName: string
}

const TaskBoxEditButton: React.FC<Props> = ({ categoryName }) => {
  const categories = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()
  const [isInvalid, setInvalid] = useState(false)
  const categoryNameInputRef = useRef<HTMLInputElement>(null)
  const { isOpen, onClose, onToggle } = useDisclosure()

  const handleSaveEdit = () => {
    if (!categoryNameInputRef.current) return
    const newName = categoryNameInputRef.current?.value
    if (!newName) return
    if (categories.find((c) => c.name == newName) && newName != categoryName)
      return setInvalid(true)
    setInvalid(false)
    dispatch(editCategory({ oldName: categoryName, newName }))
    onClose()
    const newCategories: TaskCategories = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    )
    const categoryIndex = newCategories.findIndex((c) => c.name == categoryName)
    newCategories[categoryIndex].name = newName
    localStorage.setItem("tasks", JSON.stringify(newCategories))
  }

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(categoryName))
    const newCategories: TaskCategories = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    ).filter((c: TaskCategory) => c.name != categoryName)
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
                Edit Category
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Input
                  label="Name"
                  size="sm"
                  variant="bordered"
                  autoFocus
                  isRequired
                  defaultValue={categoryName}
                  classNames={{
                    inputWrapper: ["group-data-[focus=true]:border-blue-500"],
                  }}
                  ref={categoryNameInputRef}
                  isInvalid={isInvalid}
                  errorMessage={
                    categoryNameInputRef.current?.value + " has been used"
                  }
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
            aria-label={`${categoryName} menu`}
            size="sm"
            variant="light"
          >
            <EllipsisVerticalIcon className="size-6 text-gray-500" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onPress={onToggle}>Edit</DropdownItem>
          <DropdownItem className="text-danger" onPress={handleDeleteCategory}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default TaskBoxEditButton

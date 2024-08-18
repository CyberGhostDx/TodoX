import React, { useState, useRef } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover"
import { Button as NextButton } from "@nextui-org/button"
import { useAppSelector, useAppDispatch, useDisclosure } from "@/libs/hooks"
import { Input } from "@nextui-org/input"
import { PlusIcon } from "@heroicons/react/24/outline"
import { addCategory } from "@/store/features/tasksSlice"
import { TaskCategories } from "@/types"
import { getCookie, setCookie } from "cookies-next"

const AddCategoryButton = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.tasks)
  const [isInvalid, setIsInvalid] = useState(false)
  const newCategory = useRef<HTMLInputElement>(null)
  const {
    isOpen: popoverIsOpen,
    onToggle: onTogglePopover,
    onClose: onClosePopover,
  } = useDisclosure()
  const handleSaveNewCategory = () => {
    if (!newCategory.current) return
    const { value } = newCategory.current
    if (!value) return
    if (categories.find((c) => c.name == value)) return setIsInvalid(true)
    setIsInvalid(false)
    onClosePopover()
    dispatch(addCategory(value))
    const oldCatergories = JSON.parse(localStorage.getItem("tasks") || "[]")
    const newCategories: TaskCategories = [
      ...oldCatergories,
      { name: value, tasks: [] },
    ]
    localStorage.setItem("tasks", JSON.stringify(newCategories))
    if (!getCookie("tasks")) {
      setCookie("tasks", "1")
    }
  }
  return (
    <Popover
      placement="bottom"
      showArrow
      isOpen={popoverIsOpen}
      onOpenChange={onTogglePopover}
    >
      <PopoverTrigger className="!outline-none">
        <NextButton
          variant="light"
          className="h-6 rounded-lg flex justify-start w-full"
        >
          <PlusIcon className="size-4" />
          Add Category
        </NextButton>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Add Category
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input
                label="Name"
                size="sm"
                variant="bordered"
                autoFocus
                isRequired
                ref={newCategory}
                isInvalid={isInvalid}
                errorMessage={newCategory.current?.value + " has been used"}
                classNames={{
                  inputWrapper: ["group-data-[focus=true]:border-blue-500"],
                }}
              />
              <NextButton color="primary" onPress={handleSaveNewCategory}>
                Save
              </NextButton>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default AddCategoryButton

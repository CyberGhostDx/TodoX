import React, { useState, useRef } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover"
import { Button as NextButton } from "@nextui-org/button"
import {
  useClickOutside,
  useAppSelector,
  useAppDispatch,
  useDisclosure,
} from "@/libs/hooks"
import { Input } from "@nextui-org/input"
import { PlusIcon } from "@heroicons/react/24/outline"
import { addTag } from "@/store/features/tagsSlice"
import { HexColorPicker } from "react-colorful"
import { Tag, Color } from "@/types"
import { v7 as uuid } from "uuid"

const defaultColor = "1f75ff"

const AddTagButton = () => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector((state) => state.tags)
  const [color, setColor] = useState(defaultColor)
  const [isInvalidName, setIsInvalidName] = useState(false)
  const [isInvalidColor, setIsInvalidColor] = useState(false)
  const newTagName = useRef<HTMLInputElement>(null)
  const colorPickerPopover = useRef<HTMLDivElement>(null)
  const {
    isOpen: popoverIsOpen,
    onToggle: onTogglePopover,
    onClose: onClosePopover,
  } = useDisclosure()

  const {
    isOpen: colorPickerIsOpen,
    onToggle: onToggleColorPicker,
    onClose: onCloseColorPicker,
  } = useDisclosure()

  useClickOutside(colorPickerPopover, onCloseColorPicker)

  const handleSaveNewTag = () => {
    if (!newTagName.current || !color) return
    const { value: tagName } = newTagName.current
    if (!tagName) return
    if (tags.find((t) => t.name == tagName)) return setIsInvalidName(true)
    const newTag = { id: uuid(), name: tagName, color: `#${color}` as Color }
    setIsInvalidName(false)
    setColor(defaultColor)
    onClosePopover()
    dispatch(addTag(newTag))
    const oldTags = JSON.parse(localStorage.getItem("tags") || "[]")
    const newTags: Tag[] = [...oldTags, newTag]
    localStorage.setItem("tags", JSON.stringify(newTags))
  }

  const handleColorChange = (value: string) => {
    if (value[0] == "#") value = value.slice(1)
    if (value.length > 6) return
    setColor(value)
    if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
      return setIsInvalidColor(true)
    setIsInvalidColor(false)
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
          Add Tag
        </NextButton>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2 w-52">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Add Tag
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input
                label="Name"
                size="sm"
                variant="bordered"
                autoFocus
                isRequired
                ref={newTagName}
                isInvalid={isInvalidName}
                errorMessage={newTagName.current?.value + " has been used"}
                classNames={{
                  inputWrapper: ["group-data-[focus=true]:border-blue-500"],
                }}
              />
              <Input
                label="Color (Hex)"
                size="sm"
                variant="bordered"
                isRequired
                value={color}
                onValueChange={handleColorChange}
                isInvalid={isInvalidColor}
                errorMessage={"Color does not match hexadecimal color syntax."}
                classNames={{
                  inputWrapper: ["group-data-[focus=true]:border-blue-500"],
                }}
                startContent={
                  <div className="flex items-center text-default-400 color-picker">
                    {colorPickerIsOpen && (
                      <div
                        ref={colorPickerPopover}
                        className="absolute bottom-[50px] z-30"
                      >
                        <HexColorPicker
                          color={`#${color}`}
                          onChange={handleColorChange}
                        />
                      </div>
                    )}
                    <div
                      className="w-4 h-4 rounded-md pointer-pointer border mr-1"
                      onClick={onToggleColorPicker}
                      style={{ backgroundColor: `#${color}` }}
                    ></div>
                    <div>#</div>
                  </div>
                }
              />
              <NextButton color="primary" onPress={handleSaveNewTag}>
                Save
              </NextButton>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default AddTagButton

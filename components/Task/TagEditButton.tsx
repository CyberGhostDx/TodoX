import React, { useRef, useState } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useClickOutside } from "@/libs/hooks"
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown"
import { useAppDispatch, useAppSelector, useDisclosure } from "@/libs/hooks"
import { editTag, deleteTag } from "@/store/features/tagsSlice"
import { HexColorPicker } from "react-colorful"
import { Color, Tag } from "@/types"

type Props = {
  tag: Tag
}

const TagEditButton: React.FC<Props> = ({
  tag: { name: tagName, color: tagColor },
}) => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector((state) => state.tags)
  const [color, setColor] = useState(tagColor.slice(1))
  const [isInvalidName, setIsInvalidName] = useState(false)
  const [isInvalidColor, setIsInvalidColor] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const colorPickerPopover = useRef<HTMLDivElement>(null)
  const { isOpen, onToggle, onClose } = useDisclosure()

  const {
    isOpen: colorPickerIsOpen,
    onToggle: onToggleColorPicker,
    onClose: onCloseColorPicker,
  } = useDisclosure()

  useClickOutside(colorPickerPopover, onCloseColorPicker)

  const handleSaveEdit = () => {
    if (!nameInputRef.current || !color) return
    const { value: newTagName } = nameInputRef.current
    if (!newTagName) return
    if (tags.find((t) => t.name == newTagName) && newTagName != tagName)
      return setIsInvalidName(true)
    const newTag = {
      oldName: tagName,
      name: newTagName,
      color: `#${color}` as Color,
    }
    setIsInvalidName(false)
    onClose()
    dispatch(editTag(newTag))
    const newTags: Tag[] = JSON.parse(localStorage.getItem("tags") || "[]")
    const tagIndex = newTags.findIndex((t) => t.name == tagName)
    newTags[tagIndex].name = newTagName
    newTags[tagIndex].color = `#${color}`
    localStorage.setItem("tags", JSON.stringify(newTags))
  }
  const handleDeleteTask = () => {
    dispatch(deleteTag(tagName))
    const newTags: Tag[] = JSON.parse(
      localStorage.getItem("tags") || "[]",
    ).filter((t: Tag) => t.name != tagName)
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
    <React.Fragment>
      <Popover isOpen={isOpen} onOpenChange={onToggle} placement="bottom">
        <PopoverTrigger className="invisible">.</PopoverTrigger>
        <PopoverContent>
          {(titleProps) => (
            <div className="px-1 py-2 w-52">
              <p
                className="text-small font-bold text-foreground"
                {...titleProps}
              >
                Edit Tag
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Input
                  label="Name"
                  size="sm"
                  variant="bordered"
                  autoFocus
                  isRequired
                  defaultValue={tagName}
                  ref={nameInputRef}
                  isInvalid={isInvalidName}
                  errorMessage={nameInputRef.current?.value + " has been used"}
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
                  errorMessage={
                    "Color does not match hexadecimal color syntax."
                  }
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
            aria-label={`edit ${tagName} menu`}
            size="sm"
            variant="light"
            className="rounded-none "
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

export default TagEditButton

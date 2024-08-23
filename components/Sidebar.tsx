import React from "react"
import { Button as NextButton } from "@nextui-org/button"
import { Checkbox } from "@nextui-org/checkbox"
import {
  ArchiveBoxIcon,
  QueueListIcon,
  StarIcon,
  TagIcon,
} from "@heroicons/react/24/outline"
import {
  Collapse,
  CollapseList,
  CollapseButton,
  CollapseItem,
} from "@/components/Collapse"
import { useAppSelector, useAppDispatch, useDisclosure } from "@/libs/hooks"
import { addFilter, removeFilter } from "@/store/features/categoryFilterSlice"
import AddCategoryButton from "@/components/Task/AddCategoryButton"
import AddTagButton from "@/components/Task/AddTagButton"
import TagEditButton from "@/components/Task/TagEditButton"
import { ButtonProps } from "@/types"
import { setShow } from "@/store/features/showSlice"

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.tasks)
  const tags = useAppSelector((state) => state.tags)
  const { isOpen: categoriesIsOpen, onToggle: onToggleCate } = useDisclosure()
  const { isOpen: tagsIsOpen, onToggle: onToggleTag } = useDisclosure()

  return (
    <div className="w-80 flex flex-col p-5 space-y-5">
      <Button
        icon=<QueueListIcon className="size-5" />
        onClick={() => dispatch(setShow("tasks"))}
      >
        Tasks
      </Button>
      <Button
        icon={<StarIcon className="size-5" />}
        onClick={() => dispatch(setShow("starred"))}
      >
        Starred
      </Button>
      {/*  Categories */}
      <Collapse>
        <CollapseButton
          isOpen={!categoriesIsOpen}
          as={Button}
          onClick={onToggleCate}
          icon={<ArchiveBoxIcon className="size-5" />}
        >
          Categories
        </CollapseButton>
        <CollapseList isOpen={!categoriesIsOpen}>
          {categories.map((c) => (
            <CollapseItem key={c.name}>
              <Checkbox
                size="sm"
                className="!max-w-none !flex w-full"
                defaultSelected
                onValueChange={(isChecked) =>
                  isChecked
                    ? dispatch(removeFilter(c.name))
                    : dispatch(addFilter(c.name))
                }
              >
                {c.name}
              </Checkbox>
            </CollapseItem>
          ))}
          {/*Add Category*/}
          <AddCategoryButton />
        </CollapseList>
      </Collapse>
      {/*  Tags */}
      <Collapse className="!mt-3">
        <CollapseButton
          isOpen={!tagsIsOpen}
          as={Button}
          onClick={onToggleTag}
          icon={<TagIcon className="size-5" />}
        >
          Tag
        </CollapseButton>
        <CollapseList isOpen={!tagsIsOpen}>
          {tags.map((tag) => (
            <div
              className="text-sm px-4 hover:bg-gray-100 rounded-lg"
              key={tag.name}
            >
              <div className="flex justify-between w-full items-center">
                <div className="flex space-x-2 items-center">
                  <TagCircle color={tag.color} />
                  <div>{tag.name}</div>
                </div>
                <TagEditButton tag={tag} />
              </div>
            </div>
          ))}{" "}
          <AddTagButton />
        </CollapseList>
      </Collapse>
    </div>
  )
}

const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => {
  return (
    <NextButton
      className="bg-gray-200 w-full h-8 flex justify-between text-base"
      {...props}
    >
      <div className="flex items-center space-x-2">
        <div>{icon}</div>
        <div>{children}</div>
      </div>
    </NextButton>
  )
}

type TagCircleProps = {
  color: string
}

const TagCircle: React.FC<TagCircleProps> = ({ color }) => {
  return (
    <div className="w-4 h-4 rounded-full" style={{ background: color }}></div>
  )
}

export default Sidebar

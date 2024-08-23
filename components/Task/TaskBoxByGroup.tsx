import React, { useMemo } from "react"
import { Button } from "@nextui-org/button"
import { useDisclosure } from "@/libs/hooks"
import { AnimatePresence } from "framer-motion"
import { Collapse, CollapseList, CollapseButton } from "@/components/Collapse"
import TaskItem from "@/components/Task/TaskItem"
import { Task } from "@/types"

type Props = {
  name: string
  tasks: (Task & { category: string })[]
}

const TaskBoxByGroup: React.FC<Props> = ({ name, tasks }) => {
  const notFinishedTask = useMemo(
    () => tasks.filter((t) => !t.done) || [],
    [tasks],
  )
  const finishedTask = useMemo(() => tasks.filter((t) => t.done) || [], [tasks])

  const { isOpen, onToggle } = useDisclosure()

  return (
    <div className="p-4 bg-white rounded-lg min-w-52 space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg ml-2">{name}</h1>
      </div>
      <div className="flex flex-col ml-1.5">
        <AnimatePresence>
          {notFinishedTask.map((task) => (
            <TaskItem task={task} categoryName={task.category} key={task.id} />
          ))}
        </AnimatePresence>
      </div>
      <Collapse>
        <CollapseButton
          isOpen={isOpen}
          as={Button}
          onClick={onToggle}
          variant="light"
          className="w-full justify-between"
        >
          Done ({finishedTask.length})
        </CollapseButton>
        <CollapseList isOpen={isOpen}>
          <div className="space-y-3 flex flex-col ml-2 mt-2 ">
            {finishedTask.map((task) => (
              <TaskItem
                task={task}
                categoryName={task.category}
                key={task.id}
              />
            ))}
          </div>
        </CollapseList>
      </Collapse>
    </div>
  )
}

export default TaskBoxByGroup

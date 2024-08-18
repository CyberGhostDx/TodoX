import React, { useMemo } from "react"
import { Button } from "@nextui-org/button"
import { useAppSelector, useDisclosure } from "@/libs/hooks"
import { AnimatePresence } from "framer-motion"
import { Collapse, CollapseList, CollapseButton } from "@/components/Collapse"
import AddTaskButton from "@/components/Task/AddTaskButton"
import TaskItem from "@/components/Task/TaskItem"
import EditButton from "@/components/Task/TaskBoxEditButton"

type Props = {
  name: string
}

const TaskBox: React.FC<Props> = ({ name: categoryName }) => {
  const category = useAppSelector((state) =>
    state.tasks.find((c) => c.name == categoryName),
  )

  const notFinishedTask = useMemo(
    () => category?.tasks.filter((t) => !t.done) || [],
    [category],
  )
  const finishedTask = useMemo(
    () => category?.tasks.filter((t) => t.done) || [],
    [category],
  )

  const { isOpen, onToggle } = useDisclosure()

  return (
    <div className="p-4 bg-white rounded-lg min-w-52 h-fit space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg ml-2">{categoryName}</h1>
        <EditButton categoryName={categoryName} />
      </div>
      <AddTaskButton categoryName={categoryName} />
      <div className="flex flex-col ml-1.5 ">
        <AnimatePresence>
          {notFinishedTask.map((task) => (
            <TaskItem task={task} categoryName={categoryName} key={task.id} />
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
              <TaskItem task={task} categoryName={categoryName} key={task.id} />
            ))}
          </div>
        </CollapseList>
      </Collapse>
    </div>
  )
}

export default TaskBox

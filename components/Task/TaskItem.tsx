import React, { useMemo } from "react"
import { motion } from "framer-motion"
import formatDate from "@/libs/formatDate"
import { Task } from "@/types"
import { Checkbox } from "@nextui-org/checkbox"
import { StarIcon } from "@heroicons/react/24/outline"
import { useAppDispatch, useAppSelector } from "@/libs/hooks"
import { setTaskDone, setTaskStarred } from "@/store/features/tasksSlice"
import { TaskCategories } from "@/types"
import EditButton from "./TaskEditButton"

type Props = {
  categoryName: string
  task: Task & { category?: string }
}

const TaskItem: React.FC<Props> = ({ categoryName, task }) => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector((state) => state.tags)

  const tag = useMemo(() => tags.find((t) => t.id == task.tag), [tags, task])

  const handleSetTaskDone = (taskID: string) => {
    dispatch(setTaskDone({ category: categoryName, taskID }))
    const newTasks: TaskCategories = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    )
    const categoryIndex = newTasks.findIndex((c) => c.name == categoryName)
    const index = newTasks[categoryIndex].tasks.findIndex(
      (task) => task.id == taskID,
    )
    newTasks[categoryIndex].tasks[index].done =
      !newTasks[categoryIndex].tasks[index].done
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }

  const taskVariants = {
    initial: { height: 0, opacity: 0 },
    enter: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0, transition: { delay: 0.5 } },
  }

  if (task.done)
    return (
      <div>
        <Checkbox
          isSelected={task.done}
          onValueChange={() => handleSetTaskDone(task.id)}
          className="line-through break-all"
        >
          {task.name}
        </Checkbox>
      </div>
    )

  return (
    <motion.div
      variants={taskVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="origin-top"
    >
      <div className="w-full hover:bg-gray-100 p-1 rounded-lg flex justify-between items-center">
        <div className="break-all">
          <Checkbox
            defaultChecked={task.done}
            onValueChange={() => handleSetTaskDone(task.id)}
          >
            {task.name}
          </Checkbox>
        </div>
        <div className="flex items-center">
          <EditButton task={task} categoryName={categoryName} />
          <StarIcon
            className={`size-4 cursor-pointer hover:fill-yellow-500 hover:stroke-yellow-500 stroke-gray-400 ${task.starred && "fill-amber-400 stroke-amber-400"}`}
            onClick={() =>
              dispatch(
                setTaskStarred({
                  category: categoryName,
                  taskID: task.id,
                }),
              )
            }
          ></StarIcon>
        </div>
      </div>
      <div className="ml-7 mt-1 text-xs text-gray-500 w-40 break-all">
        {task.note}
      </div>
      <div className="mt-1 flex space-x-2 ml-6 mb-2 overflow-x-scroll">
        {task?.category && (
          <div className="rounded-xl h-5 border-2 text-xs w-fit flex justify-center items-center px-2 text-white bg-blue-600 border-blue-600">
            {task.category}
          </div>
        )}
        {task.date && (
          <div
            className={`rounded-xl h-5 border-2 text-xs min-w-fit flex justify-center items-center px-2 cursor-pointer hover:bg-gray-100 transition-colors ${formatDate(task.date) == "yesterday" && "text-red-500"}`}
          >
            {formatDate(task.date)}
          </div>
        )}
        {tag && (
          <div
            className="rounded-xl h-5 border-2 text-xs w-fit flex justify-center items-center px-2 text-white"
            style={{
              backgroundColor: tag.color,
              borderColor: tag.color,
            }}
          >
            {tag.name}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TaskItem

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import featureLists from "@/libs/features"
import {
  ClipboardDocumentCheckIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
  StarIcon,
} from "@heroicons/react/24/outline"

type Props = {
  title: (typeof featureLists)[number]["title"]
  text: (typeof featureLists)[number]["text"]
  index: number
  currentIndex: number | null
}

const ShowFeature: React.FC<Props> = ({ title, text, index, currentIndex }) => {
  if (currentIndex == null) return
  const float = index % 2 == 0 ? "left-20" : "right-20"
  const isFirst = index == 0
  const isShow = index <= currentIndex

  const textVariants = {
    initial: { x: 0, y: 20 },
    enter: { x: 0, y: 0 },
    exit: { x: 0, y: 20, opacity: 0 },
  }

  const circleVariants = {
    initial: { scale: 0 },
    enter: { scale: 1 },
    exit: { scale: 0, transition: { delay: 0.15 } },
  }

  const lineVariants = {
    initial: { scaleY: 0 },
    enter: { scaleY: 1 },
    exit: { scaleY: 0 },
  }

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <AnimatePresence>
          {isShow && (
            <React.Fragment>
              <motion.div
                variants={lineVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="origin-top"
              >
                {!isFirst && <Line />}
              </motion.div>
              <motion.div
                variants={circleVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Circle icon={<CircleIcon name={title} />} />
              </motion.div>
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isShow && (
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={`absolute bottom-[-55px] md:bottom-[-5px] w-24 md:w-80 ${float}`}
          >
            <h1 className="font-bold">{title}</h1>
            <p className="text-xs md:text-base md:block">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type CircleProps = {
  icon: React.ReactNode
}

const Circle: React.FC<CircleProps> = ({ icon }) => {
  return (
    <div
      className={`w-10 h-10 rounded-full bg-green-500 border-green-500 text-white border-3 flex items-center justify-center`}
    >
      {icon}
    </div>
  )
}

const Line: React.FC = () => {
  return <div className={`w-1 h-32 bg-green-500`}></div>
}

type CircleIconProps = {
  name: (typeof featureLists)[number]["title"]
}

const CircleIcon: React.FC<CircleIconProps> = ({ name }) => {
  if (name == "Task Management")
    return <ClipboardDocumentCheckIcon className="size-6" />
  if (name == "Categories & Tag") return <ArchiveBoxIcon className="size-6" />
  if (name == "Due Dates & Reminders")
    return <CalendarDaysIcon className="size-6" />
  if (name == "Priorty Levels") return <StarIcon className="size-6" />
}

export default ShowFeature

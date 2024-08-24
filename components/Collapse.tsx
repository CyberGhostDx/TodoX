import React, { useContext, createContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ButtonProps } from "@/types"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/button"

const isOpenContext = createContext(false)

type CollapseProps = React.ComponentProps<"div"> & {
  children: React.ReactNode
  isOpen: boolean
}

export const Collapse: React.FC<CollapseProps> = ({
  children,
  isOpen,
  ...props
}) => {
  return (
    <isOpenContext.Provider value={isOpen}>
      <div {...props}>{children}</div>
    </isOpenContext.Provider>
  )
}

type CollapseButton = ButtonProps & {
  as: React.FC<ButtonProps>
  onToggle: () => void
}

export const CollapseButton: React.FC<CollapseButton> = ({
  children,
  as: Element,
  icon,
  onToggle,
  ...props
}) => {
  const isOpen = useContext(isOpenContext)
  let endIcon = isOpen ? (
    <ChevronUpIcon className="size-5" />
  ) : (
    <ChevronDownIcon className="size-5" />
  )
  return (
    <Element icon={icon} {...props} onPress={onToggle} endContent={endIcon}>
      {children}
    </Element>
  )
}

type CollapseListProps = {
  children: React.ReactNode
}

export const CollapseList: React.FC<CollapseListProps> = ({ children }) => {
  const isOpen = useContext(isOpenContext)
  const variants = {
    initial: { height: 0 },
    enter: { height: "auto" },
    exit: { height: 0 },
  }

  return (
    <div className="pl-2 pt-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="origin-top overflow-hidden w-full space-y-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type CollapseItemProps = {
  children: React.ReactNode
}

export const CollapseItem: React.FC<CollapseItemProps> = ({ children }) => {
  return (
    <Button
      variant="light"
      className="h-6 rounded-lg flex justify-start w-full"
    >
      {children}
    </Button>
  )
}

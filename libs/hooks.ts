import { useDispatch, useSelector, useStore } from "react-redux"
import { RefObject, useState, useEffect, ReactNode } from "react"
import type { RootState, AppDispatch, AppStore } from "@/store"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return { isOpen, onOpen, onClose, onToggle }
}

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void,
) => {
  useEffect(() => {
    let startedInside = false
    let startedWhenMounted = false

    const listener = (event: MouseEvent) => {
      if (startedInside || !startedWhenMounted) return
      if (!ref.current || ref.current.contains(event.target as Node)) return

      handler(event)
    }

    const validateEventStart = (event: MouseEvent | TouchEvent) => {
      startedWhenMounted = !!ref.current
      startedInside =
        !!ref.current && ref.current.contains(event.target as Node)
    }

    document.addEventListener("mousedown", validateEventStart)
    document.addEventListener("touchstart", validateEventStart)
    document.addEventListener("click", listener)

    return () => {
      document.removeEventListener("mousedown", validateEventStart)
      document.removeEventListener("touchstart", validateEventStart)
      document.removeEventListener("click", listener)
    }
  }, [ref, handler])
}

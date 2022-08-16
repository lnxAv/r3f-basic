import { MotionProps, Variants } from 'framer-motion'

type GlobalVariants = {
  [key: string]: Variants
}

const globalVariants: GlobalVariants = {
  default: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
  defaultScene: {
    initial: {
      x: -20,
    },
    animate: {
      x: 0,
    },
    exit: {
      x: 20,
    },
  },
}

export default globalVariants

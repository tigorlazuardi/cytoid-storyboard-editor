import React, { FunctionComponent, ReactNode } from 'react'
import Slide from '@material-ui/core/Slide'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

type Props = {
  direction: 'left' | 'right' | 'down' | 'up'
  children: ReactNode
}

const HideOnScroll: FunctionComponent<Props> = ({ direction, children }) => {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  )
}

export default HideOnScroll

import { MouseEvent, createElement } from 'react'
import { Entries } from './Drawer'
import ImageIcon from '@material-ui/icons/Image'
import TextFieldsIcon from '@material-ui/icons/TextFields'
// import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CodeIcon from '@material-ui/icons/Code'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList'

const drawerEntries: Entries[] = [
  {
    name: 'Sprite',
    icon: createElement(ImageIcon),
    action: (event: MouseEvent) => {
      event.preventDefault()
      console.log('sprite clicked')
    },
  },
  {
    name: 'Text',
    icon: createElement(TextFieldsIcon),
    action: (event: MouseEvent) => {
      event.preventDefault()
      console.log('Text clicked')
    },
  },
  {
    name: 'State',
    icon: createElement(CodeIcon),
    action: (event: MouseEvent) => {
      event.preventDefault()
      console.log('State clicked')
    },
  },
  {
    name: 'Trigger',
    icon: createElement(FullscreenExitIcon),
    action: (event: MouseEvent) => {
      event.preventDefault()
      console.log('Trigger clicked')
    },
  },
  {
    name: 'Template',
    icon: createElement(FeaturedPlayListIcon),
    action: (event: MouseEvent) => {
      event.preventDefault()
      console.log('Template clicked')
    },
  },
]

export default drawerEntries

import React, {
  FunctionComponent,
  ReactNode,
  ReactElement,
  MouseEvent,
  Fragment,
  Dispatch,
  SetStateAction,
  useState,
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Draw from '@material-ui/core/Drawer'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Add from '@material-ui/icons/Add'

const drawerWidth = 240

interface Props {
  open: boolean
  entries: Entries[]
  anchor?: 'left' | 'right'
  header: {
    name: string
    icon?: ReactNode
  }
  setOpen: Dispatch<SetStateAction<boolean>>
}

export type Entries = {
  name: string
  icon: ReactElement
  action: (event: MouseEvent) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  headerIcon: {
    paddingRight: theme.spacing(1),
  },
  addIcon: {
    marginRight: theme.spacing(-3),
  },
  entryIcon: {
    marginLeft: theme.spacing(1),
  },
}))

const Drawer: FunctionComponent<Props> = ({
  open,
  entries,
  anchor = 'left',
  header,
  setOpen,
}) => {
  const classes = useStyles()
  let customStyle: object
  const [hover, setHover] = useState(false)
  if (hover) {
    customStyle = { cursor: 'pointer', userSelect: 'none' }
  } else {
    customStyle = { cursor: 'default', userSelect: 'none' }
  }
  return (
    <Draw
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      anchor={anchor}
    >
      <div
        className={classes.toolbar}
        style={customStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setOpen(false)}
      >
        {header.icon && (
          <Icon className={classes.headerIcon}>{header.icon}</Icon>
        )}
        <Typography variant='h6'>{header.name}</Typography>
      </div>
      <Divider />
      {entries.map((entry: Entries, i: number) => (
        <Fragment key={i}>
          <List>
            <ListItem button onClick={entry.action}>
              <ListItemIcon className={classes.entryIcon}>
                {entry.icon}
              </ListItemIcon>
              <ListItemIcon className={classes.addIcon}>
                <Add />
              </ListItemIcon>
              <ListItemText primary={entry.name}></ListItemText>
            </ListItem>
          </List>
          <Divider />
        </Fragment>
      ))}
    </Draw>
  )
}

export default Drawer

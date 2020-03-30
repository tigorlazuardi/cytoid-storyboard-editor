import React, { FunctionComponent, Dispatch, SetStateAction } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Bar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import Settings from '@material-ui/icons/Settings'
import HideOnScroll from './HideOnScroll'
import clsx from 'clsx'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButtonShift: {
    marginLeft: theme.spacing(7),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}))

type Props = {
  name: string
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const AppBar: FunctionComponent<Props> = ({ name, open, setOpen }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <HideOnScroll direction='down'>
        <Bar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aira-label='menu'
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {name}
            </Typography>
            <IconButton
              edge='end'
              className={classes.menuButton}
              color='inherit'
            >
              <Settings />
            </IconButton>
          </Toolbar>
        </Bar>
      </HideOnScroll>
    </div>
  )
}

export default AppBar

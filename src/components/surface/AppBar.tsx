import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Bar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import Settings from '@material-ui/icons/Settings'
import HideOnScroll from './HideOnScroll'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

type Props = {
  open: boolean
}

const AppBar: FunctionComponent<Props> = ({ open }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <HideOnScroll direction='down'>
        <Bar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aira-label='menu'
              onClick={() => (open = !open)}
            >
              <Menu />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Home
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

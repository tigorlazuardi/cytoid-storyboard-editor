import React, { FunctionComponent, Fragment } from 'react'
import Card from '../storyboard/Card'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerSensitive: {
    marginLeft: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(9) + 1,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerSensitiveOpen: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  topMargin: {
    marginTop: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(0, 0, 2, 0),
    height: theme.spacing(1),
  },
}))

type Props = {
  open: boolean
}

const WorkArea: FunctionComponent<Props> = ({ open }) => {
  const classes = useStyles()
  return (
    <Fragment>
      <div className={classes.toolbar} />
      <Container
        className={clsx(classes.drawerSensitive, {
          [classes.drawerSensitiveOpen]: open,
        })}
        maxWidth={false}
      >
        <Typography className={classes.topMargin}>Object: 1</Typography>
        <Divider className={classes.divider} />
        <Card />
        <Card />
        <Typography className={classes.topMargin}>Object: 2</Typography>
        <Divider className={classes.divider} />
      </Container>
    </Fragment>
  )
}

export default WorkArea

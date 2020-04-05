import React, { FunctionComponent, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import C from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

type Props = {}

const useStyles = makeStyles({
  root: {
    minWidth: 0,
    maxWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 12,
  },
  hoverRoot: {
    cursor: 'pointer',
  },
})

const Card: FunctionComponent<Props> = ({}) => {
  const classes = useStyles()
  const [raised, setRaised] = useState(false)
  return (
    <C
      className={clsx(classes.root, {
        [classes.hoverRoot]: raised,
      })}
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
      raised={raised}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Time: 00:00.00
        </Typography>
        <Typography variant='h6' component='h2'>
          Sprite
        </Typography>
        <Typography variant='body2' component='p'>
          <span style={{ marginRight: 10 }}>filename</span>: picture.png
          <br />
          ...
        </Typography>
      </CardContent>
    </C>
  )
}

export default Card

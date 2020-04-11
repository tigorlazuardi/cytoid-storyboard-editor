import React, { FunctionComponent, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import C from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import StoryboardObject from '../../models/base_object'

interface Props {
  elType: string
  meta?: StoryboardObject
}

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

const Card: FunctionComponent<Props> = ({ elType, meta = {} }) => {
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
          {elType}
        </Typography>
        {Object.entries(meta).map(([key, value], i: number) => {
          if (i < 3) {
            return (
              <Typography variant='body2' component='p'>
                {key}: {value}
              </Typography>
            )
          } else if (i > 4) {
            return null
          } else {
            return (
              <Typography variant='body2' component='p'>
                ...
              </Typography>
            )
          }
        })}
      </CardContent>
    </C>
  )
}

export default Card

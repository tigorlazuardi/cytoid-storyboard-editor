import React, { Component, PureComponent } from 'react'
import Result from '../../models/result_handling'

interface Props {
  // Optional with defaults
  anchor?: Anchor
  borderColor?: string
  borderWidth?: number
  borderStyle?: string
  anchorID?: string
  zIndex?: number

  // Required
  from: string
  to: string
  within?: string
  fromAnchor: Anchor
  toAnchor: Anchor
  delay?: number
}

interface Anchor {
  x: number
  y: number
}

interface ConnectorDots {
  from: {
    x: number
    y: number
  }
  to: {
    x: number
    y: number
  }
}

class ConnectorLine extends Component<Props> {
  private anchor: Anchor
  private borderColor: string
  private borderWidth: number
  private borderStyle: string
  private anchorID: string
  private zIndex: number
  private from: string
  private to: string
  private within: string
  private fromAnchor: Anchor
  private toAnchor: Anchor
  private delay: number
  private timeout: number | null
  constructor(props: Props) {
    super(props)
    const {
      anchor = { x: 0.5, y: 0.5 },
      borderColor = '#f00',
      borderWidth = 1,
      borderStyle = 'solid',
      anchorID = '',
      zIndex = 0,
      from,
      to,
      within = '',
      fromAnchor,
      toAnchor,
      delay = 100,
    } = props
    this.anchor = anchor
    this.borderColor = borderColor
    this.borderWidth = borderWidth
    this.borderStyle = borderStyle
    this.anchorID = anchorID
    this.zIndex = zIndex
    this.from = from
    this.to = to
    this.within = within
    this.fromAnchor = fromAnchor
    this.toAnchor = toAnchor
    this.delay = delay
    this.timeout = null
  }

  findElement(idElement: string): HTMLElement | null {
    return document.getElementById(idElement)
  }

  detect(): Result<ConnectorDots, string> {
    const { from, to, within } = this
    const a = this.findElement(from)
    if (!a) return Result.err(`Document with ID "${from}" is not found`)
    const b = this.findElement(to)
    if (!b) return Result.err(`Document with ID "${to}" is not found`)

    const anchor0 = this.fromAnchor
    const anchor1 = this.toAnchor

    const box0 = a.getBoundingClientRect()
    const box1 = b.getBoundingClientRect()

    let offsetX = window.pageXOffset
    let offsetY = window.pageYOffset

    if (within) {
      let p = this.findElement(within)
      if (p == null) {
        return Result.err(
          `Document with ID "${within}" is not found. Drop "within" prop so it will not be searched.`
        )
      }
      // null is already handled, no need to give bang to handle null everytime in later time
      p = p!
      const boxp = p.getBoundingClientRect()

      offsetX -=
        boxp.left +
        (window.pageXOffset || document.documentElement.scrollLeft) -
        p.scrollLeft
      offsetY -=
        boxp.top +
        (window.pageYOffset || document.documentElement.scrollTop) -
        p.scrollTop
    }
  }
}

export default ConnectorLine

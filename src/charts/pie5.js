import React, { Component, PropTypes } from 'react'

import { pie, arc } from 'd3-shape'
import { interpolate, interpolateNumber } from 'd3-interpolate'
import { Motion, spring, presets } from 'react-motion'

const col = interpolate('white', 'green')
const defaultColors = (a, i, c) => {
  const actual = Math.abs(a.startAngle - a.endAngle) / 2 / Math.PI
  return col(interpolateNumber(actual, 1)(c))
}

export default class Pie extends Component {

  static propTypes = {
    colors: PropTypes.func,
    data: PropTypes.array.isRequired,
    radius: PropTypes.number.isRequired,
    stroke: PropTypes.string,
  }

  state = { allHovered: false, hovered: null }

  render() {
    let { colors, data, radius, stroke } = this.props
    const { allHovered, hovered } = this.state
    stroke = stroke || 'black'
    colors = colors || defaultColors
    const arcs = pie()(data)
    const arcGen = (r) => arc()
      .innerRadius(0)
      .outerRadius(r)
    const smallRadius = 0.83 * radius
    const maxData = Math.max(...data)
    return (
      <g
        transform={`translate(${radius}, ${radius})`}
        onMouseEnter={() => this.setState({ allHovered: true })}
        onMouseLeave={() => this.setState({ allHovered: false, hovered: null })}
      >
        <rect x={-radius} y={-radius} width={2 * radius} height={2 * radius} fill="transparent" />
        {arcs.map((a, i) => (
          <Motion
            defaultStyle={{ c: 0, r: 0 }}
            style={{
              c: spring(hovered === i ? 1 : 0),
              r: spring(allHovered ? 1 : 0, { stiffness: 1000, damping: 26 }),
            }}
          >
            {({ c, r }) => {
              const angle = (a.startAngle + a.endAngle) / 2
              const dist = (radius - smallRadius) // * (a.data / maxData)
              const xDir = Math.sin(angle) * dist
              const yDir = Math.cos(angle) * -dist
              return (
                <g key={`arc${i}`} transform={`translate(${xDir * r}, ${yDir * r})`}>
                  <path
                    d={arcGen(smallRadius)(a)}
                    fill={colors(a, i, c)}
                    onMouseEnter={() => this.setState({ hovered: i })}
                    onMouseLeave={() => this.setState({ hovered: null })}
                    stroke={stroke}
                  />
                </g>
              )
            }}
          </Motion>
        ))}
        {hovered !== null && (
          <text fill="white" x={0} y={90}>
            <tspan>data[{hovered}]: {data[hovered]}</tspan>
          </text>
        )}
      </g>
    )
  }

}

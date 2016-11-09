import React, { Component, PropTypes } from 'react'

import { pie, arc } from 'd3-shape'
import { interpolate, interpolateNumber } from 'd3-interpolate'
import { Motion, spring } from 'react-motion'

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

  state = { hovered: null }

  render() {
    let { colors, data, radius, stroke } = this.props
    const { hovered } = this.state
    stroke = stroke || 'black'
    colors = colors || defaultColors
    const arcs = pie()(data)
    const arcGen = (r) => arc()
      .innerRadius(0)
      .outerRadius(r)
    const smallRadius = 0.83 * radius
    return (
      <g
        transform={`translate(${radius}, ${radius})`}
        onMouseLeave={() => this.setState({ hovered: null })}
      >
        {arcs.map((a, i) => (
          <Motion
            defaultStyle={{ c: 0 }}
            style={{ c: spring(hovered === i ? 1 : 0, { stiffness: 1000, damping: 26 }) }}
          >
            {({ c }) => {
              const angle = (a.startAngle + a.endAngle) / 2
              const xDir = Math.sin(angle) * (radius - smallRadius)
              const yDir = Math.cos(angle) * -(radius - smallRadius)
              return (
                <g key={`arc${i}`} transform={`translate(${xDir * c}, ${yDir * c})`}>
                  <path
                    d={arcGen(smallRadius)(a)}
                    fill={colors(a, i, c)}
                    stroke={stroke}
                  />
                </g>
              )
            }}
          </Motion>
        ))}
        {arcs.map((a, i) => (
          <path
            d={arcGen(radius)(a)}
            fill="transparent"
            key={`arcHitbox${i}`}
            onMouseEnter={() => this.setState({ hovered: i })}
            stroke="transparent"
          />
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

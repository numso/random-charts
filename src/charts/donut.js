import React, { Component, PropTypes } from 'react'

import { pie, arc } from 'd3-shape'
import { interpolate, interpolateNumber } from 'd3-interpolate'
import { Motion, spring, presets } from 'react-motion'

const col = interpolate('white', 'green')
const defaultColors = (a, i, c) => {
  const actual = Math.abs(a.startAngle - a.endAngle) / 2 / Math.PI
  return col(interpolateNumber(actual, 1)(c))
}

export default class Donut extends Component {

  static propTypes = {
    colors: PropTypes.func,
    data: PropTypes.array.isRequired,
    innerRadius: PropTypes.number,
    radius: PropTypes.number.isRequired,
    stroke: PropTypes.string,
  }

  state = { hovered: null }

  render() {
    let { colors, data, innerRadius, radius, stroke } = this.props
    const { hovered } = this.state
    stroke = stroke || 'black'
    innerRadius = innerRadius || radius * 0.8
    colors = colors || defaultColors
    const arcs = pie()(data)
    const arcGen = (r, i) => arc()
      .innerRadius(i)
      .outerRadius(r)
    const radius2 = 0.93 * radius
    const inner2 = 0.93 * innerRadius
    return (
      <g
        transform={`translate(${radius}, ${radius})`}
        onMouseLeave={() => this.setState({ hovered: null })}
      >
        {arcs.map((a, i) => (
          <Motion
            defaultStyle={{ r: radius2, z: innerRadius, c: 0 }}
            style={{
              c: spring(hovered === i ? 1 : 0, { stiffness: 1000, damping: 26 }),
              z: spring(hovered === i ? inner2 : innerRadius, { stiffness: 1000, damping: 26 }),
              r: spring(hovered === i ? radius : radius2, { stiffness: 1000, damping: 26 }),
            }}
          >
            {({ c, r, z }) => (
              <path
                d={arcGen(r, z)(a)}
                fill={colors(a, i, c)}
                key={`arc${i}`}
                onMouseEnter={() => this.setState({ hovered: i })}
                stroke={stroke}
              />
            )}
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

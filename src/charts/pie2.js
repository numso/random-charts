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
    const smallRadius = 0.93 * radius
    return (
      <g
        transform={`translate(${radius}, ${radius})`}
        onMouseLeave={() => this.setState({ hovered: null })}
      >
        {arcs.map((arc, i) => (
          <Motion
            defaultStyle={{ r: smallRadius, d: 0, c: 0 }}
            style={{
              d: spring(hovered === i ? 0.2 : 0, presets.wobbly),
              r: spring(hovered === i ? radius : smallRadius, presets.wobbly),
              c: spring(hovered === i ? 1 : 0),
            }}
          >
            {({ r, d, c }) => {
              if (hovered === i) return null
              const a = { ...arc }
              a.startAngle -= d
              a.endAngle += d
              return (
                <path
                  d={arcGen(r)(a)}
                  fill={colors(a, i, c)}
                  key={`arc${i}`}
                  onMouseEnter={() => this.setState({ hovered: i })}
                  stroke={stroke}
                />
              )
            }}
          </Motion>
        ))}
        {hovered !== null && (
          <Motion
            key={`test${hovered}`}
            defaultStyle={{ r: smallRadius, d: 0, c: 0 }}
            style={{
              d: spring(0.2, presets.wobbly),
              r: spring(radius, presets.wobbly),
              c: spring(1),
            }}
          >
            {({ r, d, c }) => {
              const a = { ...arcs[hovered] }
              a.startAngle -= d
              a.endAngle += d
              return (
                <path
                  d={arcGen(r)(a)}
                  fill={colors(a, hovered, c)}
                  stroke={stroke}
                />
              )
            }}
          </Motion>
        )}
        {hovered !== null && (
          <text fill="white" x={0} y={90}>
            <tspan>data[{hovered}]: {data[hovered]}</tspan>
          </text>
        )}
      </g>
    )
  }

}

import { line } from 'd3-shape'
import React from 'react'

const pad = 5
const pad2 = 8
export default function Bar({ data, stroke, height, width }) {
  const step = (width - 2 * pad) / data.length
  const lineGenerator = line()
    .x((d, i) => i * step + pad)
    .y(d => d / height * (height - 2 * pad) + pad)
  return (
    <g>
      {data.map((point, i) => (
        <rect
          x={lineGenerator.x()(point, i) + pad2 / 2}
          y={0}
          width={step - pad2}
          height={height}
          fill="#555"
        />
      ))}
      {data.map((point, i) => (
        <rect
          x={lineGenerator.x()(point, i) + pad2 / 2}
          y={lineGenerator.y()(point, i)}
          width={step - pad2}
          height={height - lineGenerator.y()(point, i)}
          fill={stroke}
        />
      ))}
    </g>
  )
}

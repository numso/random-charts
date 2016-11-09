import { line } from 'd3-shape'
import React from 'react'

const pad = 5
export default function Line({ data, stroke, height, width }) {
  const step = (width - 2 * pad) / (data.length - 1)
  const lineGenerator = line()
    .x((d, i) => i * step + pad)
    .y(d => d / height * (height - 2 * pad) + pad)
  return (
    <g>
      <path stroke={stroke} fill="none" d={lineGenerator(data)} strokeWidth={2} />
      {data.map((point, i) => (
        <circle cx={lineGenerator.x()(point, i)} cy={lineGenerator.y()(point, i)} r={5} fill={stroke} />
      ))}
    </g>
  )
}

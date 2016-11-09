import React, { PropTypes } from 'react'

import './chart-header.css'

export default function ChartHeader({ children, subtitle, title }) {
  return(
    <div className="ChartHeader">
      <div className="ChartHeader-title">{title}</div>
      {children(400)}
      <div className="ChartHeader-subtitle">{subtitle}</div>
    </div>
  )
}

ChartHeader.PropTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

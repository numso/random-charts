import React, { Component } from 'react'

import './app.css'
import Card from './card'
import ChartHeader from './chart-header'
import Bar from './charts/bar'
import Donut from './charts/donut'
import Donut2 from './charts/donut2'
import Donut3 from './charts/donut3'
import Donut4 from './charts/donut4'
import Donut5 from './charts/donut5'
import Line from './charts/line'
import Pie from './charts/pie'
import Pie2 from './charts/pie2'
import Pie3 from './charts/pie3'
import Pie4 from './charts/pie4'
import Pie5 from './charts/pie5'
import Pie6 from './charts/pie6'
import logo from './confus.jpg'

const randNum = (min, max) => Math.floor(Math.random() * max)
const generateData = (len, max = 100) => Array.apply(null, Array(len)).map(() => randNum(0, max))

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Dashboard</h2>
        </div>


        <Card header={
          <ChartHeader title="Page Views" subtitle="August 2016">
            {(width) => (
              <svg width={width} height={width / 4} style={{WebkitFilter: 'drop-shadow(0 3px 3px rgba(0, 0, 0, 0.5))'}}>
                <Line stroke="white" data={generateData(8, width / 4)} width={width} height={width / 4} />
              </svg>
            )}
          </ChartHeader>
        }>
          <div style={{ textAlign: 'center' }}>
            <svg width={120} height={120}>
              <Donut
                data={generateData(2, 100)}
                innerRadius={120 / 2 * .4}
                radius={120 / 2}
              />
            </svg>
          </div>
        </Card>


        <Card header="Pie Chart">
          <svg width={200} height={200}>
            <Pie radius={100} data={generateData(6, 20)} />
          </svg>
        </Card>

        <Card header="Pie Chart (test 2)">
          <svg width={200} height={200}>
            <Pie2 radius={100} data={generateData(6, 20)} />
          </svg>
        </Card>

        <Card header="Pie Chart (test 3)">
          <svg width={200} height={200}>
            <Pie3 radius={100} data={generateData(6, 20)} />
          </svg>
        </Card>

        <Card header="Pie Chart (test 4)">
          <svg width={200} height={200}>
            <Pie4 radius={100} data={generateData(6, 20)} />
          </svg>
        </Card>

        <Card header="Pie Chart (test 5)">
          <svg width={200} height={200}>
            <Pie5 radius={100} data={generateData(6, 20)} />
          </svg>
        </Card>

        <Card header="Pie Chart (test 6)">
          <svg width={200} height={200}>
            <Pie6 radius={100} data={generateData(6, 20)} />
          </svg>
        </Card>

        <Card header="Donut Chart">
          <svg width={200} height={200}>
            <Donut radius={100} innerRadius={80} data={generateData(5, 20)} />
          </svg>
        </Card>

        <Card header="Donut Chart (test 2)">
          <svg width={200} height={200}>
            <Donut2 radius={100} innerRadius={80} data={generateData(5, 20)} />
          </svg>
        </Card>

        <Card header="Donut Chart (test 3)">
          <svg width={200} height={200}>
            <Donut3 radius={100} innerRadius={80} data={generateData(5, 20)} />
          </svg>
        </Card>

        <Card header="Donut Chart (test 4)">
          <svg width={200} height={200}>
            <Donut4 radius={100} innerRadius={80} data={generateData(5, 20)} />
          </svg>
        </Card>

        <Card header="Donut Chart (test 5)">
          <svg width={200} height={200}>
            <Donut5 radius={100} innerRadius={80} data={generateData(5, 20)} />
          </svg>
        </Card>

        <Card header="Line Chart">
          <svg width={200} height={100}>
            <Line stroke="lightblue" data={generateData(8)} width={200} height={100} />
          </svg>
        </Card>

        <Card header="Bar Chart">
          <svg width={200} height={100}>
            <Bar stroke="#43ADB4" data={generateData(8)} width={200} height={100} />
          </svg>
        </Card>
      </div>
    )
  }
}

import React from 'react';
import { AreaClosed, Line, Bar } from '@vx/shape';

import { curveMonotoneX } from '@vx/curve';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import demoData from '../../../StockDataJSON.json';
import { compose } from 'redux';
import { connect } from 'react-redux';






let orig = demoData

// Stock data transformation ---- json to array [{date:"date", close:"close"}]

//------------------END--------------------------------


// const stock = dataModified(orig);

// console.log(dataModified(orig))
// let stock = appleStock;
// console.log(appleStock);
// stock.slice(800);

// util
const formatDate = timeFormat("%b %d, '%y");
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;
const bisectDate = bisector(d => new Date(d.date)).left;



class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.handleTooltip = this.handleTooltip.bind(this);
    this.state={
      stock:this.props.stock
    }
  }

  shouldComponentUpdate(prevProps, prevState) {
    console.log('rerender')
    if(this.props.stock !== prevState.stock) {return true} return false
  }

  handleTooltip({ event, data, xStock, xScale, yScale }) {  
    const { showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: yScale(d.close)
    });
  }

  render() {
    const width = 1000;
    const height = 500;
    const margin = { top: 0, bottom: 0, left: 0, right: 0 };
    const {
      
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      events
    } = this.props;
    if (width < 10) return null;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(this.props.stock, xStock)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(this.props.stock, yStock) + yMax / 3],
      nice: true
    });

     
    return (
      
      <div>
        <svg ref={s => (this.svg = s)} width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill="#fff" rx={14} />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000" stopOpacity={1} />
              <stop offset="100%" stopColor="#000" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <GridRows
            lineStyle={{ pointerEvents: 'none' }}
            scale={yScale}
            width={xMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
          />
          <GridColumns
            lineStyle={{ pointerEvents: 'none' }}
            scale={xScale}
            height={yMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
          />
          <AreaClosed
            data={this.props.stock}
            x={d => xScale(xStock(d))}
            y={d => yScale(yStock(d))}
            yScale={yScale}
            strokeWidth={1}
            stroke={'url(#gradient)'}
            fill={'url(#gradient)'}
            curve={curveMonotoneX}
          />
          
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            rx={14}
            data={this.props.stock}
            onTouchStart={event =>
                this.handleTooltip({
                    event,
                    xStock,
                    xScale,
                    yScale,
                    data: this.props.stock
                })
            }
            onTouchMove={event =>
              this.handleTooltip({
                event,
                xStock,
                xScale,
                yScale,
                data: this.props.stock
              })
            }
            onMouseMove={event =>
              this.handleTooltip({
                event,
                xStock,
                xScale,
                yScale,
                data: this.props.stock
              })
            }
            onMouseLeave={event => hideTooltip()}
          />
          {tooltipData && console.log('tooltip') && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: yMax }}
                stroke="rgba(92, 119, 235, 1.000)"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray="2,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill="rgba(92, 119, 235, 1.000)"
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={{
                backgroundColor: 'rgba(92, 119, 235, 1.000)',
                color: 'white'
              }}
            >
              {`$${yStock(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={yMax - 14}
              left={tooltipLeft}
              style={{
                transform: 'translateX(-50%)'
              }}
            >
              {formatDate(xStock(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
}


export default withTooltip(StockChart);
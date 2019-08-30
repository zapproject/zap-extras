function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { CurveSvgLineChart } from 'zap-curve-chart/lib/CurveSvgLineChart';
import { Message } from '../message/Message';
export class CurveChart extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "divRef", void 0);

    _defineProperty(this, "chart", void 0);

    this.divRef = React.createRef();
    this.state = {
      error: null
    };
  }

  componentDidMount() {
    this.chart = new CurveSvgLineChart(this.divRef.current, {
      width: this.props.width || this.divRef.current.clientWidth,
      height: this.props.height || 150,
      maxDots: 150
    }, {
      backgroundColor: 'white',
      borderColor: 'black',
      pointBorderColor: 'black',
      pointBackgroundColor: 'black'
    }, {
      shadowBlur: 0,
      shadowColor: 'black',
      shadowRadius: 1
    });

    try {
      this.chart.draw(this.props.curves, this.props.dotsIssued);
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
  }

  componentDidUpdate() {
    try {
      this.chart.draw(this.props.curves, this.props.dotsIssued);
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    const error = this.state.error;
    if (error) return React.createElement(Message, {
      type: "error"
    }, error);
    return React.createElement("div", {
      className: "curve-chart",
      ref: this.divRef
    });
  }

}
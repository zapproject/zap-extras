import * as React from 'react';
import { CurveSvgLineChart } from 'zap-curve-chart/lib/CurveSvgLineChart';
import { Message } from '../message/Message';

interface Props {
  curves: number[];
  dotsIssued?: number;
  width?: number;
  height?: number;
}

interface State {
  error: string;

}

export class CurveChart extends React.PureComponent<Props, State> {

  divRef: React.RefObject<HTMLDivElement>;
  chart: CurveSvgLineChart;

  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.state = {error: null};
  }

  componentDidMount() {
    this.chart = new CurveSvgLineChart(
      this.divRef.current,
      {
        width: this.props.width || this.divRef.current.clientWidth,
        height: this.props.height || 150,
        maxDots: 150,
      },
      {
        backgroundColor: 'white',
        borderColor: 'black',
        pointBorderColor: 'black',
        pointBackgroundColor: 'black',
      },
      {
        shadowBlur: 0,
        shadowColor: 'black',
        shadowRadius: 1,
      },
    );
    try {
      this.chart.draw(this.props.curves, this.props.dotsIssued);
    } catch (e) {
      this.setState({error: e.message});
    }
  }

  componentDidUpdate() {
    try {
      this.chart.draw(this.props.curves, this.props.dotsIssued);
    } catch (e) {
      this.setState({error: e.message});
    }
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    const error = this.state.error;
    if (error) return <Message type="error">{error}</Message>
    return (
      <div className="curve-chart" ref={this.divRef}></div>
    );
  }
}

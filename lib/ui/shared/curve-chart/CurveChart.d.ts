import * as React from 'react';
import { CurveSvgLineChart } from 'zap-curve-chart/lib/CurveSvgLineChart';
interface Props {
    curves: number[];
    dotsIssued?: number;
    width?: number;
    height?: number;
}
interface State {
    error: string;
}
export declare class CurveChart extends React.PureComponent<Props, State> {
    divRef: React.RefObject<HTMLDivElement>;
    chart: CurveSvgLineChart;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};

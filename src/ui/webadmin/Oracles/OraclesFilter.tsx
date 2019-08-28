import * as React from 'react';
import { BondedCheckbox } from './BondedCheckbox';
const style = require('./oracles.css');

export class OraclesSearch extends React.PureComponent<{bonded: any, bondedChange: any, defaultValue: string, onChange: (e: any) => void, disabled: boolean}, {value: string}> {
  timeout;
  constructor(props) {
    super(props);
    this.state = {value: props.defaultValue};
    this.onChange = this.onChange.bind(this);
    this.emit = this.emit.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.defaultValue !== this.props.defaultValue && !this.timeout && this.state.value !== this.props.defaultValue) {
      this.setState({value: this.props.defaultValue});
    }
  }
  onChange(e) {
    this.setState({value: e.target.value});
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.emit();
      this.timeout = null;
    }, 300);
  }
  emit() {
    this.props.onChange(this.state.value);
  }
  render() {
    const props = {
      disabled: this.props.disabled,
      onChange: this.onChange,
      value: this.state.value,
    }
    return (
      <div className={style['oracles-filter']}>
        <div className={style["form-group"]}>
          <input onBlur={this.emit} placeholder="Search by address or name" type="text" {...props} />
        </div>
        <BondedCheckbox bonded={this.props.bonded} change={this.props.bondedChange} />
      </div>
    );
  }
}
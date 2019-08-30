import * as React from 'react';
const style = require('./oracle-address-copy.css');

export class OracleCopyIcon extends React.PureComponent<{address: string}, {copy: number}> {
  state = {copy: 0};
  textareaRef: React.RefObject<HTMLTextAreaElement> = React.createRef();
  timeout: number;
  constructor(props) {
    super(props);
    this.handleCopy = this.handleCopy.bind(this);
  }
  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }
  handleCopy(e) {
    e.preventDefault();
    this.setState({ copy: 1 }, () => {
      this.textareaRef.current.focus();
      this.textareaRef.current.select();
      document.execCommand('copy');
      this.setState({ copy: 2 });
      setTimeout(() => { this.setState({ copy: 0, }) }, 800);
    });
  }
  render() {
    const className = (this.state.copy === 2 ? style['copied'] : '') + ' ' + style['root'];
    return (
      <a className={className} href="#" title={this.props.address} onClick={this.handleCopy}>
        {this.state.copy === 1 && <textarea ref={this.textareaRef} defaultValue={this.props.address}></textarea>}
      </a>
    );
  }
}
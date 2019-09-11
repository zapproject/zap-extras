import * as React from 'react';
import './help.css';
const style = require("./help.css");

export class Help extends React.PureComponent<{children: string}> {
  render() {
    if (!this.props.children) return null;
    return(
      <React.Fragment>
        <div className={style['help-icon']}></div>
        <div className={style['help-popup']} dangerouslySetInnerHTML={{__html: this.props.children}}></div>
      </React.Fragment>
    );
  }
}

import * as React from 'react';
const styleEmbedded = require('./endpoint-embeded-code.css');
const styleOracles =  require('./oracle-address-copy.css');

interface Props {
  provider: string; endpoint: string
}

export class EndpointEmbededCode extends React.PureComponent<Props> {

  private textareaRef: React.RefObject<HTMLTextAreaElement> = React.createRef<HTMLTextAreaElement>();

  private get embedDev() {
    const { provider, endpoint } = this.props;
    return `<zap-bond-widget address="${provider}" endpoint="${endpoint}"></zap-bond-widget>
<script defer src="https://unpkg.com/zap-bond-widget@latest"></script>`;
  }

  handleCopy(e) {
    e.preventDefault();
    this.textareaRef.current.focus();
    this.textareaRef.current.select();
    document.execCommand('copy');
  }

  componentDidMount() {
    this.textareaRef.current.setSelectionRange(0, this.textareaRef.current.value.length);
    this.textareaRef.current.focus();
  }

  render() {
    return <div className={styleEmbedded["oracle-embeded-code"]}>
      <textarea ref={this.textareaRef} defaultValue={this.embedDev} readOnly={true}>
      </textarea>
      <a className={styleOracles["oracle-address-copy"]} title="Copy" onClick={e => this.handleCopy(e)}></a>
    </div>
  }
}

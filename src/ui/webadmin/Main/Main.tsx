import * as React from 'react';
import { Menu } from '../Menu/Menu';

const style = require('../webadmin.css');


const Address = (props: {children: string}) => (
  <div className="address">Address: {props.children}</div>
);

const Provider = (props: {children: string}) => (
  <div>
    {props.children ? 'Found provider: ' + props.children : 'This account is currently not setup as a provider'}
  </div>
);

interface Props {
  handleLogout: () => void;
  providerTitle: string;
  subscriberAddress: string;
}

interface State {
}

export class Main extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const { providerTitle, subscriberAddress, children } = this.props;
    const [ menu, mainSection, help ] = children as any[];
    return (
      <React.Fragment>
        <header className={style['header']}>
          <Address>{subscriberAddress}</Address>
          <Provider>{providerTitle}</Provider>
          <a onClick={this.props.handleLogout} className={style['logout']} title="Log out"></a>
        </header>
        <main className={style['main']}>
          <div className={style['main-container']}>
            {menu}
            <section className={style['main-section']}>
              {mainSection}
              {help}
            </section>
          </div>
        </main>
      </React.Fragment>
    );
  }
};

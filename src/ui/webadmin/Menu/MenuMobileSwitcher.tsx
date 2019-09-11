import * as React from 'react';

const style = require('menu.css');

export function MenuMobileSwitcher() {

	const [ mobileMenuOpened, setMobileMenuOpened ] = React.useState(false);

	const handleMenuChange = () => {
		setMobileMenuOpened(false);
	}

	React.useEffect(() => {
		window.addEventListener('hashchange', handleMenuChange);
		return () => {
			window.removeEventListener('hashchange', handleMenuChange);
		}
	}, []);

	return (
		<div
			className={
				mobileMenuOpened
				? `${style['mobile-menu-switcher']} ${style['mobile-menu-switcher_opened']}`
				: style['mobile-menu-switcher']
			}
			onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
		/>
	);
}

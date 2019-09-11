import * as React from 'react';
const style = {
  "root": "zap-extras-menu-root",
  "active": "zap-extras-menu-active",
  "foldable": "zap-extras-menu-foldable",
  "foldable-items": "zap-extras-menu-foldable-items",
  "expanded": "zap-extras-menu-expanded",
  "foldable-title": "zap-extras-menu-foldable-title",
  "mobile-menu-switcher": "zap-extras-menu-mobile-menu-switcher",
  "mobile-menu-switcher_opened": "zap-extras-menu-mobile-menu-switcher_opened"
}; // @related-file menu.css

export function MenuMobileSwitcher() {
  const [mobileMenuOpened, setMobileMenuOpened] = React.useState(false);

  const handleMenuChange = () => {
    setMobileMenuOpened(false);
  };

  React.useEffect(() => {
    window.addEventListener('hashchange', handleMenuChange);
    return () => {
      window.removeEventListener('hashchange', handleMenuChange);
    };
  }, []);
  return React.createElement("div", {
    className: mobileMenuOpened ? `${style['mobile-menu-switcher']} ${style['mobile-menu-switcher_opened']}` : style['mobile-menu-switcher'],
    onClick: () => setMobileMenuOpened(!mobileMenuOpened)
  });
}
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../src/ui/webadmin/webadmin.css';

addDecorator(
  withInfo({
		header: false, // Global configuration for the info addon across all of your stories.
		inline: true,
  })
);

addParameters({
	options: {
		showNav: true,
		showPanel: true,
		panelPosition: 'right',
	},
	viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

const req = require.context('../src', true, /\.stories.jsx?$/);

function loadStories() {
	// require('./welcomeStory.js');
	req.keys().forEach(req);
}

configure(loadStories, module);

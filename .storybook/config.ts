import { configure } from '@storybook/react';
import '../src/ui/webadmin/webadmin.css';

const req = require.context('../src', true, /\.stories.jsx?$/);

function loadStories() {
	// require('./welcomeStory.js');
	req.keys().forEach(req);
}

configure(loadStories, module);

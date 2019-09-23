import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CurveChart } from './CurveChart';
import { withKnobs, array, number } from '@storybook/addon-knobs';


const stories = storiesOf('CurveChart', module);

stories.addDecorator(withKnobs);

stories.add('CurveChart', () => {
	const curves = array('Curve values', [ 3, 0, 0, 1, 1000, 1, 50000, 2000 ]).map(Number);
	const dotsIssued = number('Dots Issued', 250)
	return (
		<CurveChart
			curves={curves}
			dotsIssued={dotsIssued}
			width={500}
			heigth={150}
		/>
	);
});

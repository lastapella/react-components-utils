import * as React from 'react';
import { Icon } from 'antd';

interface IProps {
	locationKey: string;
	gateKey: string;
	updateMessageFromHardware: (
		locationKey: string,
		gateKey: string
	) => Promise<any>;
	fetchGate: (locationKey: string, gateKey: string) => Promise<any>;
}

interface IState {
	refreshingMessage: boolean;
}

export default class MessageFieldSuffix extends React.Component<
	IProps,
	IState
> {
	public constructor(props: any) {
		super(props);
		this.state = { refreshingMessage: false };
	}

	public refreshLCDMessage() {
		const {
			locationKey,
			gateKey,
			updateMessageFromHardware,
			fetchGate
		} = this.props;
		this.setState(() => ({ refreshingMessage: true }));
		updateMessageFromHardware(locationKey, gateKey).then(() =>
			fetchGate(locationKey, gateKey).then(() =>
				this.setState(() => ({ refreshingMessage: false }))
			)
		);
	}
	public render() {
		const { refreshingMessage } = this.state;
		return (
			<Icon
				type={refreshingMessage ? 'loading' : 'reload'}
				// tslint:disable-next-line:jsx-no-lambda
				onClick={() => this.refreshLCDMessage()}
			/>
		);
	}
}

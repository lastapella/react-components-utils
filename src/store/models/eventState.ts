// @TODO
export interface IEvent {
	vehicles: [string];
	[key: string]: any;
}

export interface IEventState {
	[key: string]: Readonly<IEvent>;
}

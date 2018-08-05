// @TODO
export interface IDriver {
	vehicles: [string];
	[key: string]: any;
}

export interface IDriverState {
	[key: string]: Readonly<IDriver>;
}

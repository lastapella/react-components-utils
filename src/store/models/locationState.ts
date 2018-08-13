// @TODO
export interface ILocation {
	[key: string]: any;
}

export interface ILocationState {
	[key: string]: Readonly<ILocation>;
}

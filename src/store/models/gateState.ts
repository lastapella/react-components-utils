// @TODO
export interface IGate {
	[key: string]: any;
}

export interface IGateState {
	[key: string]: Readonly<IGate>;
}

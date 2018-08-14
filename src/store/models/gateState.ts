// @TODO
export interface IGate {
	[key: string]: any;
}

export interface IGateList {
	[gateKey: string]: Readonly<IGate>;
}
export interface IGateState {
	[locationKey: string]: IGateList;
}

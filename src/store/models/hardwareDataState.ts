// @TODO
export interface IHardwareData {
	vehicles: [string];
	[key: string]: any;
}

export interface IHardwareDataState {
	[key: string]: Readonly<IHardwareData>;
}

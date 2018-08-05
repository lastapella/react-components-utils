// @TODO
export interface IVehicle {
	iunumber: string;
	color?: string;
	brand?: string;
	model?: string;
	lpnumber?: string;
	drivers: string[];
}

export interface IVehicleState {
	[key: string]: Readonly<IVehicle>;
}

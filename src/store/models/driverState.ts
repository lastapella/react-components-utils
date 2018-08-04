// @TODO
export interface IDriver {
	[key: string]: any;
}

export interface IDriverState  { [key: string]: Readonly<IDriver> };

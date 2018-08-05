// @TODO
export interface IAdministrator {
	[key: string]: any;
}

export interface IAdministratorState  { [key: string]: Readonly<IAdministrator> };

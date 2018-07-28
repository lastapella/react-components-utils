export const addRef = (
	db: firebase.database.Database,
	refBase: string,
	args: { [key: string]: string },
	key: string | null = null
) => {
	let newKey: string;
	if (key) {
		newKey = key as string;
	} else {
		newKey = db.ref(refBase).push().key as string;
	}
	return db
		.ref(refBase + newKey)
		.set(args)
		.then(() => newKey);
};

export const updateRef = (
	db: firebase.database.Database,
	refBase: string,
	args: { [key: string]: string },
	key?: string
) => {
	return db.ref(refBase + key).update(args);
};

export const readRef = (db: firebase.database.Database, refBase: string) => {
	return db.ref(refBase).once('value');
};

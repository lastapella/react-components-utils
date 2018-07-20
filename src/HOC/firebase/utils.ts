export const addRef = (
	db: firebase.database.Database,
	refBase: string,
	args: { [key: string]: string }
) => {
	const newKey = db.ref(refBase).push().key;
	return db.ref(refBase + newKey).set(args);
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

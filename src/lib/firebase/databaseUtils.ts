export const addRef = (
	db: firebase.database.Database,
	refBase: string,
	args: { [key: string]: any },
	key: string | null = null
) => {
	let newKey: string;
	if (key) {
		// Key defined by params
		newKey = key as string;
	} else {
		// new Key generation
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
	args: { [key: string]: any }
) => {
	return db.ref(refBase).update(args);
};

export const readRef = (db: firebase.database.Database, refBase: string) => {
	return db.ref(refBase).once('value');
};

export const removeRef =(db: firebase.database.Database, refBase: string) => {
	return db.ref(refBase).remove();
}; 

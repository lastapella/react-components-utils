export const normalizeSnapshotList = <T extends {}>(
	snapshot: firebase.database.DataSnapshot
): T => {
	const result = {};
	snapshot.forEach(childSnapshot => {
		Object.assign(
			result,
			{ ...result },
			{ [childSnapshot.key as string]: { ...childSnapshot.val() } }
		);
	});
	return result as T;
};

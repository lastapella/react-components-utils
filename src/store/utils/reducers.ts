export const getConcatList = (
	currentList: { [key: string]: any },
	concatList: { [key: string]: any }
) => {
	return { ...currentList, ...concatList };
};

export const removeWithKey = (list: { [key: string]: any }, key: string) => {
	const { [key]: _, ...nextState } = list;
	return nextState;
	// return [...list.slice(0, index), ...list.slice(index + 1)];
};

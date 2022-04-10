export const quitarAcentos = (str) => {
	if (!str) return '';
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const searchFound = (search, text) => {
	search = quitarAcentos(String(search));
	text = quitarAcentos(String(text));

	const regex = new RegExp(search, 'gi');
	return regex.test(text);
};

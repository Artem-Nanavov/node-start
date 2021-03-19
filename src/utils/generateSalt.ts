const generateSalt = (len: number): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
	const charactersLength = characters.length;

	for (let i = 0; i < len; i += 1) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};

export default generateSalt;

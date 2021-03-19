import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';

export const decodeFunc = (payload: any) => {
	const rawStr = JSON.stringify(payload);
	const wordArray = Utf8.parse(rawStr);
	const base64 = Base64.stringify(wordArray);

	return base64;
};

export const encodeFunc = (base64: string) => {
	const parsedWordArray = Base64.parse(base64);

	return JSON.parse(parsedWordArray.toString(Utf8));
};

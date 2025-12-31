const HexColorRegex = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

export const shiftHexColor = (hexColor: string, shift: number): string => {
	let hexString = "";
	let alphaString = "";

	if (!HexColorRegex.test(hexColor)) {
		return hexColor; // or throw?
	}

	if (hexColor.length <= 5) {
		hexString = hexColor.substring(1, 4);
		hexString = padTo6Chars(hexString);
		alphaString = hexColor.substring(4);
	} else {
		hexString = hexColor.substring(1, 7);
		alphaString = hexColor.substring(7);
	}

	const colorValue: number = Number.parseInt(hexString, 16);

	const channels: number[] = extractRGBChannels(colorValue);

	const shiftedChannels: number[] = shiftColorChannels(channels, shift);

	const rgb = shiftedChannels.reduce((prev, current) => `${prev}${current.toString(16).padStart(2, "0")}`, "#");

	const alphaSuffix = alphaString.length === 1 ? `${alphaString}${alphaString}` : alphaString;

	return alphaString ? `${rgb}${alphaSuffix}` : rgb;
};

export const padTo6Chars = (hexString: string): string => {
	return hexString.length === 3
		? `${hexString[0]}${hexString[0]}${hexString[1]}${hexString[1]}${hexString[2]}${hexString[2]}`
		: hexString;
};

export const extractRGBChannels = (hexColor: number): number[] => {
	const red = (hexColor & 0xff0000) >> 16;
	const green = (hexColor & 0x00ff00) >> 8;
	const blue = hexColor & 0x0000ff;

	return [red, green, blue];
};

export const shiftColorChannels = (colorChannels: number[], shift: number): number[] => {
	return colorChannels.map((color) => Math.min(Math.max(color + shift, 0), 255));
};

const ShortHexColorRegex = /^#([0-9a-fA-F]{3})$/;
const ShortHexColorRegexWithAlpha = /^#([0-9a-fA-F]{4})$/;
const LongHexColorRegex = /^#([0-9a-fA-F]{6})$/;
const LongHexColorRegexWithAlpha = /^#([0-9a-fA-F]{8})$/;

export const shiftHexColor = (hexColor: string, shift: number): string => {
	let hexString = hexColor.substring(1);
	let alphaString = "";

	if (ShortHexColorRegexWithAlpha.test(hexColor)) {
		hexString = hexColor.substring(1, 4);
		alphaString = hexColor.substring(4);
	} else if (LongHexColorRegexWithAlpha.test(hexColor)) {
		hexString = hexColor.substring(1, 7);
		alphaString = hexColor.substring(7);
	} else if (ShortHexColorRegex.test(hexColor) || LongHexColorRegex.test(hexColor)) {
		hexString = hexColor.substring(1);
	} else {
		return hexColor;
	}

	// expand to 6 chars
	hexString =
		hexString.length === 3
			? hexString
					.split("")
					.map((c) => `${c}${c}`)
					.join("")
			: hexString;

	// convert to numbers
	const colorValue: number = Number.parseInt(hexString, 16);

	// extract channels
	const channels: number[] = extractRGBChannels(colorValue);

	// shift value
	const shiftedChannels: number[] = shiftColorChannels(channels, shift);

	// combine to hex string
	const rgb = shiftedChannels.reduce((prev, current) => `${prev}${current.toString(16).padStart(2, "0")}`, "#");

	const alphaSuffix = alphaString.length === 1 ? `${alphaString}${alphaString}` : alphaString;

	return alphaString ? `${rgb}${alphaSuffix}` : rgb;
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

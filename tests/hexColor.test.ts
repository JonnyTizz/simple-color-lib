import { describe, expect, it } from "vitest";

import { extractRGBChannels, shiftColorChannels, shiftHexColor } from "../src/hexColor";

describe("testing bit shifting", () => {
	// experiment test case for understanding bitwise operations
	it.skip("should map hex values", () => {
		const hex = 0xaabbcc;
		const mask = 0xff0000;
		const shiftAmount = 16;
		const hexBinaryString = hex.toString(2);

		const maskedHex = hex & mask;
		const maskedHexBinaryString = maskedHex.toString(2);
		const maskedHexHexString = maskedHex.toString(16);

		const maskedShiftedHex = maskedHex >> shiftAmount;
		const maskedShiftedHexString = maskedShiftedHex.toString(16);

		const shiftedHex = hex >> shiftAmount;
		const shiftedHexString = shiftedHex.toString(16);

		const shiftedMaskedHex = shiftedHex & mask;
		const shiftedMaskedHexString = shiftedMaskedHex.toString(16);

		console.log("hexBinaryString", hexBinaryString, hexBinaryString.length);
		console.log("maskedHexBinaryString", maskedHexBinaryString, maskedHexBinaryString.length);

		console.log("maskedHexHexString", maskedHexHexString);
		console.log("maskedShiftedHexString", maskedShiftedHexString);

		console.log("shiftedHexString", shiftedHexString);
		console.log("shiftedMaskedHexString", shiftedMaskedHexString);
	});
});

describe("hex color helpers", () => {
	describe("color shifting", () => {
		it("should shift hex color up by 10", () => {
			// Act
			const shiftedColor = shiftHexColor("#942ccc", 10);

			// Assert
			expect(shiftedColor).toEqual("#9e36d6");
		});

		it("should shift hex color down by 10", () => {
			// Act
			const shiftedColor = shiftHexColor("#942ccc", -10);

			// Assert
			expect(shiftedColor).toEqual("#8a22c2");
		});

		it("should pad color channels to 2 chars each if they are only one char when shifted", () => {
			// Act
			const shiftedColor = shiftHexColor("#1A1A1A", -20);

			// Assert
			expect(shiftedColor).toEqual("#060606");
		});

		it("should handle long hex colors with alpha", () => {
			// Act
			const shiftedColor = shiftHexColor("#942ccc34", 10);

			// Assert
			expect(shiftedColor).toEqual("#9e36d634");
		});

		it("should handle short hex colors", () => {
			// Act
			const shiftedColor = shiftHexColor("#abc", 10);

			// Assert
			expect(shiftedColor).toEqual("#b4c5d6");
		});

		it("should handle short hex colors with alpha", () => {
			// Act
			const shiftedColor = shiftHexColor("#abcd", 10);

			// Assert
			expect(shiftedColor).toEqual("#b4c5d6dd");
		});
	});

	describe("extract color channels", () => {
		it("should extract color channel from hex number", () => {
			// Act
			const channels = extractRGBChannels(0x942ccc);

			// Assert
			expect(channels).toEqual([148, 44, 204]);
		});
	});

	describe("shift color channels", () => {
		it("should shift color channels up evenly", () => {
			// Arrange
			const channels = [100, 150, 200];

			// Act
			const shiftedChannels = shiftColorChannels(channels, 10);

			// Assert
			expect(shiftedChannels).toEqual([110, 160, 210]);
		});

		it("should shift color channels down evenly", () => {
			// Arrange
			const channels = [100, 150, 200];

			// Act
			const shiftedChannels = shiftColorChannels(channels, -10);

			// Assert
			expect(shiftedChannels).toEqual([90, 140, 190]);
		});

		it("should clamp color channels to a minimum of 0", () => {
			// Arrange
			const channels = [5, 3, 7];

			// Act
			const shiftedChannels = shiftColorChannels(channels, -10);

			// Assert
			expect(shiftedChannels).toEqual([0, 0, 0]);
		});

		it("should clamp color channels to a maximum of 255", () => {
			// Arrange
			const channels = [250, 253, 255];

			// Act
			const shiftedChannels = shiftColorChannels(channels, 10);

			// Assert
			expect(shiftedChannels).toEqual([255, 255, 255]);
		});
	});
});

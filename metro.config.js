// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

module.exports = async () => {
	const config = getDefaultConfig(__dirname, {
		// Enable CSS support.
		isCSSEnabled: true,
	});

	config.transformer.getTransformOptions = async () => ({
		transform: {
			experimentalImportSupport: false,
			inlineRequires: false,
		},
	});

	config.resolver.sourceExts = [
		"jsx",
		"js",
		"ts",
		"tsx",
		"cjs",
		"json",
		"mjs",
	];

	config.resolver.assetExts = [
		"glb",
		"gltf",
		"png",
		"jpg",
		"jpeg",
		"svg",
		"mp3",
		"wav",
		"ogg",
		"ttf",
		"otf",
		"obj",
		"mtl",
	];

	return config;
};

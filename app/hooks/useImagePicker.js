import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function useImagePicker() {
	// State to store the selected image URI
	const [selectedImage, setSelectedImage] = useState(null);

	// Function to pick an image from the device's media library
	const pickImageAsync = async () => {
		try {
			// Request permission to access the media library
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				alert(
					"Sorry, we need camera roll permissions to make this work!"
				);
				return;
			} else {
				// Launch the image picker
				let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: false,
					quality: 0.8,
					maxWidth: 200,
					maxHeight: 200,
				});

				// If an image is selected, update the state
				if (!result.canceled) {
					setSelectedImage(result.assets[0].uri);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Function to save the selected image to a custom album
	const saveImage = async () => {
		try {
			// Create a media library asset from the selected image
			const asset = await MediaLibrary.createAssetAsync(selectedImage);

			// Create a custom album named "dino-trak" if it doesn't exist
			await MediaLibrary.createAlbumAsync("dino-trak", asset, false);
		} catch (error) {
			console.log(error);
		}
	};

	// Function to retrieve the latest saved image from the custom album
	const getSavedImage = async () => {
		try {
			// Get the "dino-trak" album
			const album = await MediaLibrary.getAlbumAsync("dino-trak");

			// Get the latest asset from the album
			const assets = await MediaLibrary.getAssetsAsync({
				album: album,
				sortBy: MediaLibrary.SortBy.modificationTime,
				first: 1,
			});

			// Return the URI of the latest asset
			const asset = assets.assets[0].uri;
			return asset;
		} catch (error) {
			console.log(error);
		}
	};

	// Return the functions and state for external usage
	return { selectedImage, pickImageAsync, saveImage, getSavedImage };
}

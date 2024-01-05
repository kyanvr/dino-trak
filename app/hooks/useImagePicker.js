import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function useImagePicker() {
	const [selectedImage, setSelectedImage] = useState(null);

	const pickImageAsync = async () => {
		try {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				alert(
					"Sorry, we need camera roll permissions to make this work!"
				);
				return;
			} else {
				let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: false,
					quality: 0.8,
                    maxWidth: 200,
                    maxHeight: 200,
				});
				if (!result.canceled) {
					setSelectedImage(result.assets[0].uri)
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

    const saveImage = async () => {
        try {
            const asset = await MediaLibrary.createAssetAsync(selectedImage);
            await MediaLibrary.createAlbumAsync("dino-trak", asset, false);
        } catch (error) {
            console.log(error);
        }
    }

    const getSavedImage = async () => {
        try {
            const album = await MediaLibrary.getAlbumAsync("dino-trak");
            const assets = await MediaLibrary.getAssetsAsync({album: album, sortBy: MediaLibrary.SortBy.modificationTime, first: 1});
            const asset = assets.assets[0].uri;
            return asset;
        } catch (error) {
            console.log(error);
        }
    }

	return { selectedImage, pickImageAsync, saveImage, getSavedImage };
}

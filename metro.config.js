'use strict';
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
    const {
        resolver: {
            assetExts
        }
    } = await getDefaultConfig();
    return {
        resolver: {
            assetExts: [
                ...assetExts, // Keep Expo's default asset extensions
                "obj",   // For .obj 3D models
                "mtl",   // For .mtl material files (often used with .obj)
                // "vrx",   // For Viro's custom format (e.g., from FBX conversion)
                // "gltf",  // For GLTF JSON files
                // "glb",   // For GLTF Binary files (self-contained)
                // "bin",   // For binary data referenced by .gltf files
                // "arobject", // Optional: For iOS ARKit specific objects
                // "usdz"      // Optional: For Universal Scene Description format (iOS)
            ]
            // You typically don't need to add 'png', 'jpg', etc., here again
            // as Expo's default config already handles standard image types.
        }
    };
})();
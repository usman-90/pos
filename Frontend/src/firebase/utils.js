import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.js";

export const uploadImageAndGetURL = async (path, file) => {
  const imagesRef = ref(storage, `images/${path}`);
  await uploadBytes(imagesRef, file);
  console.log("Uploaded an image");
  const url = await getDownloadURL(imagesRef);
  return url;
};

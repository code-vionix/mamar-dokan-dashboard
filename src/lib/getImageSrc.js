const getImageSrc = (image) => {
  if (typeof image === "string") {
    return image;
  }

  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  return "";
};

export default getImageSrc;

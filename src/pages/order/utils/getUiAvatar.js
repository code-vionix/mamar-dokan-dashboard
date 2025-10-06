const getUiAvatar = (char = "P", size = 40) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    char
  )}&size=${size}&background=FBBF24&color=1F2937&rounded=true`;

export default getUiAvatar;

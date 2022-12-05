export const createFileName = (str = '') => {
  const fileName = str + createTempString() + '.mp3';
  return fileName;
};

export const createTempString = () => {
  return new Date().getTime().toString(36);
};

export const createFileName = (str = '') => {
  const fileName = str + new Date().getTime().toString(36) + '.mp3';
  return fileName;
};

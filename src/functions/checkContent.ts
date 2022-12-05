export const filterContent = (str: string) => {
  if (isGIF(str)) {
    return 'GIF';
  } else if (isURL(str)) {
    return 'URL';
  } else {
    return str.replace(CHECK_IMO, '');
  }
};

const CHECK_IMO = /<.*?>/;

const isGIF = (str: string) => {
  if (str.search('https://tenor.com') === -1) {
    return false;
  } else {
    return true;
  }
};

const isURL = (str: string) => {
  if (str.search('https://') !== -1 || str.search('http://') !== -1) {
    return true;
  } else {
    return false;
  }
};

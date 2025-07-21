const extractBaseDomain = (hostname: string) => {
  const parts = hostname.split(".");
  if (parts.length >= 2) {
    return parts.slice(-2).join(".");
  }
  return hostname;
};

export const getUrlFavicon = (url: string) => {
  const hostname = new URL(url).hostname;
  const baseDomain = extractBaseDomain(hostname);
  return `https://www.google.com/s2/favicons?sz=64&domain=${baseDomain}`;
};

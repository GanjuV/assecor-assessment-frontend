/**
 * Method to modify the API URL
 *
 * @export
 * @param {*} data
 * @returns {*}
 */

export const GetURL = (url: string): string => {
  const index = url.search('/api') + 5;
  return url.substring(index, url.length);
};

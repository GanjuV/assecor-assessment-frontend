/**
 * Method for removing white spaces from starting and end of all the form fields.
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export const TrimSpaces = (data: any): any => {
  Object.keys(data).forEach((field) => {
    const value = data[field];
    if (value && value instanceof Object) {
      TrimSpaces(value);
    } else if (value) {
      data[field] = value.trim();
    }
  });
  return data;
};

export const GetURL = (url: string): string => {
  const index = url.search('/api') + 5;
  return url.substring(index, url.length);
};

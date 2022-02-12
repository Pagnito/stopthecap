// cuz shopify be retarded sometimes
const findIndexOfColorAndSize = (options) => {
  let indexes = {};
  options.forEach((obj, ind) => {
     indexes[obj.name.toLowerCase()] = ind;   
  });
  return indexes
};

export default findIndexOfColorAndSize;
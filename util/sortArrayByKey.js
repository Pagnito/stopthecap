const sortArrayByKey = (array, key, isDescending) => {
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    x = typeof x === "string" ? x.trim() : x;
    y = typeof y === "string" ? y.trim() : y;
    if (isDescending) {
      if (x === "N/A") {
        return 1;
      }
      if (y === "N/A") {
        return -1;
      }
      return x < y ? -1 : x > y ? 1 : 0;
    } else {
      if (x === "N/A") {
        return 1;
      }
      if (y === "N/A") {
        return -1;
      }
      return x > y ? -1 : x < y ? 1 : 0 
    }
  });
};

export default sortArrayByKey;

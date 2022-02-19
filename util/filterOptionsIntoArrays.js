export function filterOptionsIntoArrays(variants) {
  let otherOptions = {};
  let options = variants[0].node.selectedOptions;
  options.forEach((option, ind) => {
    otherOptions[option.name.toLowerCase()] = [];
    variants.forEach(({ node }) => {
      if (otherOptions[option.name.toLowerCase()].indexOf(node.selectedOptions[ind].value.toLowerCase()) < 0) {
        otherOptions[option.name.toLowerCase()].push(node.selectedOptions[ind].value.toLowerCase());
      }
    });
  });

  return otherOptions;
}

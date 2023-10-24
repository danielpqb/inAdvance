function mapToGrid(array: any[], columns: number) {
  let result = [];
  let subArr = [];
  for (const el of array) {
    subArr.push(el);
    if (subArr.length === columns) {
      result.push(subArr);
      subArr = [];
    }
  }
  if (subArr.length > 0) {
    result.push(subArr);
  }
  return result;
}

const arrayMapping = {
  mapToGrid,
};
export default arrayMapping;

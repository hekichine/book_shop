const RemoveLoop = (array) => {
  // array.filter((item, index) => {
  //   console.log(
  //     // a. Item
  //     item,
  //     // b. Index
  //     index,
  //     // c. indexOf
  //     array.indexOf(item),
  //     // d. Condition
  //     array.indexOf(item) === index
  //   );
  //   return array.indexOf(item) === index;
  // });
  const uniqueSet = new Set(array);
  return [...uniqueSet];
};
export { RemoveLoop };

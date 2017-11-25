/**
 * Waiting for the usage of a dedicated library for immutability, let's centralize
 * the methods here
 */

export function insertItem(array, item) {
  let newArray = array.slice();
  newArray.push(item);
  return newArray;
}

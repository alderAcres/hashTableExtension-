/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
}

/**
 * set - Adds given value to the hash table with specified key.
 *
 * - If the provided key has already been used to store another value, simply overwrite
 *   the existing value with the new value.
 * - If the hashed address already contains another key/value pair, you must handle
 *   the collision appropriately.
 *
 * @param {string} key - key to be used to create hashed address
 * @param {string|number|boolean} value - value to be stored in hash table
 * @return {number} The new number of items stored in the hash table
 */
HashTable.prototype.set = function(key, value) {
  // get index from running key through hashing function
  const index = hashCode(key, this.SIZE);
  // handle collisions -> use an object to store multiple key value pairs
  const item =
    typeof this.storage[index] === 'object' ? this.storage[index] : {};
  item[key] = value;

  // value to the storage at the index
  this.storage[index] = item;
};

/**
 * get - Retrieves a value stored in the hash table with a specified key
 *
 * - If more than one value is stored at the key's hashed address, then you must retrieve
 *   the correct value that was originally stored with the provided key
 *
 * @param {string} key - key to lookup in hash table
 * @return {string|number|boolean} The value stored with the specifed key in the
 * hash table
 */
HashTable.prototype.get = function(key) {
  // get index from running key through hashing function)
  const index = hashCode(key, this.SIZE);
  // retrieve the item at the index and get the value with the specified key in the case of collided values
  const item = this.storage[index];
  if (item === undefined) return undefined;
  return item[key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
  // get index from running key through hashing function
  const index = hashCode(key, this.SIZE);
  const item = this.storage[index];
  // key does not exist, so return undefined
  if (item === undefined) return undefined;
  // in case of collisions -> delete the property of the item at the key param
  // get keys to check for object length, if length > 0 then we have had a collision
  const keys = Object.keys(item);
  if (keys.length > 1) {
    const temp = item[key];
    delete item[key];
    return temp;
  } else {
    // else delete the item
    const temp = item[key];
    delete this.storage[index];
    return temp;
  }
};

// Do not modify
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

// const myHT = new HashTable();
// myHT.set('1', '🐇');
// myHT.set('2', '🌵');
// myHT.set('3', '🐓');
// /* myHT =>
// [
//   { '1': '🐇'},
//   { '2': '🌵'},
//   { '3': '🐓'}
// ]
// */
// // console.log('myHT after setting 3 elements', myHT);
// const getItem1 = myHT.get('1');
// const getItem2 = myHT.get('3');
// console.log('getItem1', getItem1); // => 🐓
// console.log('getItem2', getItem2); // => 🐇
// myHT.remove('1');
// /* myHT =>
// [
//   { '2': '🌵'},
//   { '3': '🐓'}
// ]
// */
// console.log('myHT after deleting element at key 1', myHT);
// console.log(myHT.remove('5')); // => undefined

// const collidedHT = new HashTable();

// for (let i = 0; i <= 30; i++) {
//   collidedHT.set(`key ${i}`, `value ${i}`);
// }

// console.log(collidedHT);

// for (let i = 0; i <= 30; i++) {
//   const retrieved = collidedHT.get(`key ${i}`);
//   console.log(`retrieved ${retrieved}, expected value ${i}`);
// }

// for (let i = 0; i <= 30; i++) {
//   if (i === 0) {
//     collidedHT.remove(`key ${i}`);
//   }
//   if (i === 11) {
//     collidedHT.remove(`key ${i}`);
//   }
//   if (i === 10) {
//     collidedHT.remove(`key ${i}`);
//   }
//   if (i === 22) {
//     collidedHT.remove(`key ${i}`);
//   }
// }
// console.log(collidedHT); // => should still have key 1, 21
// console.log(collidedHT.get('key 25')); // => value 25
// console.log(collidedHT.get('key 21')); // => value 21
// console.log(collidedHT.get('key 22')); // => undefined

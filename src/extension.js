/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.SIZE = 16;
  this.totalItems = 0;
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

HashTable.prototype.set = function (key, value) {
  const hashKey = hashCode(key, this.SIZE);
  const itemLimit = this.SIZE * 0.75;
  if (this.totalItems + 1 > itemLimit) {
    this.SIZE *= 2;
    this.storage.forEach((ob) => {
      Object.entries(ob).forEach((el) => {
        // console.log(this.storage)
        let k = el[0];
        // console.log(k);
        // console.log(this.storage[hashKey][k]);
        delete this.storage[hashKey][k];
        this.totalItems--;
        this.set(el[0], el[1]);
      });
    });
  }
  if (!this.storage[hashCode(key, this.SIZE)]) {
    this.storage[hashCode(key, this.SIZE)] = {};
    this.storage[hashKey][key] = value;
  } else {
    this.storage[hashKey][key] = value;
  }
  this.totalItems += 1;
  return this.totalItems;
};

// let test = new HashTable();
// test.set("a1", 2);
// test.set("a2", 5);
// test.set("a3", 1);
// test.set("a4", 1);
// test.set("a5", 3);
// test.set("a6", 4);
// test.set("a7", 1);
// test.set("a8", 8);
// test.set("a9", 1);
// test.set("a10", 1);
// test.set("a11", 1);
// test.set("a12", 1);
// test.set("a13", 1);
// console.log(test);
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
HashTable.prototype.get = function (key) {
  const index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */

// 2. remove:
// - If the hash table's SIZE is greater than 16 and the result of removing the
//   item drops the number of stored items to be less than 25% of the hash table's SIZE
//   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
// */
HashTable.prototype.remove = function (key) {
  const index = hashCode(key, this.SIZE);
  // this.SIZE will always be a factor of 16 so will always be divisible by 4 without remainder
  const itemLowerLimit = this.SIZE * 0.25;
  if (this.SIZE > 16 && this.totalItems - 1 < itemLowerLimit) {
    this.SIZE = this.SIZE / 2;
    this.storage.forEach((ob) => {
      Object.entries(ob).forEach((el) => {
        delete this.storage[index][el[0]];
        this.totalItems--;
        this.set(el[0], el[1]);
      });
    });
  }
  if (!this.storage[index]) return undefined;
  if (!this.storage[index][key]) return undefined;
  if (this.storage[index][key]) {
    const value = this.storage[index][key];
    delete this.storage[index][key];
    this.totalItems -= 1;
    return value;
  }
};

let test = new HashTable();
test.set("a1", 2);
test.set("a2", 5);
test.set("a3", 1);
test.set("a4", 1);
test.set("a5", 3);
test.set("a6", 4);
test.set("a7", 1);
test.set("a8", 8);
test.set("a9", 1);
test.set("a10", 1);
test.set("a11", 1);
test.set("a12", 1);
test.set("a13", 1);
// test.remove("a13");
// test.remove("a12");
// test.remove("a11");
// test.remove("a10");
// test.remove("a9");
// test.remove("a8");
// test.remove("a7");

console.log(test);

// YOUR CODE ABOVE

function hashCode(string, size) {
  "use strict";

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

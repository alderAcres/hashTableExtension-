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

/**
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
  // to get the index in the hashtable by using hashCode(by passing the provided key and this.size)
  let getIndex = hashCode(key, this.SIZE);
  console.log(getIndex);

  // if there is more than one hashKey in the storage inside the hashtable, then add the key/value to the this.storage
  if (this.storage[getIndex]) {
    this.storage[getIndex][key] = value;
  }
  // if there is no value or key in the this.storage yet, then creating an new object in this.storage, in case a collision for mutiple keys or values in this hashtable index object
  else {
    this.storage[getIndex] = {};
    this.storage[getIndex][key] = value;
  }
};

const newHashTable = new HashTable();
// reassign the newHashTable size to 32 from 16
newHashTable.SIZE = 32;

// console.log((newHashTable.SIZE = 32));
// console.log(newHashTable);
// console.log(newHashTable.set("fifthKey", "firstValue"));
// console.log(newHashTable.set("secondkey", "secondValue"));
// console.log(newHashTable);

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
  // creating a index for the hashtable by using the hashCode
  let getIndex = hashCode(key, this.SIZE);
  // return the value by using the passing key in the storage
  return this.storage[getIndex][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */

// - If the hash table's SIZE is greater than 16 and the result of removing the
// item drops the number of stored items to be less than 25% of the hash table's SIZE
// (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

HashTable.prototype.remove = function(key) {
  // to get the hash table code from hashCode
  let getIndex = hashCode(key, this.SIZE);

  // return the removed ele
  if (this.storage[getIndex][key] === null) {
    return undefined;
  }
  // create a variable to save the passing value that will be deleted later.
  let removedEle = this.storage[getIndex][key];

  // remove this ele from this.storage first
  delete this.storage[getIndex][key];
  return removedEle;
};
console.log((newHashTable.SIZE = 32));
console.log(newHashTable);
newHashTable.SIZE = 16;
console.log(newHashTable);

HashTable.prototype.remove = function(key) {
  // to get the hash table code from hashCode
  let getIndex = hashCode(key, this.SIZE);

  // return the removed ele
  if (this.storage[getIndex][key] === null) {
    return undefined;
  }
  // create a variable to save the passing value that will be deleted later.
  let removedEle = this.storage[getIndex][key];

  // remove this ele from this.storage first
  delete this.storage[getIndex][key];
  return removedEle;
};

console.log(newHashTable.set("fifthKey", "firstValue"));
console.log(newHashTable.set("secondkey", "secondValue"));
console.log(newHashTable);

console.log(newHashTable.remove("secondkey"));

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

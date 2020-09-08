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
HashTable.prototype.set = function (key, value) {
  let idx = hashCode(key, this.SIZE);
  //if this bucket is undefined, initialize it as an object
  if (!this.storage[idx]) this.storage[idx] = {};
  //add the input key-value into the bucket
  this.storage[idx][key] = value;
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
HashTable.prototype.get = function (key) {
  let idx = hashCode(key, this.SIZE);
  return this.storage[idx][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  let idx = hashCode(key, this.SIZE);
  if (this.storage[idx][key]) {
    let value = this.storage[idx][key];
    delete this.storage[idx][key];
    return value;
  } else return undefined;
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

// let myTable = new HashTable();
// myTable.set('apple', 5);
// myTable.set('banana', 4);
// myTable.set('cherry', 2);
// myTable.get('banana')
// myTable.remove('apple')
// for (let i = 0; i < 20; i++) {
//   myTable.set('key'+i, 'value'+i);
// }

// console.log(myTable);

// Do not remove!!
module.exports = HashTable;

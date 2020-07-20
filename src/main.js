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
  // determine index for bucket using hash function
  const index = hashCode(key, this.SIZE);
  // if the bucket is empty, create a new object to store key/value pairs
  if (this.storage[index] === undefined) {
    this.storage[index] = {};
    this.storage[index][key] = value;
    return this.storage;
  } else {
    // if the bucket object has already been created, store key/value pair
    this.storage[index][key] = value;
    return this.storage;
  }
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
  // determine index for bucket using hash function
  const index = hashCode(key, this.SIZE);
  // return value corresponding to key from bucket object at index
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
HashTable.prototype.remove = function (key) {
  // determine index for bucket using hash function
  const index = hashCode(key, this.SIZE);
  // if the key does not exist in the hash table, return undefined
  if (!this.storage[index] || !this.storage[index].hasOwnProperty(key)) {
    return undefined;
  } else {
    // remove key/value pair from hash table
    delete this.storage[index][key];
    return this.storage;
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

/* TESTS
const hashTable = new HashTable();
console.log(hashTable);
hashTable.set('Taylor', 30);
hashTable.set('Robert', 32);
console.log(hashTable);
hashTable.set('David', 62);
hashTable.set('Skye', 27);
console.log(hashTable);
console.log(hashTable.get('Taylor'));
console.log(hashTable.remove('Marlene'));
hashTable.remove('Robert');
console.log(hashTable);
*/

// Do not remove!!
module.exports = HashTable;

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
  // generate index using hashCode
  let hashIndex = hashCode(key, this.SIZE);

  // if an object does not exist at this index, create one
  if (typeof this.storage[hashIndex] !== 'object') this.storage[hashIndex] = {};

  // within the object at this index, assign the original key, value pair
  this.storage[hashIndex][key] = value;
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
  // generate index using hashCode
  let hashIndex = hashCode(key, this.SIZE);

  // access hashTable storage at index hashIndex, return value associated with the key
  return this.storage[hashIndex][key];
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
  // generate index using hashCode
  let hashIndex = hashCode(key, this.SIZE);

  // access hash table storage at the generated index and delete the input key
  delete this.storage[hashIndex][key];

  // if the object at the generated index is now empty, delete the key hashIndex from hash table storage
  if (Object.keys(this.storage[hashIndex]).length == 0)
    delete this.storage[hashIndex];
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

let table = new HashTable();

// Do not remove!!
module.exports = HashTable;

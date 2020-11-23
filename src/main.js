/* eslint-disable max-len */
/* eslint-disable no-throw-literal */
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
  this.keys = this.storage(SIZE);
  this.values = this.storage(SIZE);
  this.limit = 0;
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
  // adds given value to hash table with specified key
  // if provided key has already been used to store another value, you must handle this collision appropriately
  if (this.limit >= this.size) {
    throw "hash table is full";
  }
  let hashedIndex = this.hash(key);

  while (this.keys[hashedIndex] != null) {
    hashedIndex++;
    hashedIndex %= this.SIZE;
  }

  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  limit += 1;
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
  // retrieve value stored in the hash table with specified key
  let hashedIndex = this.hash(key);
  // if more than one value is stored at the key, retrieve the correct one
  // check if value equals the key, if not loop through values using hashedIndex
  while (this.keys[hashedIndex] != key) {
    hashedIndex += 1;
    hashedIndex %= this.SIZE;
  }

  return this.values[hashedIndex];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {};

// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

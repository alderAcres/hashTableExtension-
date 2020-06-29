/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
// current hash size is 16, able of storing an array of 16 hashes
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
  // create variable hash, get its value through hash code
  // if the hash is already in storage, then add the value that corresponds to hash
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) {
    this.storage[hash][key] = value;
    // else, put hash into storage, assign value to key
  } else {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
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
  // pass key into the hashcode to return the hash value
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash][key];
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
  const hash = hashCode(key, this.SIZE); // generate hash lookup first
  // check if key exists
  if (!this.storage[hash][key]) return undefined;
  // save removed item
  const removeItem = this.storage[hash][key];
  // delete item
  delete this.storage[hash][key];
  // return item
  return removedItem;
};

// Do not modify - just bringing this up top
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

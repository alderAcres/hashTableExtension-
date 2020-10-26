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
  // create variable to store hash/index using hashCode function with passed in key and storage size
  let hash = hashCode(key, this.SIZE);

  // check if storage at the hash index is currently undefined
  if (!this.storage[hash]) {
    // if undefined, create a hash "bucket" at that index
    this.storage[hash] = {};

    // store key/value pair within "bucket"
    // overwrites currently stored key if they are the same
    this.storage[hash][key] = value;
  } else {
    // otherwise: store the key value pair within the already existing bucket
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
  // create variable for generating hash/index num using output of hashChode w/ key and array size passed in
  let hash = hashCode(key, this.SIZE);

  // return the value stored at that hash with passed in key
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
  // create variable for generating hash/index using output of hashCode w/ key and array size passed in
  let hash = hashCode(key, this.SIZE);

  // check if a key/value exists at that hash, if undefined return undefined
  if (!this.storage[hash]) return undefined;

  // store the key/value to be deleted? not sure if it needs to be returned from func...
  const removedKey = this.storage[hash][key];

  // otherwise: if key at hash is not undefined, delete the key/value at that hash
  delete this.storage[hash][key];
  // return the removed key value
  return removedKey;
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

// HASH TABLE TESTS:
// create a new hash table
let newHashTable = new HashTable();
console.log(newHashTable);

// test setting key/value pairs
newHashTable.set('name', 'brooke');
newHashTable.set('dog', 'ruby');
// test to see if current key/value overwrites with new key/value
newHashTable.set('name', 'trevor');
console.log(newHashTable);

// test retrieving a value
console.log(newHashTable.get('name'));

// test removing a value
console.log(newHashTable.remove('name'));
console.log(newHashTable);

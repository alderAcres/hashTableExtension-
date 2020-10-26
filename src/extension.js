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

  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  // calculate percentage of undefined buckets (undefined buckets x 100 / storage.length)
  // not totally sure on this yet
  let availableBuckets;

  // check to see if percentage of undefined values inside hash is less than 25%
  // if less than 25%: execute a rehashing function with this.SIZE
  if (availableBuckets < 25) {
    this.rehash(this.SIZE);
  }

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

HashTable.prototype.rehash = function (size) {
  // multiply the size of the table by 2
  // create a new this.storage with new size passed in
  // iterate the storage array
  // for each bucket in array:
  // create a new hash key for current bucket (pass in current key and this.SIZE)
  // use swapping to assign current bucket to a temp variable
  // reassign the temp bucket to the new hash
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

// YOUR CODE ABOVE

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

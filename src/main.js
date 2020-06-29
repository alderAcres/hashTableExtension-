/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.count = 0; // Keep track of how many values actually stored
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
  // To handle collisions, add ``value`` to corresponding *unhashed* ``key``
  // inside an object sitting at bucket ``hashCode(key)`` of our ``this.storage`` Array
  const bucketNum = hashCode(key, this.SIZE);

  // If this bucket is empty, create a new object initialized
  // with given key-value pair, and assign it to the bucket
  if (this.storage[bucketNum] === undefined) {
    this.storage[bucketNum] = { key: value };
  } else {
    // An object already exists at this bucket, so just blindly
    // store the given value at the given key in that object
    // (possibly overwriting an existing value at this bucket's key)
    this.storage[bucketNum][key] = value;
  }

  // Increment and return the number of values stored in our hash table
  this.count += 1;
  return this.count;
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
  const bucketNum = hashCode(key, this.SIZE);
  // 1. If there is more than 1 value stored at bucket, should retrieve
  //    correct value stored at the given key in this bucket's object
  // 2. Should return undefined if lookup key at this bucket does not yet exist
  return this.storage[bucketNum][key];
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
  const bucketNum = hashCode(key, this.SIZE);
  let valueRemoved = undefined;

  // If the key-value pair requested for removal is defined in hash table
  if (this.storage[bucketNum][key] !== undefined) {
    // It's undefined _now_, muahaha
    valueRemoved = this.storage[bucketNum][key];
    delete this.storage[bucketNum][key];
  }
  // Decrement number of values stored in table before exiting function
  this.count -= 1;
  return valueRemoved;
};


// Do not modify
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

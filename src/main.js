/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  // Storage is our HashTable with a length of 16 buckets
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
  // if there is no existing value in our bucket
  if (!this.storage[hashCode(key, this.SIZE)]) {
    // we want to first create an empty object
    this.storage[hashCode(key, this.SIZE)] = {};
    // and store our key value pair within that object
    this.storage[hashCode(key, this.SIZE)][key] = value;
  }
  // we want to add our new key value pair into the same object
  // without having to overwrite our existing key value pair that
  // shares the same hashed address
  this.storage[hashCode(key, this.SIZE)][key] = value;
  // return storage
  return this.storage;
};

const testing = new HashTable;

testing.storage; // ?
testing.set('sophia', 4); // ?
testing.set('hello', 6); // ?
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
  // if our hashed address is empty --> return undefined?
  if (!this.storage[hashCode(key, this.SIZE)]) {
    return undefined;
  }
  // else we want to access the object within our bucket
  // return value associated with out key argument value
  return this.storage[hashCode(key, this.SIZE)][key];
};

testing.storage; // ?
testing.get('sophia'); // ?
testing.get('hello'); // ?

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // if our bucket in our hashtable is empty, return undefined
  if (!this.storage[hashCode(key, this.SIZE)]) {
    return undefined;
  }
  // else we want to access the object within our bucket
  // delete our key value pair
  delete this.storage[hashCode(key, this.SIZE)][key];
  // we want to remove the empty object if no pairs remain in the bucket
  if (this.storage[hashCode(key, this.SIZE)] = {}) {
    delete this.storage[hashCode(key, this.SIZE)];
  }
  // return our storage
  return this.storage;
};

testing.storage; // ?
testing.remove('sophia'); // ?

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

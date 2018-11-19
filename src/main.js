/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {//constructor function for creating an instance of a hash table object
  this.SIZE = 16;//assigns a "SIZE" property to the hash table and initializes it to 16 "buckets"

  this.storage = new Array(this.SIZE);//assigns a storage property to the hash table object which will
                                      //store an instance of an array of data or values to be stored in
                                      //the hash table. the array has its own SIZE property 
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
  for (let keys in this.storage) {
    if (keys == key) {
      this.storage.keys = value //this refers to the hash table instance, storage refers to the hash table's...
                              //...storage key/property, key creates a key in the storage object and...
                              // ...initializes its value to the value to be stored
    }
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
HashTable.prototype.get = function(key) {
  for (let keys in this.storage) {
    if (keys == key) {
      return this.storage.keys
    }
  }
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  for (let keys in this.storage) {
    if (keys == key) {
      delete this.storage.keys
    } else {
      return undefined
    }
  }
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

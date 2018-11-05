/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.items = 0;
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
HashTable.prototype.set = function set(key, value) {
  // if key value pair doesn't exist, create new object and store key value in that object
  const hashKey = hashCode(key, this.SIZE);
  const objStore = this.storage[hashKey];
  if (objStore) {
    // if the object already exist, store key value pair
    objStore[key] = value;
    this.items += 1;
    return this.items;
  } else {
    // if obj doesn't exist, create it and store pair
    this.storage[hashKey] = {};
    this.storage[hashKey][key] = value;
    this.items += 1;
    return this.items;
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
HashTable.prototype.get = function get(key) {
  const hashKey = hashCode(key, this.SIZE);
  const objStore = this.storage[hashKey];
  if (objStore) {
    // if the object already exist, store key value pair
    return objStore[key];
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
HashTable.prototype.remove = function remove(key) {
  const hashKey = hashCode(key, this.SIZE);
  const objStore = this.storage[hashKey];
  // first check if an object exist
  if (objStore) {
    // if the object already exist, check if key exist
    if (objStore[key]) {
      // if key exist, return and delete key
      const value = objStore[key];
      delete objStore[key];
      this.items -= 1;
      return value;
    } else {
      // if key doesn't exist return undefined;
      return undefined;
    }
  }
  // if object doesn't exist return undefined;
  return undefined;
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

// const newHash = new HashTable();
// newHash.set('hello', 2);
// console.log(newHash.items);
// console.log(newHash.storage);
// console.log(newHash.remove('hello'))
// console.log(newHash.items);

// Do not remove!!
module.exports = HashTable;

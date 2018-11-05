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
  let hashKey = hashCode(key, this.SIZE);
  // check if adding new item will push the items above 75%
  if (this.items + 1 > this.size * .75) {
    // if does, double the size, create new hashtable
    this.size *= 2;
    const oldStorage = this.storage; // old Hashtable
    this.storage = new Array(this.size);
    hashKey = hashCode(key, this.SIZE);
    // rehash from oldStorage to new
    // get all the objects from old Storage
    const storageObjects = Object.values(oldStorage); // array of objects
    for (let i = 0; i < storageObjects.length; i += 1) {
      // for each object, get key value pair
      const pastEntries = Object.entries(storageObjects[i]); // nested array of key value pairs
      for (let j = 0; i < pastEntries.length; j += 1) {
        const [key, val] = pastEntries[j];
        this.set(key, val);
      }
    }
  } else {
    const objStore = this.storage[hashKey];
    if (objStore) {
      // if the object already exist, store key value pair
      objStore[key] = value;
      this.items += 1;
      return this.items;
    }
    // if obj doesn't exist, create it and store pair
    this.storage[hashKey] = {};
    this.storage[hashKey][key] = value;
    this.items += 1;
    return this.items;
  }
};

// let a = new Array(4);
// console.log(a.length)
const newHash = new HashTable();
newHash.set('hello', 2);
newHash.set('hi', 2);
newHash.set('he', 2);
newHash.set('ho', 2);
newHash.set('ha', 2);
newHash.set('hb', 2);
newHash.set('hc', 2);
newHash.set('hd', 2);
newHash.set('hf', 2);
newHash.set('hg', 2);
newHash.set('hh', 2);
newHash.set('hj', 2);
newHash.set('hk', 2);
console.log(newHash.storage);
//console.log(newHash.remove('hello'))
console.log(newHash.items);

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

module.exports = HashTable;

// YOUR CODE ABOVE

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

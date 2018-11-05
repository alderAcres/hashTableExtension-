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
HashTable.prototype.set = function(key, value) {
  // if adding new item will increase # of stored items in hash table to over (floor) of size * 0.75
  // then rehash using the rehash function
  if (this.items + 1 > Math.floor(0.75 * this.SIZE)) {

    console.log('here');


    this.storage = rehash(this.storage, this.SIZE * 2);
    this.SIZE *= 2;
  }
  // use hashcode to generate key  
  const hashKey = hashCode(key, this.SIZE);
  // if object at index doesn't exist then we create a new object storing the key : value pair
  if (this.storage[hashKey] === undefined) {
    this.storage[hashKey] = {};
    this.storage[hashKey][key] = value;
    // increment this.items by 1
    this.items += 1;
  } else {
    // only increment number of items in hash table if key value in hash table doesnt already exist
    if (this.storage[hashKey][key] === undefined) this.items += 1;
    // add key : value pair to object at hashKey in this.storage
    this.storage[hashKey][key] = value;
  }
  return this.items;
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
  // if no items in hash table exist, then return null
  if (this.items === 0) {
    return undefined;
  }
  //generate hashKey with hashCode function
  const hashKey = hashCode(key, this.SIZE);
  //access hash table with hashKey and retrieve value associated with key
  const returnValue = this.storage[hashKey][key];
  return returnValue;
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
  if (this.SIZE > 16 && (this.items - 1 < Math.floor(0.25 * this.SIZE))) {
    this.storage = rehash(this.storage, Math.floor(this.SIZE / 2));
    this.SIZE = Math.floor(this.SIZE / 2);
  }
  // generate hashKey with hashCode function
  const hashKey = hashCode(key, this.SIZE);
  // if key exists then return value associated with key, delete key : value pair, and this.items -= 1
  if (this.storage[hashKey][key]) {
    const retVal = this.storage[hashKey][key];
    delete this.storage[hashKey][key];
    this.items -= 1;
    return retVal;
  }
  //return undefined in the case that key does not exist in hash table
  return undefined;
};

// Do not remove!!
module.exports = HashTable;

function rehash(hashTable, size) {
  // create new array to return 
  const newTable = new Array(size);
  //rehash all pre-existing elements in hash table to new hash table of size 
  for (let i = 0; i < hashTable.length; i += 1) {
    let current = hashTable[i];
    // iterate through every key and rehash everything based on new hash table size
    for (let key in current) {
      // new hashcode to generate key  
      const hashKey = hashCode(key, size);
      // if object at index doesn't exist then we create a new object storing the key : value pair
      if (newTable[hashKey] === undefined) {
        newTable[hashKey] = {};
        newTable[hashKey][key] = current[key];
      } else {
        newTable[hashKey][key] = current[key];
      }
    }
  }
  return newTable;
}

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

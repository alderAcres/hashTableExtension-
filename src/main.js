/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
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

  // variable to store number of items in table
  this.itemCount = 0;
}

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
  // get index from key by using hashCode function
  const index = hashCode(key, this.SIZE);

  // check if there is already an object at the index
  if (!this.storage[index]) {
    // if there is not, then create an object
    // add 'key' and 'value' as a key-value pair in that object
    this.storage[index] = {};
    this.storage[index][key] = value;

    // and increment itemCount
    this.itemCount += 1;
  } else if (this.storage[index][key]) {
    // if there is already an object, add the key and value as a new key-value pair
    // check if key has already been used
    // if yes, change update the value but do not change itemCount
    this.storage[index][key] = value;
  } else {
    // else add the new key-value pair and increment itemCount
    this.storage[index][key] = value;
    this.itemCount += 1;
  }

  // return itemCount
  return this.itemCount;
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
  // get index from key by using hashCode function
  const index = hashCode(key, this.SIZE);

  // use the key at the given index to get the value at that location
  // return this
  return this.storage[index][key];
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
  // get index from key by using hashCode function
  const index = hashCode(key, this.SIZE);

  // if there is an item with that key, then delete it and return it
  if (this.storage[index][key]) {
    // save the value as itemToReturn
    const itemToReturn = this.storage[index][key];

    // delete the key-value pair
    delete this.storage[index][key];

    // decrement itemCount
    this.itemCount -= 1;

    // return itemToReturn
    return itemToReturn;
  }

  // if there is no item with the key, return undefined (implicitly)
};

// Do not remove!!
module.exports = HashTable;

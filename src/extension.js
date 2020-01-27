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
  //check if adding this key results in more than 75% of the hash table being filled

  //declare a constant variable for a hashed version of the input key
  const hashedKey = hashCode(key, this.SIZE);
  let cache = [];
  let count = 0;
  //conditional: if index = hashedKey is empty, then create a new object literal with original key/value pair
  if (!this.storage[hashedKey]) {
    this.storage[hashedKey] = {}; 
    this.storage[hashedKey][key] = value;
  }
  //else, store key/value pair at existing object at specified index, 
  //or if key already exists, replace existing key value pair with new value of that key
  else this.storage[hashedKey][key] = value;
  //return the new number of items stored in the hash table
  //make sure all keys are counted within each index, not just the number of elements in the hash table 
  for (value of this.storage) {
    if (typeof value === 'object') {
    cache = Object.keys(value);
    count += cache.length;
    }
  }
  return count;
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
    //declare a constant variable for a hashed version of the input key
    const hashedKey = hashCode(key, this.SIZE);
    //return the value of the input key in the object stored at the index = hashedKey
    return this.storage[hashedKey][key];
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
    //declare a constant variable for a hashed version of the input key
    const hashedKey = hashCode(key, this.SIZE);
    //declare constant variable for value of input key stored at index hashedKey
    const hashedValue = this.storage[hashedKey][key];
    //If the key does not exist in the hash table, return undefined
    if (!hashedValue) return undefined;
    //else, if the key exists in the object literal at hashedKey index, remove key/value pair
    else delete this.storage[hashedKey][key];
    //return the value deleted from the hash table
    return hashedValue;
  };




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

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
  this.storage.fill({})
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
  // run key through hashfunction, get hash address
  let index = hashCode(key, this.SIZE)
  // This line covers multiple conditions:
  // If there is no key within object of hash's index
  // If there is a key already there, it will overwrite the value
  // If there is already a key/value pair in object at hashtable's index, it will create new key/value pai
  this.storage[index][key] = value
  // Return number of items stored in hash table
  // Iterate through hash table
  return this.storage.reduce((acc, cV) => {
    // Put keys of object into array, get length of array. Reassign acc to acc + length of object keys array.
    acc += Object.keys(cV).length
    // Return accumulator
    return acc
  })
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
  // run key through hashfunction, get hash address
  let index = hashCode(key, this.SIZE)
  // Return value of key/value pair in object at hash table's index
  return this.storage[index][key]
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
  // run key through hashfunction, get hash address
  let index = hashCode(key, this.SIZE)
  // If key not in hashtable, return undefined
  if (!this.storage[index].hasOwnProperty(key)) return undefined
  // Initialize variable to value of object at index in hash table
  let result = this.storage[index][key]
  // Delete key value pair 
  delete this.storage[index][key]
  // return value
  return result
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

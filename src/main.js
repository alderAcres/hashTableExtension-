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
  let index = hashCode(key, this.SIZE);
  // stash values in objects for O(1) retrieval and search
  // I know that linked lists and arrays are typically used to handle collisions, but is there any reason not to use an object?
  let obj = { [key]: value };
  if (this.storage[index] !== undefined) {
      this.storage[index][key] = value;
  } else {
    this.storage[index] = obj;
  }
  return 1;
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
  let index = hashCode(key, this.SIZE);
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
  let index = hashCode(key, this.SIZE);
  let returnValue = undefined;
  // check that key exists
  if (this.storage[index] !== undefined) {
    // if more than one value at index, just delete desired key-value pair - not entire object
    let indexLength = Object.keys(this.storage[index]).length;
    returnValue = this.storage[index][key];
    if (indexLength > 1) {
      delete this.storage[index][key];
    }
    else {
      delete this.storage[index];
    }
  } 
  return returnValue;
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

const hash = new HashTable();
hash.set('five', 'six');
hash.set('five', 'seven');
hash.set('six', 'twentyeleven');
hash.set('eithg', 'seventeenes');
hash.get('five');
hash.remove('six');
hash.remove('three');
console.log(hash.storage);


// Do not remove!!
module.exports = HashTable;

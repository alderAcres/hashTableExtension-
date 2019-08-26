/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
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
  const index = hashCode(key, this.SIZE);
  let sameKey = false;
  if(this.storage[index]) { // check if storage at the index has object
    for(let thisKey in this.storage[index]) { // check if the input key exists in the object
      if(thisKey === key) { // if input key exists, then set flag to true for later usage
        sameKey = true;
      }
    }
    // *update or *create key and value pair
    this.storage[index][key] = value;
  } else {
    // create new object with key and value pair,
    // and assign it to storage at the hashcode index
    this.storage[index] = {[key]: value};
  }
  if(!sameKey) this.length++; // if input key is new to the storage, then increment the counter
  return this.counter;
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
  const index = hashCode(key, this.SIZE);
  // if storage at the index has object stored, then return the value matching the key from the object;
  // otherwise, return undefined (this.storage[index])
  return this.storage[index] ? this.storage[index][key] : this.storage[index];
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
  const index = hashCode(key, this.SIZE);
  let value = undefined;
  if(this.storage[index]) { // check if storage at the index has object
    if(this.storage[index].hasOwnProperty(key)) { // check if object has matching key and value pair
      // copy *primitive type* the value stored at the object with key matching
      value = this.storage[index][key];
      delete this.storage[index][key]; // remove the key and value pair from the object
      this.length--; // decrement the counter by 1
    }
  }
  return value;
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

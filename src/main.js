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
  this.values = new Array();
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
  //find index
  const indexOfKey = this.hashCode(key, this.size);

  //check if key has already been used
  for (var i = 0; i < this.storage.length; i++) {
    if (this.storage[i] === key) {
      this.values[i] = value
    }
  }
  const index = 0;
  if (this.storage[indexOfKey] === undefined) {
    this.storage[indexOfKey] = key;
    this.values[indexOfKey] = value;
  } else {
    while (this.storage[indexOfKey] !== undefined ) {
      index++;
    }
    this.storage[indexOfKey] = key;
    this.values[indexOfKey] = value;
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
  const hashedIndex = this.hashCode(key, this.size);

  //starting at the hashed index provided by the hash function
    //loop over all indexes of storage until that storage value is not undefined
      //this will help check for collisions as a collision that occured put the next collided element in the next available storage spot
  for (var i = hashedIndex; this.storage[i] !== undefined; i++) {
    if (this.storage[i] === key) {
      return this.values[i];
    }
  }
  return undefined;
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
  for (var i = 0; i < this.storage.length; i++) {
    if (this.storage[i] === key) {
      //splice that key and this.values i as well
    }
  }
  return !this.storage[this.hash(key, this.size)] ? undefined : delete this.storage[this.hash(key, this.size)]
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

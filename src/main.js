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
  const index = hashCode(key, this.SIZE);
  // if key not already stored, set key/value pair at index
  if(!this.storage[index]) {
    this.storage[index] = [[key, value]];
  } 
  // if key already stored...
  else {
    let stored = false;
    // iterate through key/value pairs at index
    for(let i = 0; i < this.storage[index].length; i++) {
      // overwrite current key w/ new value
      if (this.storage[index][i][0] === key){
        this.storage[index][i][1] = value;
        stored = true;
      } 
    } 
    // if hash address contains another key/value pair, add new key/value pair to it
    if (stored === false) {
      this.storage[index].push([[key, value]]);
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
  // loop through hash table
  for (let i = 0; i < this.storage.length; i++) {
    // if input key exists, save the first stored key/value pair's value 
    for (let i = 0; i < this.storage[i].length; i++) {
      if (this.storage[i][0] === key) {
        return this.storage[i][1]; 
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
  if (!key) return undefined;
  const deleted = this.storage[key];
  delete this.storage[key];
  return deleted;
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




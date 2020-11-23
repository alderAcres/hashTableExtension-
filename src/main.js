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
  //create index by hashing key
  let index = this.hashCode(key);
  //check if there is anything sored at the index, if not then create an array at that index
  if(!this.storage[index]) {
    this.storage[index] = [];
  }
  //push array with key value pair into array at that index..this should handle collisions
  this.storage[index].push([key, value]);

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
  //hash passed in key to create index
  let index = this.hashCode(key);
  //check to see if anything exists at that index
  if(this.storage[index]) {
    //iterate over the array at that index to find particular matching key/value pair in sub-arrays
    for(let i = 0; i < this.storage[index].length; i++) {
      //check if the 0th index on the ith subarray matches the passed in key
      if(this.storage[index][i][0] === key) {
        // if there is a match return the key/value pair.
        return this.storage[index][i];
      }
    }
  }
  //if we don't find anything at that index, return undefined
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
  //hash passed in key to get index
  let index = this.hashCode(key);
  //check to see if anything exists at that particular index
  if(this.storage[index]) {
    //iterate over the array at that index to find particular matching key/value pair in sub-arrays
    for(let i = 0; i < this.storage[index].length; i++) {
      //check if the 0th index on the ith subarray matches the passed in key
      if(this.storage[index][i][0] === key) {
        // if there is a match return the key/value pair, delete that pair
        delete this.storage[index][i];
      }
    }
  }
  //return undefined if key is not found in hash table
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

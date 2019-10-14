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
  let hash = hashCode(key, this.SIZE)
    if(Array.isArray(this.storage[hash])){
      this.storage[hash].push([key, value])
    } else {
      this.storage[hash] = [[key, value]];
    }
    let returnValue = 0
    for(let i = 0; i < this.length; i++){
      if(this.storage[hash][i] !== undefined){
        returnValue = returnValue + 1
      }
    }
    return returnValue
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
  let hash = hashCode(key, this.SIZE)
  let returnValue
  this.storage[hash].forEach((keyValuePair) => {
    if(keyValuePair[0] === key){
      returnValue = keyValuePair[1];
    }
  })
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
  let hash = hashCode(key, this.SIZE)
  let returnValue
  let index
  for(let i = 0; i < this.storage[hash].length; i++){
    if(this.storage[hash][i][0] === key){
      returnValue = this.storage[hash][i][1];
      index = i
    }
  }
  if(index !== undefined){
    this.storage[hash].splice(index, 1)
    return returnValue
  } else if(index == undefined) {
    return undefined
  }
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



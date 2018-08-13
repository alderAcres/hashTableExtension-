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
  const index = hashCode(key, key.length)

  if (this.storage[index] === undefined) {
    const indexArr = []
    this.storage[index] = indexArr
  } 
  
  if (this.storage[index].indexOf(key) === -1) {this.storage[index].push(key, value)}
  else {
    const existingIdx = this.storage[index].indexOf(key)
    this.storage[index][existingIdx + 1] = value
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
  const index = hashCode(key, key.length)
  if (this.storage[index] === undefined) {
    return undefined 
  } else {
    const indexOfVal = this.storage[index].indexOf(key) + 1
    return this.storage[index][indexOfVal]
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
  const index = hashCode(key, key.length)

  if (this.storage[index] === undefined) {
    return undefined 
  } else {
    const indexOfVal = this.storage[index].indexOf(key) + 1
    const val = this.storage[index][indexOfVal].slice(0)
    const keyInd = this.storage[index].indexOf(key)
    const valInd = keyInd + 1
    delete this.storage[index][keyInd]
    delete this.storage[index][keyInd]
    return val 
  }

};


let test = new HashTable()
test.set("test key", "test val")
// test.get("test key")
test.remove("test key")
test.get("test key")


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

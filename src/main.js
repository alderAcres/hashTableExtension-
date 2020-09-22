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
  let hashedKey = hashCode(key, this.SIZE)
  let index = 0;
  if (this.storage[hashedKey] === undefined) {
    this.storage[hashedKey] = [];
    this.storage[hashedKey][0] = key;
    this.storage[hashedKey][1] = value;
  }
  else {
    // push value into empty index at this.storage[hashedKey] array
    this.storage[hashedKey].push(key);
    this.storage[hashedKey].push(value);
  }
  return this.storage;
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
  // use hash function to determine which index to search for
  let hashedKey = hashCode (key, this.SIZE)
  // check if theres more than one value stored at that location in memory
  if (this.storage[hashedKey].length < 2) {
    return this.storage[hashedKey][1];
  }
  else {
    // if there is, loop through the nested array to find the value
    for (let i = 0; i < this.storage[hashedKey].length; i++) {
      if (this.storage[hashedKey][i] === key) {
        return this.storage[hashedKey][i+1];
      }
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
  // check if this.storage[hashedKey] is undefined and if it is, return undefined
  // else loop through the nested array to search for the key and delete it
  let hashedKey  = hashCode (key, this.SIZE)
  let currentArr = this.storage[hashedKey]
  if (currentArr === undefined) {
    return undefined;
  }
  else {
    for (let i = 0; i < currentArr.length; i++) {
      if (currentArr[i] === key) {
        delete currentArr[i]
        delete currentArr[i+1]
        return this.storage;
      }
    }
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
let hashTable = new HashTable()
console.log(hashTable.set(10,'firstVal'))
// console.log(hashTable.set(10,'firstVal'))
console.log(hashTable.set(15,'secondVal'))
console.log(hashTable.get(10))
console.log(hashTable.get(15))
console.log(hashTable.remove(10))
console.log(hashTable.remove(15))
// console.log(hashTable.remove(17))
// Do not remove!!
module.exports = HashTable;

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
  const location = hashCode(key, this.SIZE);
  const hashTable = this.storage;
  if(hashTable[location] === undefined) {
    hashTable[location] = {};
    hashTable[location][key] = value;
  } else {
    hashTable[location][key] = value;
  }
  function countItems() {
    let count = 0;
    hashTable.forEach(function(el) {
      if(el !== undefined){
        count += Object.keys(el).length
      }
    });
    return count;
  }
  return countItems();
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
  const location = hashCode(key, this.SIZE);
  const hashTable = this.storage;
  return hashTable[location][key];
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
  const location = hashCode(key, this.SIZE);
  const hashTable = this.storage;
  if(hashTable[location] === undefined) {
    return undefined;
  } else if(!hashTable[location].hasOwnProperty(key)) {
    return undefined;
  } else {
    returnValue = hashTable[location][key];
    delete hashTable[location][key]
  }
  return returnValue;
};
// const hashtab = new HashTable()
// console.log(hashtab.set("hello", 3))
// console.log(hashtab.set("world", 2))
// console.log(hashtab.set("codesmith", 2))

// console.log(hashtab.get("hello"))
// console.log(hashtab.remove("hello"))
// console.log(hashtab);
// console.log(hashCode("hello", 16))
// console.log(hashCode("world", 16))
// console.log(hashCode("codesmith", 16))


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

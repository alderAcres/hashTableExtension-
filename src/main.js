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
  const hashedKey = hashCode(key, this.SIZE);
  if (this.storage[hashedKey]) {
    // collision. we will use an object for sake of ease
    const cellStorage = {};
    let arrayedCellStorage = Object.keys(this.storage[hashedKey]);
    for (let i = 0; i < arrayedCellStorage.length; i ++) {
      let cellKey = arrayedCellStorage[i];
      let cellVal = this.storage[hashedKey][cellKey];
      cellStorage[cellKey] = cellVal;
    }
     cellStorage[key] = value;
     this.storage[hashedKey] = cellStorage;
  }
  else {
    // no collision
    const cellStorage = {};
    cellStorage[key] = value;
    this.storage[hashedKey] = cellStorage;
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
  const hashedKey = hashCode(key, this.SIZE);
  const cellStorage = this.storage[hashedKey];
  //given our previous implementation cellStorage should be an object
  let arrayedCellStorage = Object.keys(this.storage[hashedKey]);
  console.log(arrayedCellStorage)
  for (let i = 0; i < arrayedCellStorage.length; i++) {
    let cellKey = arrayedCellStorage[i];
    if (String(key) === cellKey) {
      return this.storage[hashedKey][cellKey];
    }
  }
  // if we get to this point, the key is not in storage;
  return null;
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
  
  if (!this.get(key)) return undefined;
  // if we hit this point, we know the hashtable contains our key
  const hashedKey = hashCode(key, this.SIZE);
  let arrayedCellStorage = Object.keys(this.storage[hashedKey]);
  const cellStorage = {};
  for (let i = 0; i < arrayedCellStorage.length; i ++) {
    let cellKey = arrayedCellStorage[i];
    let cellVal = this.storage[hashedKey][cellKey];
    if (cellKey === String(key)) continue;
    cellStorage[cellKey] = cellVal;
  }
  this.storage[hashedKey] = cellStorage;
  return true; // just returning something that is not undefined to confirm removal
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



let hash = new HashTable;
console.log(hash.set(3,2))
console.log(hash.set("key 1",3))
console.log(hash.get("key 1"))
console.log(hash.get(3))
console.log(hash.remove("key 1"))
console.log(hash)

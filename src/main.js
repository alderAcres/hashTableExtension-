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
let bin = hashCode(key, this.SIZE)
//if bin has null value, add an empty object to the bin and then add key:value to it
if (!this.storage[bin]) {
  this.storage[bin] = {}
  this.storage[bin][key] = value
} else {
  this.storage[bin][key] = value
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
let bin = hashCode(key, this.SIZE)
if (this.storage[bin][key]) {
  return this.storage[bin][key]
} 
return undefined
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
  //get hashcode
  let bin = hashCode(key, this.SIZE)
  //check if value at bin of storage is undefined
  if (!this.storage[bin][key]) {
    return undefined
  }
  // otherwise, delete the value at the key in bin of storage
  delete this.storage[bin][key]
 
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

//test hash table
const table = new HashTable()
table.set('a', 1)
table.set('b', 2)
table.set('c', 3)
console.log(`expect "${table.get('a')}" to equal "1"`)
console.log(`expect "${table.get('b')}" to equal "2"`)
console.log(`expect "${table.get('c')}" to equal "3"`)
table.remove('a')
console.log(`expect: "${table.get('a')}" to equal "undefined"`)

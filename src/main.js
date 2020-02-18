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
  // invoke the helper function on the value and store that into the variable
  let hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) this.storage[hash][key] = value;
  else { 
    this.storage[hash] = {};
    this.storage[hash][key] = value
  }
  // console.log(this.storage)
};

const callFnc = new HashTable()
callFnc.set('hello', 25)
callFnc.set('apple', 100)
callFnc.set('apple', 2)
callFnc.set('coffee', 100)
callFnc.set('tea', 100)
callFnc.set('glasses', 100)
console.log(callFnc)

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
  // invoke the helper function to get which index the value is
  let hash = hashCode(key, this.SIZE);
  return this.storage[hash][key];
};

console.log(callFnc.get('apple'))
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // invoke the helper to get the index where the element 
  let hash = hashCode(key, this.SIZE);
  // check if the key exists, if so return undefined
  if (!this.storage[hash][key]) return undefined;
  else{
    delete this.storage[hash][key];
  }

};
console.log(callFnc)
callFnc.remove('apple')
console.log(callFnc)
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

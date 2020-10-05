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

let hashData = new HashTable();
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
// An empty object is necessary at the location of each index
// this.storage is the object we already have on line 11 
// This object has a flexible size, defualt set to 16
// Create an index variable, 
// Initialize it to calling the hashCode function on (key, this.SIZE)
// Case 1: if no object exists, create an empty object
// Case 2: if the object already exists, add another key-value pair

  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) this.storage[index] = {};
  this.storage[index][key] = value;
};

hashData.set('a', 1);
hashData.set('b', 2);
hashData.set('c', 3);
hashData.set('d', 4);

console.log(hashData);
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
// Return the value at the specified key (input)
// To do that, run the hashCode function with 2 parameters (string = key, this.SIZE)
return this.storage[hashCode(key, this.SIZE)][key];
};
console.log(hashData.get('a')); // 1
console.log(hashData.get('b')); // 2
console.log(hashData.get('c')); // 3
console.log(hashData.get('d')); // 4
console.log(hashData.get('e')); // property does not exist
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
// Remove function needs to store the key-value pair in a variable (result)
// Delete that key-value pair from our object (this.storage)
// Return the key-value pair (result)
  const result = this.storage[hashCode(key, this.SIZE)][key];
  delete this.storage[hashCode(key, this.SIZE)][key];
  return result;
};

console.log(hashData);
console.log(hashData.remove('b'));
console.log(hashData);
hashData.remove('d');
console.log(hashData);

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

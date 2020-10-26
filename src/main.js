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
  // Get the index of the HashTable that the key will go into from the hashCode function.
  const hashIndex = hashCode(key, this.SIZE);
  // If the index hashIndex in this.storage is undefined, create a new object in the location.
  if (!this.storage[hashIndex]) {
    this.storage[hashIndex] = {};
  } 
  // Store the key value pairs within the object in hashIndex location in this.storage
  // If key already exists, it will overwrite. If not, it will add a new key value pair.
  this.storage[hashIndex][key] = value;
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
  // Get the index of the HashTable that the key would have been stored into in this.storage
  const hashIndex = hashCode(key, this.SIZE);
  // Look into the hashIndex location. If the key does not exist, return undefined
  if (!this.storage[hashIndex]) {
    return undefined;
  }
  // Else, return the value of the correct key within the object at hashIndex
  return this.storage[hashIndex][key];
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
  // Get the index of the HashTable that the key would have been stored into in this.storage
  const hashIndex = hashCode(key, this.SIZE);
  // Look into the hashIndex location. If the key does not exist, return undefined
  if (!this.storage[hashIndex][key]) {
    return undefined;
  }
  // Else, find the value of the correctt key within the object at hashIndex
  const value = this.storage[hashIndex][key];
  // Delete the key value pair from this.storage
  delete this.storage[hashIndex][key];
  // Return the value found earlier
  return value;
};

// // T E S T I N G!!!

// // Create an array hashTab with __proto__ bond to prototype methods
// const hashTab = new HashTable;
// // Add key value pairs 'one':'a' and 'two':'b' to array
// hashTab.set('one', 'a');
// hashTab.set('two', 'b');
// console.log(hashTab.storage); // [ , , , , , , , , , , , , , , , , NaN: { one: 'a', two: 'b' } ] 
// // Overwrite value of key 'one' with 'c'
// hashTab.set('one', 'c');
// console.log(hashTab.storage); // [ , , , , , , , , , , , , , , , , NaN: { one: 'c', two: 'b' } ]
// // "get" the value of key 'two'
// console.log(hashTab.get('two')); // b
// // "get" the value of a key that doesn't exist
// console.log(hashTab.get('three')); // undefined
// // "remove" the key value pair 'one' and return the value of key 'one'
// console.log(hashTab.remove('one')); // c
// console.log(hashTab.storage); // [ , , , , , , , , , , , , , , , , NaN: { two: 'b' } ]

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

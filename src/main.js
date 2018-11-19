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
  // Convert key to hash key
  let hashKey = hashCode(key, this.SIZE);
  // if (!hashTable[hashKey]):
  if (!this.storage[hashKey]) {
    // Create an object with the original key and value
    let newObj = {};
    newObj[key] = value;
    // Insert created object into hash table at the generated hash key
    this.storage[hashKey] = newObj;
  }
  // else
    // Add to existing object with the string key and value
  else {
    this.storage[hashKey][key] = value;
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
  // Generate hashKey using hashcode function
  let hashKey = hashCode(key, this.SIZE);
  // If this.storage[hashKey], return this.storage[hashKey][key]
  return this.storage[hashKey][key];
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
  // Generate hashKey using hashCode function
  let hashKey = hashCode(key, this.SIZE);
  let deletedValue = this.storage[hashKey][key];
  // Delete property at this.storage[hashKey][key];
  delete this.storage[hashKey][key];
  return deletedValue;
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

// TEST CASES:
// let hashtable = new HashTable();
// console.log(hashtable);
// hashtable.set("hi", 16);
// console.log(hashtable);
// hashtable.set("hello", 20);
// console.log(hashtable);
// hashtable.set("helor", 50);
// // console.log(hashtable.remove("bye"))
// // console.log(hashtable.remove("hi"));
// // console.log(hashtable.remove("hello"));
// console.log(hashtable);
// console.log(hashCode("hello", 16))
// console.log(hashCode("helor", 16))
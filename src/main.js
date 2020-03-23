/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.spacesTaken = 0;
  this.storage = new Array(this.SIZE);
}

// create a new hashtable
let hashTable = new HashTable();

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
  // generate a key to store in hashtable
  // check if key is occupied to check for collisions
    // if key exists, add new object in key value
    // if key does not exist, add new key value pair
  // increment space taken once new object is set
  // return current number of spaces occupied in array
  let index = hashCode(key, this.SIZE);

  if (this.storage[index] === undefined){
    this.storage[index] = {};
    this.storage[index][key] = value;
    this.spacesTaken += 1;
  } else if (this.storage[index]){
    this.storage[index][key] = value;
    this.spacesTaken += 1;
  }

  return this.spacesTaken;
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
  // generate index for key 
  // iterate through storage and search for key
  // return object found inside index that matches key
  let index = hashCode(key, this.SIZE);

  for (let i = 0; i < this.storage.length; i++){
    if (this.storage[index][key]){
      return this.storage[index][key];
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
// generate index for key
// iterate through hashtable until index
// delete object found at index with matching key
// return deleted object
  let index = hashCode(key, this.SIZE);
  
  for (let i = 0; i < this.storage.length; i++){
    if (!this.storage[index]){
      return undefined;
    }

    if (this.storage[index][key]){
      deleted = this.storage[index][key];
      delete this.storage[index][key];
      return deleted;
    }

  }

  return undefined;
};

// my self tests
let hash = new HashTable();
console.log(hash.set('John', '10'));
console.log(hash.get('John'));
console.log(hash.remove('Jack'));
console.log(hash.remove('John'));

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

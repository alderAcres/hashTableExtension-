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
  // the location of the hash table is the output of the function passed in with the key and size of the hash table
  let location = hashCode(key, this.SIZE);
  // if the location is empty/undefined, create an obj inside the location and pass in the key, val pair; this will avoid collisons with similar values
  if (!this.storage[location]) {
    this.storage[location] = {};
    this.storage[location][key] = value;
  } else {
    // if something does exist in this obj, include the key, val pairs that were passed in the argument
    this.storage[location][key] = value;
  }
};
let hash = new HashTable();
console.log(hash.set('Edwin','awesome')); 
console.log(hash.set('dann','awesome')); 
console.log(hash);

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
  // search for the location of the key 
  let location = hashCode(key, this.SIZE);
  // access the key from the given location and return its value
  return this.storage[location][key];

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
  // search for the location of the key
  let location = hashCode(key, this.SIZE);
  // will keep track if a key exists
  let count = 0;
 // iterate through obj and check to see if the key passed in exists
  for (let prop in this.storage[location]) {
    if (key === prop) {
      // if the count remains 0, then the key does not exist in the hash table
      count++;
    }
  }
   // if key does not exist in the storage obj return undefined
  if (!count) return;
  let remvoedItem = this.storage[location][key];
  delete this.storage[location][key];
  return remvoedItem;
};

console.log(hash.remove('Edwin'));
console.log(hash.remove('george'));
console.log(hash);

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

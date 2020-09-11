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
  // pass our key argument (along with the size of the hash table)
  // into the hash function and save the return value to a variable
  const index = hashCode(key, this.SIZE);
  // if there isn't already a key/value pair stored at the bucket associated with the index...
  if (!this.storage[index]) {
    // create an object for the bucket
    this.storage[index] = {};
  }
  // add the key/value pair to the bucket (or overwrite an existing key's value)
  this.storage[index][key] = value;
  return Object.entries(this.storage).length;
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
  const index = hashCode(key, this.SIZE);
  // return the value from the appropriate key in the index's bucket
  return this.storage[index][key];
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
  const index = hashCode(key, this.SIZE);
  const deletedVal = this.storage[index][key];
  delete this.storage[index][key];
  return deletedVal;
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

// Let's test!
const newHash = new HashTable();
console.log(newHash.set("cool", "beans"));
console.log(newHash.storage);
console.log(newHash.set("wow", "mom"));
console.log(newHash.storage);
console.log(newHash.set("clam", "gross"));
console.log(newHash.storage);
console.log(newHash.get("clam"));
console.log(newHash.get("wow"));
console.log(newHash.get("cool"));
console.log(newHash.storage);
console.log(newHash.remove("cool"));
console.log(newHash.remove("cool"));
console.log(newHash.get("cool"));

// Do not remove!!
module.exports = HashTable;

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
  //create bucket, assign it to hashCode(string, this.size)
  const bucket = hashCode(key, this.SIZE);
  //create an object with passed in key and value pair
  const pair = {};
  pair[key] = value;
  //check if bucket is empty
  if (this.storage[bucket] === undefined) {
    //if yes, assign storage to the pair passed in
    this.storage[bucket] = pair;
  } else {
    //else, create the bucket in storage, then add in the key/value pair
    this.storage[bucket][key] = value;
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
  //use the hashCode function to find which bucket the key is in
  const bucket = hashCode(key, this.SIZE);
  //return the value from the key from inside the bucket
  return this.storage[bucket][key];
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
  //use hashCode function to locate the bucket
  const bucket = hashCode(key, this.SIZE);
  //check if undefined-if so, return undefined
  if (!(this.storage[bucket])) return undefined;
  //else, save the key/value pair
  else {
    const removed = this.storage[bucket][key];
    //delete from bucket
     delete this.storage[bucket][key];
     //return removed key/value pair
     return removed;
  }
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

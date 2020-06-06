/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16; // number of hash buckets 
  this.items = 0
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
  // adds value to hash table at key 
  // hash a key --> returns index where key is in hash table 
  const hashKey = hashCode(key, this.SIZE)
  console.log(hashKey)
  // if key has already been use to store another value write over existing value w/ input value 
  if (!this.storage[hashKey]) this.storage[hashKey] = {} 
  // if hash address already contains another key/value pair - handle collisions  
  else this.storage[hashKey][key] = value 
  
  return ++this.items
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
  // retrieves a value in hash from input key
  let hashKey = hashCode(key, this.SIZE)
  // if more than 1 key, return correct value 
  for (let nestKeys in this.storage[hashKey]) {
    if (nestKeys === key) return this.storage[hashKey][nestKeys]
  }
  return "there is no key present in storage"
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
    const hashKey = hashCode(key, this.SIZE)
    const hashRemove = this.storage[hashkey]
    items--
    delete hashRemove
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

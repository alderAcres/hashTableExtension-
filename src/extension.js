/*
  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything
  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

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

HashTable.prototype.reHash = function(upOrDown){
  if (upOrDown === 'up'){
    this.SIZE = this.SIZE * 2;
  }
  else if(upOrDown === 'down'){
    this.SIZE = this.SIZE / 2;
  }

  this.storage.forEach( curr => {
    while(Object.keys(curr).length != 0){
      [key, value] = Object.entries(curr)
      this.remove(key)
      this.set(key, value)
    }
}

HashTable.prototype.set = function(key, value) {
  // Create a new object to put into the hashPosition -- This could probably be in an if statement to avoid making the new object everytimie
  let hashObj = {};
  // Add the key value pair to the object
  hashObj[key] = value;
  // If there is already an object at the hashPosition add the key value pair
  // Otherwise add the object
  this.storage[hashCode(key, this.SIZE)] ? this.storage[hashCode(key, this.SIZE)][key] = value : this.storage[hashCode(key, this.SIZE)] = hashObj
  // Return the number of items currently in the hashObject
  if(this.length > this.SIZE * 1.75){
    this.reHash('up');
  }
  return Object.keys(this.storage[hashCode(key, this.SIZE)]).length
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
  // returns the value access by the key at the hashPosition
  return this.storage[hashCode(key, this.SIZE)][key]
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
  // Grab the value you want to delete -- could have used get method
  const removeValue = this.storage[hashCode(key, this.SIZE)][key];
  // Delete the key value pair in the hashObject at the hashPosition
  delete this.storage[hashCode(key, this.SIZE)][key];
  // If the object that held the deleted key-value pair is empty
    // Remove the object that was holding it
  if(Object.keys(this.storage[hashCode(key, this.SIZE)]).length === 0){
    delete this.storage[hashCode(key, this.SIZE)]
  }
  if(this.length > this.SIZE * 1.75 && this.storage.legth > 16){
    this.reHash('down');
  }
  // Return the value that we removed
  return removeKey
};

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

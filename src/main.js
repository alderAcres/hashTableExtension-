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
  // create a variable to hold the key value 

  // first check if the key already exist in the storage 
  let obj = {};
  // If object is undefined
  if (this.storage[hashCode(key, this.SIZE)] === undefined) {
    //
    this.storage[hashCode(key, this.SIZE)] = obj;
    obj[key] = value;
  } else {
  // If object already exists, add additional key value pair
  this.storage[hashCode(key, this.SIZE)][key] = value
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
  // check if there is more than one value stored at the keys address 
  // figure out a way to check the length of the obj possibly use lenght property???
  // if there isnt return the single value 
  // if there is use the specific hash code associated with the value to return the val
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
  // create a variable and set it = to the value we want to delete 
  if (deleted){
    let deleted = this.storage[hashCode(key, this.SIZE)];
    this.storage[deleted].delete(key);
    return deleted;
  }
  // use the delete key word to delete the key
  // return deleted key 
  return undefined;
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

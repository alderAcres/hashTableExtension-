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
//objective is to add the passed in value to the hash table by assigning it to the specifiied key
//check if the key already holds a value, if yes, overwrite the existing value with the new value
//check if hashed address is already holding a key/value pair; if yes, how to avoid collision? 
//approach: 
  //create var to hold value of key
  //check if value for this key exists; if not, set values to empty obj; 
  //if yes, increment values and set value to key
  
  if(!this.storage[key]) {
    let hash = {}; 
    hash[key] = value;
    this.storage[hash] = hash;  
  } else {
    this.SIZE++; 
    this.storage[hash][key] = value; 
    
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
  //input: key
  //output: expected return is the value associated with the passed in key
  //approach: need to check if more than one value is stored at key's address
  //if multiple values at key, how to figure out which is the correct value??? 
  //this.SIZE-- 
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

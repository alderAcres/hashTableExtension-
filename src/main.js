/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  //added below number prop for first problem (set) wherein we have to return number of items stored in table
  this.number = 0;
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
  //find hash address / index using hashcode func
  const index = hashCode(key, this.SIZE)
  //if index stores a pair already, given by the number of items stored in hash table being bigger than 0, set the additional new key/value pair
  //on second thought i don't think the below code works because number being bigger than 0 just means that new items were stored in the hash table in general, not at specific index lol
    // if (this.number > 0) {
    //   this.storage[index] = {[key]: value};
    // }
  //if index at storage has same key, overwrite existing value w new value
  if (this.storage[index].hasOwnProperty(key)) {
    this.storage[index][key] = value;
  } else {
    //so instead just set new key / value pair at the index
    this.storage[index] = {[key]: value};
  }
  //increment number and return number
  this.number++;
  return this.number;
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
  //find hash address / index using hashcode func
  const index = hashCode(key, this.SIZE);
  //if at index's key is stored multiple values, retrieve value stored with provided key
  //else, return value at key at index
  // else {
    return this.storage[index][key];
  // }
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
  //find hash address / index using hashcode func
  const index = hashCode(key, this.SIZE);
  //if key does not exist at index, return undefined
  if (!this.storage[index].hasOwnProperty(key)) {
    return undefined;
  }
  //store key/value pair at index in variable, then delete
  const result = this.storage[index];
  delete this.storage[index];
  //decrement number
  this.number--;
  //return variable
  return result;
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

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.occupied = 0;
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
  // get the location in storage by hashing the input key
  const location = hashCode(key,this.SIZE);
  let previouslyOccupied = this.occupied;
  // access that location and assign it the value passed in
  if (this.storage[location]) {
    this.storage[location][key] = value;
  }
  else {
    this.storage[location] = {};
    this.storage[location][key] = value;
    this.occupied ++;
  }
  return this.occupied - previouslyOccupied;
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
  // hash the key and get the location
  const location = hashCode(key,this.SIZE);
  
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
  const location = hashCode(key,this.SIZE);
  const deletedValue = this.get(key);
  delete this.storage[location][key];
  return deletedValue;
};

let jolene = new HashTable();
jolene.set('Jolene','Please don\'t take my man.');
console.log(jolene.remove('Jolene'));
console.log(jolene.storage);

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

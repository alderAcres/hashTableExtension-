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
//push in new value

HashTable.prototype.set = function(key, value) {
  //create variable, assign return value of hashCode func
  const hashKey = hashCode(key, this.SIZE); 
  //if there is not any hashKey before, assign empty object 
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
  }
  //assign obj hashKey[key] : value
  this.storage[hashKey][key] = value;
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
//

HashTable.prototype.get = function(key) {
  //assign return value of hashCode func into variable
  const hashKey = hashCode(key, this.SIZE);
  //access to object [key] property
  return this.storage[hashKey][key];
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
  //create variable, assign return value of hashCode
  const hashKey = hashCode(key, this.SIZE);
  //if obj(this.storage is empty, return undefined)
  if (!this.storage[hashKey][key]) return undefined;
  //if there is value in the obj,
  if (this.storage[hashKey][key]) {
    //assign remove value into variable
    const removeValue = this.storage[hashKey][key];
    //delete removing value
    delete this.storage[hashKey][Key];
    //return removing value
    return removedValue;
    
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

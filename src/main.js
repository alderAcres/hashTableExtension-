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
  //assign a var to the output of running hashcode
  //this will be the key on our storage object where we want to place value
  const hashedKey = hashCode(key, this.size); 
  //place value at hashed key on our storage object
  this.storage[hashedKey] = value; 
  //increment this.size and return
  return this.SIZE++; 

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
  //assign a var to the output of running hashcode
  //this will be the key on our storage object where we want to retrieve a value
  const hashedKey = hashCode(key, this.size);

  //return the value from the storage object at "hashedKey"
  return this.storge[hashedKey];
  //I don't think I am accounting for if there is more than 1 value at given key
  //the original instance will be the first value given key
  //this.storage[hashedKey][0]?
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
  //assign a var to the output of running hashcode
  //this will be the key on our storage object where we want to delet a value
  const hashedKey = hashCode(key, this.size);

  //check if there is a value there, if not return undefined
  if(!this.storage[hashedKey]) return undefined;
  //otherwise there is a value assosicated to that key, and we delete it
  const deletedVal = this.storage[hashedKey];
  delete this.storage[hashedKey];
  
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

// Do not remove!!
module.exports = HashTable;

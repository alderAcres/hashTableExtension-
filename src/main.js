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
  // hash the key using the hashCode function
  const hashedKey = hashCode(key, this.SIZE);
  // set a newObj for every element so that it can carry multiple key/value pairs
  // if they have the same hashedKey value

  // if it is initially 'undefined', store a newObj into the approrpriate index position
  // and store the key and value to that object
  if(!this.storage[hashedKey]){
    const newObj = {};
    newObj[key] = value;
    this.storage[hashedKey] = newObj;
  }else{
    // if a key already exists in the storage, update the value
    // or simply add the key/value pairs
    (this.storage[hashedKey])[key] = value;
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
  const hashedKey = hashCode(key, this.SIZE);
  // check if the hashedKey exists
  if(this.storage[hashedKey]){
    const keyValue = (this.storage[hashedKey])[key];
    // if there are multiple key/value pairs are stored, return the correct value
    return keyValue;
  }
  // if it doesn't exist
  return;
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
  const hashedKey = hashCode(key, this.SIZE);
  const theKey = (this.storage[hashedKey])[key];

  if(this.storage[hashedKey] && theKey){
    const returnValue = (this.storage[hashedKey])[key];
    delete (this.storage[hashedKey])[key];

    return returnValue;
  }
  // if it doesn't exist, return undefined
  return;
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

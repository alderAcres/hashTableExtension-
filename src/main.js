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
  // this.storage refers to the new Hash Table being created
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
  // create a new hash address using the hashcode function from below
  const hashKey = hashCode(key, this.SIZE);
  // check the hash again to see if the created hash address has already been used;
  if (this.storage[hashKey]) {
    let index = 0;
    // use an index to loop through all key/value pairs stored at hash address
    while (this.storage[hashKey][index] !== undefined) {
      // increment index until an empty index is found
      index += 1;
    }
    // store new key/value pair in hashTable at hashKey address at empty index
    this.storage[hashKey][index] = {};
    this.storage[hashKey][index][key] = value
  }
  // store the key value pair in the hashTable at calculated address
  this.storage[hashKey] = {};
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
HashTable.prototype.get = function(key) {
  // lookup the hash address using the passed in key
  const hashKey = hashCode(key, this.SIZE);
  // check the hash table for the data at address
  const retrieved = this.storage[hashKey];
  // check if retrieved data has more than one key/value pairs;
  if (retrieved.length > 0) { 
    // loop through until correct key is found
    for (let i = 0; i < retrieved.length; i += 1) {
      if (retrieved[i].hasOwnProperty(key)) {
        return retrieved[i][key];
      }
    }
  }
  return retrieved;
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
  // create a hashaddress from the passed in key
  const hashKey = hashCode(key, this.SIZE);
  // check the hashTable for the hashKey, if not defined return undefined
  if (!this.storage[hashKey]) return undefined;
  // else, store key to be deleted in a variable, then delete key
  const removedKey = this.storage[hashKey];
  delete this.storage[hashKey];
  // return the variable hlding the deleted key
  return removedKey;
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

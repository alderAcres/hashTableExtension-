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
  //store address of hash table into variable
  const address = hashCode(key, this.SIZE); // index where key/value pair should be stored
  //if the key/value pair at the address does not exist
  if (this.storage[address] === undefined) {
    //create a new empty object
    const obj = {};
    //store the key/value pair at that address
    obj[key] = value;
    //reassign key's hashed address to new object
    return this.storage[address] = obj;
  }
  else {
    //if provided key has already been used to store another value, simply overwrite
    if (this.storage[key] !== undefined) {
      this.storage[key] = value;
    }
    //if the hashed address already contains a key/value pair (not undefined); 
    //reassign the key-value pair at that address
    if (this.storage[address][key] !== undefined) {
      this.storage[address][key] = value;
    }
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
  //store address of hash table into variable
  const address = hashCode(key, this.SIZE); // index where key/value pair should be stored
  //if more than one value is stored at key's hashed address, retrieve correct value that was originally stored with provided key
    //create an if statement to check if there are multiple values at key's hashed address (don't know how to do this)
  //return the value at the hashed key's address
  return this.storage[address][key];
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
//store address of hash table into variable
const address = hashCode(key, this.SIZE); // index where key/value pair should be stored
if (this.storage[key] === undefinied) {
  return undefined;
  }
else {
  //store key from hash table to remove
  const store = this.storage[address][key];
  //remove key from hash table
  delete this.storage[address][key];
  //return previously stored key
  return store;
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
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.items = 0;
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
  // will need to pass in the key and size of storage to the hashcode
  // to retrieve the 'address' of where to storage the value to

  // the address to store the value in this.storage
  // this defaults to overwriting the existing value with the new value
  let hashAddress = hashCode(key, this.SIZE);
  this.storage[hashAddress] = value;
  return ++this.items;
  // return the number of items 

  // 3 CHECKES! 1. when the hashAddress is undefined, create new obj with key and value
  //            2. when the hashAddress is already occupied, and its the same key and value
  //               simpley overwrite
  //            3. when collision occurs

  // HANDLING COLLISIONS
  // once set function is invoked,
  // check if the hashAddress has anything
  //   if it does, create an obj and store the previous in it
  //   if not, create an new object to hold the value
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
  // how would i retrieve the key?
  
  // iterate through the storage, and when the element in the array
  // matches the key
  for (let i = 0; i < this.SIZE; i += 1) {
    if (this.storage[i] === key) {
      // return the value stored with the speficied key
      return this.storage[i];
    }
  }
  // what happens when the key is not founded?
  // return what? -> undefined? or throw an Error()?
  return new Error('Key not founded');
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
  // let use native functions on this.storage
  // save some time
  // includes ->
  if (this.storage.includes(key)) {
    // the key exist
    // remove the key and value pair
    this.storage.splice(this.storage.indexOf(key), 1);
  } else {
    return undefined;
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

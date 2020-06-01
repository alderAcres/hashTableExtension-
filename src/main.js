/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  //maximum number of boxes 
  this.MAX_SIZE = 16;
  //num of inputs so far 
  this.numInputs = 0;
  this.storage = new Array(this.MAX_SIZE);
  //set every box equal to an object in order to handle collisions
  for (let i = 0; i < this.MAX_SIZE; i += 1) {
    this.storage[i] = {}
  }
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
HashTable.prototype.set = function (key, value) {
  //use hasCode function to find the correct box to store the key val pair in 
  let box = hashCode(key, this.MAX_SIZE);
  //if the key has not already been used inside the box, then increment numInputs
  if (this.storage[box][key] === undefined) this.numInputs += 1;
  //store the new key inside the boc
  this.storage[box][key] = value;
  //return the new number of inputs
  return this.numInputs;
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
HashTable.prototype.get = function (key) {
  //use hashCode function to find the key's box
  let box = hashCode(key, this.MAX_SIZE);
  return this.storage[box][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  //use hashCode function to find the key's box
  let box = hashCode(key, this.MAX_SIZE);
  //check that the key has been stored before
  if (this.storage[box][key] !== undefined) {
    //if so, return the element after deleting it and updating numInputs
    let temp = this.storage[box][key];
    delete this.storage[box][key]
    this.numInputs -= 1;
    return temp;
  }
  //if the key isn't in the hashTable, return undefined
  else return undefined;
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
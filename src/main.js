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

// implement a hash function
function hashString(input) {
  // assign hash to 0
  let hash = 0;
  // iterate through the input length
  for (let i = 0; i < input.length; i++) {
    // return hash
    return hash;
  }
}

/**
* set - Adds given value dhto the hash table with specified key.
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
// create a const index and assign it to the value of passing in key inyot te hash func
const index = hash(key);
// create a cond to determine if index at this.sorage exist,
if(!this.storage[index]){
  // if so, assign it to an empty array
  this.storage[index] = []
}
// else push the passed in key value pairs onto the storage arr at the index
this.storage[index].push(key, value);
) return index
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
// create a var index and assign it to the value of passing key into the hash func
const index = hash(key)
// create a conditional to determine if index at this.sotrage exist, if so return null
if(!this.storage[index]) return null
// iterate thtouth this.storage at the index
for (let storage of this.storage[index]) {
  // create a conditional to determine if the first el in storage is equal to key
  if(storage [0] === key) {
    // if so return storage at the 2nd el (1 index)
    return storage [1]
  }
}
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
// create a var value and assign it to this.hash with the key passed in
let value = this.hash(key);
// declare a var hashkey and assign it to 
  let hashKey = hash(key, this.SIZE);
  // if value exist, delete this.storage at the key index
  if (value) {
  delete this.storage[key];
  }
  // return value
  return value;

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

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.numItems = 0;
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
  // pass key to hashing function
  const hashLocation = hashCode(key, this.SIZE);
  // check whether hash table has a value at that location
    // if not, add an object there
  if (!this.storage[hashLocation]) this.storage[hashLocation] = {};
  // check if key already exists - if not, increment numItems property
  if (!this.storage[hashLocation][key]) this.numItems += 1;
  // add the same key-value pair to the existing location (will overwrite if existing key)
  this.storage[hashLocation][key] = value;
    // return number of items in hash table
  return this.numItems;
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
  // get location of input key using hashing function
  const hashLocation = hashCode(key, this.SIZE);
  // check whether the input key exists at that location
    // if so, return it
  if (this.storage[hashLocation][key]) return this.storage[hashLocation][key];
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
  // get location of input key using hashing function
  const hashLocation = hashCode(key, this.SIZE);
  // first, check if location exists in hash table
  if (this.storage[hashLocation]) {
    // if input key exists at that location, save it in a variable and delete key-value pair
    if (this.storage[hashLocation][key]) {
      const value = this.storage[hashLocation][key];
      delete this.storage[hashLocation][key];
      // decrement numItems property
      this.numItems -= 1;
      return value;
    }
  }
  // otherwise, return undefined
  return undefined;
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


// const hash = new HashTable();
// console.log(hash.set('blue', 7));
// console.log(hash);
// console.log(hash.get('blue'));
// console.log(hash)
// console.log(hash.remove('blue'));
// // console.log(hash.remove('green'));
// console.log(hash.set('three'))
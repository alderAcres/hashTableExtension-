/* eslint-disable func-names */
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
HashTable.prototype.set = function (key, value) {
  // pass key thorugh hash function
  const hashedKey = hashCode(key, this.SIZE);
  // check if the hashed address has a different key value pair
  if (this.storage[hashedKey] === undefined) this.storage[hashedKey] = {};
  // add the value to this.storage as a new object with the key value pair
  this.storage[hashedKey][key] = value;
  // iterate through the array 
  // then, iterate through each object to count the number of items stored in each object
  let counter = 0;
  this.storage.forEach((innerObj) => {
    if (innerObj) counter += Object.keys(innerObj).length
  });
  return counter;
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
  const hashedKey = hashCode(key, this.SIZE);
  return this.storage[hashedKey][key];
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
  const hashedKey = hashCode(key, this.SIZE);
  const result = this.storage[hashedKey][key];
  if (result) delete this.storage[hashedKey][key];
  return result;
  // note that this does not remove the "inner object"
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

// TESTS
// const newHashTable = new HashTable();
// console.log(newHashTable.set('k', 'value'));
// console.log(newHashTable);
// console.log(newHashTable.get("k"));
// console.log(newHashTable.remove("k"))
// console.log(newHashTable);


// Do not remove!!
module.exports = HashTable;

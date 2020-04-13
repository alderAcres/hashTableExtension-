/* eslint-disable prettier/prettier */
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
  // determine hashcode and store in variable
  const hash = hashCode(key, this.SIZE);
  // if hashcode doesn't already exist, passed in key, value as object
  if (!this.storage[hash]) {
    this.storage[hash] = {[key]:value}
  // else HASH COLLISION: if hashcode already exist in hashtable ->
  } else if (this.storage[hash]) {
    // if the key is the same, overwrite; if hash is same but key is different ->
        this.storage[hash][key] = value;
  };
};

/* TESTS
const test = new HashTable();
console.log(test);
test.set('dan','cat');
console.log(test)
test.set('nad', 'rock');
test.set('dad', 'dog');
console.log(test)
*/

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
  // determine hashcode
  const hash = hashCode(key, this.SIZE);
  // if key at hashcode exists, return value
  if (this.storage[hash] === undefined) return false;
  if (this.storage[hash][key]) return this.storage[hash][key];
  // else return false
  return false;
};

/* TESTS
// console.log(test.get('nad'))
// console.log(test.get('other'))
*/

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {

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


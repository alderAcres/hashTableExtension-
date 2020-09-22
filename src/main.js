//HELLO REVIEWER! I didn't know if we should implement data storage as objects or arrays... personally I would have liked to do a linked list
//as I know this is the most acceptable format across languages. However, for the purpose of this exercise, I have implemented arrays and objects.
//the version with objects is commented out below. my extension for rehashing only works for nested arrays at this time. I shall try to 
//refactor for objects in my own time :-)

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.currentSize = 0
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
  let index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) {
    this.storage[index] = new Array();
    this.storage[index].push([key, value]);
    this.currentSize++;
  }
  else if (this.storage[index] !== undefined) {
    this.storage[index].push([key, value]);
    this.currentSize++;
  }
  return this.currentSize
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
  let index = hashCode(key, this.SIZE);
  if (this.storage[index][0] === undefined) { return undefined }
  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][0] === key)
      return this.storage[index][i][1];
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
HashTable.prototype.remove = function (key) {
  let index = hashCode(key, this.SIZE);
  let rm = this.storage[index].splice(0, 1);
  this.currentSize--;
  return rm[0][1];
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


// USING OBJECTS

// function HashTable() {
//   this.SIZE = 16;
//   this.currentSize = 0
//   this.storage = new Array(this.SIZE);
// }


// /**
// * set - Adds given value to the hash table with specified key.
// *
// * - If the provided key has already been used to store another value, simply overwrite
// *   the existing value with the new value.
// * - If the hashed address already contains another key/value pair, you must handle
// *   the collision appropriately.
// *
// * @param {string} key - key to be used to create hashed address
// * @param {string|number|boolean} value - value to be stored in hash table
// * @return {number} The new number of items stored in the hash table
// */
// HashTable.prototype.set = function (key, value) {
//   let index = hashCode(key, this.SIZE);
//   if (this.storage[index] === undefined) {
//       this.storage[index] = {}
//       this.storage[index][key] = value;
//       this.currentSize++;
//   }
//   else if (this.storage[index] !== undefined) {
//       this.storage[index][key] = value;
//       this.currentSize++;
//   }
//   return this.currentSize
// };


// /**
// * get - Retrieves a value stored in the hash table with a specified key
// *
// * - If more than one value is stored at the key's hashed address, then you must retrieve
// *   the correct value that was originally stored with the provided key
// *
// * @param {string} key - key to lookup in hash table
// * @return {string|number|boolean} The value stored with the specifed key in the
// * hash table
// */
// HashTable.prototype.get = function (key) {
//   let index = hashCode(key, this.SIZE);
//   if (key in this.storage[index]) return this.storage[index][key];
// };

// /**
// * remove - delete a key/value pair from the hash table
// *
// * - If the key does not exist in the hash table, return undefined
// *
// * @param {string} key - key to be found and deleted in hash table
// * @return {string|number|boolean} The value deleted from the hash table
// */
// HashTable.prototype.remove = function (key) {
//   let index = hashCode(key, this.SIZE);
//   let rm = this.storage[index][key];
//   delete this.storage[index][key]
//   this.currentSize--;
//   return rm;
// };
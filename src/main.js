// - You must implement the `get`, `set`, and `remove` functions on the HashTable prototype.
// - Each function is commented with its specifications. Implement the functions exactly as their documentation prescribes. You may assume the functions will be called with the types listed in their documentation.
// - **important** Be sure to return the specified return value from each function's documentation

const { delete } = require('request');

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
  //we need the hash function to create a id where to store data(key,value)
  let index = hashCode(key, this.SIZE);
  //create counter to show the number of items stored
  let counter = 0;
  //check if there is no value at the givin index
  if (!this.storage[index]) {
    //if true, ceate an object first
    this.storage[index] = {};
    //set value into the object
    this.storage[index][key] = value;
    counter += 1;
  } else {
    this.storage[index][key] = value;
    counter += 1;
  }

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
  //find the key/value pairmatching with the input key
  //find the index where we can find the value
  let index = hashCode(key, this.SIZE);
  //declare a variable to store the value of input key
  const output = this.storage[index][key];
  //return the value
  return output;
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
  //find the key/value pair and store in variable
  const index = hashCode(key, this.SIZE);

  const found = this.storage[index][key];
  console.log(found);
  //delete this.storage[index][key];
  return found;
};

// Do not modify
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

// const hash1 = new HashTable();
// hash1.set('bob', 'hello');
// hash1.set('tim', 'hi');
// console.log(hash1.remove('tim'));
// console.log(hash1.storage);

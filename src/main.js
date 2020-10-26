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
  this.memUsed = 0;
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
  // declare index and set it equal to running hash code on key
  const index = hashCode(key, this.SIZE);
  // check to see if there is already a memory object at index, if not create an empty one;
  if (!this.storage[index]) this.storage[index] = {};
  // check to see if there already a value at index and key
  if (this.storage[index][key] !== undefined) {
    this.storage[index][key] = value;
    return this.memUsed;
  }
  // otherwise, add a key value pair at index
  this.storage[index][key] = value;
  // increment memory used
  this.memUsed += 1;
  return this.memUsed;
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

HashTable.prototype.get = function get(key) {
  // declare index and set it equal to running hash code on key
  const index = hashCode(key, this.SIZE);
  // check to see if there is a data object at index, if not return undefined
  if (!this.storage[index]) return undefined;
  // return value
  return this.storage[index][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function remove(key) {
  // declare index and set it equal to running hash code on key
  const index = hashCode(key, this.SIZE);
  // check to see if there is a data object at index, if not return undefined
  if (!this.storage[index]) return undefined;
  // check to see if value exists at key and index, if not return undefined
  if (this.storage[index][key] === undefined) return undefined;
  // store this.storage[index] in a variable output
  const output = this.storage[index][key];
  // delete key/value pair
  delete this.storage[index][key];
  // check to see if the object at index is empty, and if so reset the value using undefined
  if (!Object.keys(this.storage[index]).length) this.storage[index] = undefined;
  // decrement memory being used
  this.memUsed -= 1;
  return output;
};

// const hash = new HashTable();
// console.log(hash.set('bob', 'value 1'));
// console.log(hash.set('sally', 'value 2'));
// console.log(hash.get('sally'));
// console.log(hash.storage);
// console.log(hash.remove('sally'));
// console.log(hash.storage);
// console.log(hash.get('sally'));
// console.log(hash.remove('robert'));

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

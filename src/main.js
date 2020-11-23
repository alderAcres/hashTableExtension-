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
  //check if key and value have valid values
  if (!key || !value) return 'Please pass in valid key and value';
  //get the index to store value using hash function
  const index = hashCode(key, this.SIZE);
  //check if nothing is stored at index, store {key:value} at index
  if (!this.storage[index]) {
    this.storage[index] = {};
    this.storage[index][key] = value;
  }
  //check if something has been stored at index, handle collision by adding key-value pair to object this.storage at the same index
  else {
    this.storage[index][key] = value;
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
HashTable.prototype.get = function (key) {
  if (!key) return 'Please provide a valid key';
  //get index that key is stored at
  const index = hashCode(key, this.SIZE);
  //check if there is something stored at index, if key is found, return value
  if (this.storage[index]) {
    return this.storage[index][key];
  } else {
    //if key doesnt exist, return undefined
    return 'undefined ';
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
  //check if key is a valid value
  if (!key) return 'Please pass in a valid key';
  //get index where key is stored at
  const index = hashCode(key, this.SIZE);
  //if key exist, delete the key
  if (this.storage[index].hasOwnProperty(key)) {
    const deleted = this.storage[index][key];
    delete this.storage[index][key];
    //return the deleted value
    return deleted;
  } else {
    //if key doesnt exist, return undefined
    return 'undefined';
  }
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
const hash = new HashTable();
hash.set('Linh', 'Tran');
hash.set('num', 1244);
console.log(hash.set('', ''));
console.log(hash.remove('ugh'));

// Do not remove!!
module.exports = HashTable;

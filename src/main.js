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
  // run the key through the hash function and store the result to a variable
  // this value will be the location in the array that we stored the value
  let hashedKey = hashCode(key, this.SIZE);

  // if the value in that location of the array is undefined then set it equal to the key/value pair
  if (!this.storage[hashedKey]) {
    let obj = {};
    obj[key] = value;
    this.storage[hashedKey] = obj;
  } else {
    // if there is already a key/value pair in that location
    // overwrite the value if the existing key is the same as the new key
    // add the new key/value pair to the object if that key doesn't exist in the object
    this.storage[hashedKey][key] = value;
  }
};

// let testHash = new HashTable();
// testHash.set('tyler', 'yo');
// testHash.set('bob', 'wuddup');
// console.log(testHash);

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
  let hashedKey = hashCode(key, this.SIZE);
  return this.storage[hashedKey][key];
};
// console.log(testHash)
// console.log(testHash.get('tyler'));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  // lookup obj
  let hashedKey = hashCode(key, this.SIZE);
  let obj = this.storage[hashedKey][key];
  console.log(obj);
  // if obj doesn't exist, then return undefined
  if (obj === undefined) {
    console.log(1);
    return undefined;
  }
  // if obj does exist, delete the object and don't return any value
  else {
    delete this.storage[hashedKey][key];
  }

  // TODO later - delete empty object if there was only one key/value pair in object
};

// console.log(testHash.remove('tyler'));
// console.log(testHash);

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
  // return 2
}

// Do not remove!!
module.exports = HashTable;

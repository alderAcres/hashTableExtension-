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
  // return error if both key and value are not passed
  if (!key || !value) {
    console.log('This method requires valid key and value arguments');
    return;
  }
  // create variable to store result of passing key through hash function
  const address = hashCode(key, this.SIZE);
  // if an object does not exist at hashed address in storage proeprty of hashTable obj, create object with input key: value pair
  if (!this.storage[address]) {
    const newObj = {};
    newObj[key] = value;
    this.storage[address] = newObj;
  } else {
    // else set key to value on object at hashed address. This will overwrite any dupes for key.
    this.storage[address][key] = value;
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
  //return error if key not passed
  if (!key) {
    console.log('This method requires a valid key argument');
    return;
  }
  // create variable to store result of passing key through hash function
  const address = hashCode(key, this.SIZE);
  // return value of key at address
  return this.storage[address][key];
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
  //return error if key not passed
  if (!key) {
    console.log('This method requires a valid key argument');
    return;
  }
  // create variable to store result of passing key through hash function
  const address = hashCode(key, this.SIZE);
  // create variable to store return value of accessing HashTable at address at key
  const returnValue = this.storage[address][key];
  // delete value at HashTable at address at key
  delete this.storage[address][key];
  return returnValue;
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

//Tests

console.log(hashCode('Regis', 16));
console.log(hashCode('Ramses', 16));
console.log(hashCode('Roxy', 16));

const table = new HashTable();
table.set('Regis', 'handsomest');
table.set('Ramses', 'cutest');
table.set('Roxy', 'prettiest');
console.log(table.set('cat')); // should return undefined and log err message to console

console.log(table); // should log object with storage property set to array of 13 empty spaces, object with 'Roxy': 'prettiest' at index 13 and object with 'Regis':'handsomest' and 'Ramses': 'cutest' at index 14, and empty space at index 15

console.log(table.get('Roxy')); // should return/log 'prettiest'
console.log(table.get('Regis')); // should return/log 'handsomest'
console.log(table.get()); // should return undefined and log err message to console

console.log(table.remove('Roxy')); // should return/log 'prettiest'
console.log(table.remove()); // should return undefined and log err message to console
console.log(table); // should log object with storage property set to array of 14 empty spaces, object with 'Regis':'handsomest' and 'Ramses': 'cutest' at index 14, and empty space at index 15

//RIP Roxy, you were the goodest and prettiest girl and we will always love you. 😿😿😿

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
  // creates a hashKey with given key and size
  const hashKey = hashCode(key, this.SIZE);
  // console.log(hashKey);
  // need to check if a key value pair is already at the generated hashKey (collision)
  // if not, create a new object to store
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
  }
  //  put the key value pair in the object
  this.storage[hashKey][key] = value;
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
  // generate the hashKey
  const hashKey = hashCode(key, this.SIZE);
  // console.log(hashKey);
  // look inside the object in storage with the hashkey, then retrieve the value with given key
  return this.storage[hashKey][key];
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
  // generate hashKey
  const hashKey = hashCode(key, this.SIZE);

  // need to go inside the storage with hashKey
  // determine if the object has only one key-value pair
  // if so, delete the whole object, then fill back up with undefined
  if (Object.keys(this.storage[hashKey]).length === 1) {
    return this.storage.splice(hashKey, 1, undefined)[0][key];

    // if object hold multiple key value pair, need to only delete the specified key value pair
  } else {
    // store the deleted value
    const removed = this.storage[hashKey][key];
    // delete the key value pair
    delete this.storage[hashKey][key];
    // return deleted value
    return removed;
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

// Do not remove!!
module.exports = HashTable;

// manual tests
const testHash = new HashTable();
testHash.set('hello', 'hi');
testHash.set('eellloo', 'non');
testHash.set('fjqoie', 'hala');
// console.log('testHash', testHash);
// console.log("testHash.get('fjqoie')", testHash.get('fjqoie'));
testHash.remove('hello');
console.log(testHash.remove('eellloo'));
console.log('testHash', testHash);

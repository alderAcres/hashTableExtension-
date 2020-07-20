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
  // determine "bucket"
  const bucket = hashCode(key, this.SIZE);

  // if the bucket (array index) is undefined, store empty object there to handle collisions
  if (!this.storage[bucket]) {
    this.storage[bucket] = {};
    this.storage[bucket][key] = value;
  } else {
    this.storage[bucket][key] = value;
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
  // determine "bucket"
  const bucket = hashCode(key, this.SIZE);

  // if bucket object is present and key exists on it, return value
  if (this.storage[bucket] && this.storage[bucket][key])
    return this.storage[bucket][key];

  // if not, return message
  return 'Does not exist';
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
  // determine "bucket"
  const bucket = hashCode(key, this.SIZE);

  // if bucket object is present and key exists on it, delete key
  if (this.storage[bucket] && this.storage[bucket][key]) {
    delete this.storage[bucket][key];
  }
  // if object in the bucket is now empty, set it back to it's default of undefined
  if (Object.keys(this.storage[bucket]).length === 0) {
    this.storage[bucket] = undefined;
  }

  return undefined;
};

const myHashTable = new HashTable();
myHashTable.set('prop1', 'value1');
myHashTable.set('prop2', 'value2');
console.log(myHashTable);
console.log(myHashTable.get('prop2'));
console.log(myHashTable.get('prop4'));
myHashTable.remove('prop1');
console.log(myHashTable);
console.log(myHashTable.storage[0]);

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

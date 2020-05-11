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
  // only 1 arg
  if (value === undefined) return 'Must enter 2 args';

  const hashedIndex = hashCode(key, this.SIZE);
  // if bucket is empty
  // pushing both key:value pair to resolve collision
  if (this.storage[hashedIndex] === undefined) {
    // can't figure out how to combine line 32 with 33...   this.storage[hashedIndex] = {key: value} does not work
    this.storage[hashedIndex] = {};
    this.storage[hashedIndex][key] = value;
    return;
  }
  // if bucket already exists, either add a new key:value pair or overwrite existing key value
  else {
    this.storage[hashedIndex][key] = value;
    return;
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
  // no input
  if (key === undefined) return 'Must pass in key';

  const hashIndex = hashCode(key, this.SIZE);
  // if key does not exist
  if (
    this.storage[hashIndex] === undefined ||
    this.storage[hashIndex][key] === undefined
  ) {
    return 'Value not found';
  }
  return this.storage[hashIndex][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */

// return void
HashTable.prototype.remove = function (key) {
  // no input
  if (key === undefined) return 'Must pass in key';

  const hashIndex = hashCode(key, this.SIZE);
  // not found
  if (
    this.storage[hashIndex] === undefined ||
    this.storage[hashIndex][key] === undefined
  ) {
    return undefined;
  }

  // If it's only one pair in the bucket, reinitiate bucket to undefined.
  if (Object.keys(this.storage[hashIndex]).length === 1) {
    this.storage[hashIndex] = undefined;
    return;
  }
  // otherwise just delete the key:value pair in the bucket
  delete this.storage[hashIndex][key];
  return;
};

// testing

// const hashTable = new HashTable();
// hashTable.set(1, '5');
// hashTable.set(2, '7');
// console.log(hashTable.remove(1));
// console.log(hashTable.remove(2));
// hashTable.set(6, 'hi');
// console.log(hashTable.storage);

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

// const hashTable = new HashTable();
// hashTable.set(1, '5');
// hashTable.set(2, '7');
// hashTable.set('z', 'hello');
// console.log(hashTable.get(2));

// console.log(hashTable.storage);

// Do not remove!!
module.exports = HashTable;

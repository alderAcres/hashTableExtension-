const { delete } = require('request');

/**
 * HashTable constructor
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
  const idx = hashCode(key, this.SIZE);

  // No bucket at index, create new one
  if (!this.storage[idx]) {
    this.storage[idx] = [];
  }

  if (this.get(key)) {
    const existingElement = this.storage[idx].find((el) => el.key === key);
    existingElement.value = value;
  } else {
    this.storage[idx].push({ key, value });
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
  const idx = hashCode(key, this.SIZE);
  const bucket = this.storage[idx];

  if (!bucket) return undefined;

  for (const el of bucket) {
    if (el.key === key) {
      return el.value;
    }
  }

  // Not found
  return undefined;
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
  const idx = hashCode(key, this.SIZE);

  const bucket = this.storage[idx];
  // No bucket at idx
  if (!bucket) return undefined;

  const elementToBeDeleted = bucket.find((el) => el.key === key);
  // No matched element in the bucket
  if (!elementToBeDeleted) return undefined;

  this.storage[idx] = bucket.filter((el) => el !== elementToBeDeleted);

  return elementToBeDeleted.value;
};

const ht = new HashTable();
ht.set('me', 'duy');
ht.set('em', 'ajax');
ht.set('age', 24);

console.log(ht.get('me'));
console.log(ht.get('age'));

console.log(ht.remove('me'));
console.log(ht.remove('age'));

console.log(ht.get('me'));
console.log(ht.get('asd'));
console.log(ht.get('em'));
console.log(ht.get('age'));

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

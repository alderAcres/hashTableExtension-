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
  const index = hashCode(String(key), this.SIZE);
  const container = {};
  container[key] = value;
  if (!this.storage[index]) {
    this.storage[index] = container;
  } else {
    this.storage[index][key] = value;
  }
};

const test = new HashTable();
console.log(test);
test.set('hello', 3);
console.log(test);
test.set('hey', 6);
console.log(test);
test.set('b', 2);
test.set('l', 16);
console.log(test);

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
  const index = hashCode(String(key), this.SIZE);
  return this.storage[index][key];
};

console.log(test.get('hello'));
console.log(test.get('b'));
console.log(test.get('hey'));
console.log(test.get('l'));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  const index = hashCode(String(key), this.SIZE);
  if (!this.storage[index]) return undefined;
  delete this.storage[index][key];
};

test.remove('hello');
test.remove('hey');
console.log(test);
console.log(test.remove('heather'));

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

console.log(hashCode('b', 16));
console.log(hashCode('hello', 16));
console.log(hashCode('hey', 16));
console.log(hashCode('l', 16));

// Do not remove!!
module.exports = HashTable;

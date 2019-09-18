/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.occupied = 0;
  this.storage = new Array(this.SIZE);
}

const testHT = new HashTable();

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
HashTable.prototype.set = function(key, value) {
  //declare hash index
  const hashIdx = hashCode(key, this.SIZE);

  //create object at hash index of hashtable
  this.storage[hashIdx] = {};

  // set key as key arguemnt and value as value argument
  this.storage[hashIdx][key] = value;

  this.occupied++;
};

testHT.set('key1', 1);
console.log(testHT);

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
HashTable.prototype.get = function(key) {
  // find hash index
  const hashIdx = hashCode(key, this.SIZE);

  // search object at hash index for a key matching key input
  return this.storage[hashIdx][key];
};

console.log(testHT.get('key1'));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
  // find hash index
  const hashIdx = hashCode(key, this.SIZE);

  // delete value or return undefined if undefined
  if (this.storage[hashIdx][key] === undefined) return undefined;
  else delete this.storage[hashIdx][key];

  // reduce size
  this.occupied--;
};

testHT.remove('key1');
console.log(testHT);

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

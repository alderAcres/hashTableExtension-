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
  this.itemCount = 0;
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
  // if index is not a storage object, create it --> collision avoidance
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) this.storage[index] = {};
  // store original k/v pair
  this.storage[index][key] = value;
  // incriment and return new item count
  this.itemCount += 1;
  return this.itemCount;
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
HashTable.prototype.get = function(key) {
  // return value at original key within index
  const index = hashCode(key, this.SIZE);
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
HashTable.prototype.remove = function(key) {
  // EDGE CASE: key does not exist in hash table --> return undefined
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index][key]) return undefined;
  // console.log(this.location);
  // otherwise hash -> find -> store temp -> delete original -> return temp
  const temp = this.storage[index][key];
  delete this.storage[index][key];
  return temp;
};

// Do not modify
function hashCode(string, size) {
  'use strict';
  let hash = 0;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % size;
}

// TEST SUITE
const hashBrowns = new HashTable();
console.log(hashBrowns.set('foo', 'bar')); // -> 1
console.log(hashBrowns.set('spam', 'eggs')); // -> 2
console.log(hashBrowns.get('foo')); // -> bar
console.log(hashBrowns.remove('foo')); // -> bar
console.log(hashBrowns.remove('spam')); // -> eggs
console.log(hashBrowns.remove('spam')); // -> undefined

// Do not remove!!
module.exports = HashTable;

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  // this.entries = 0;
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
HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) {
    // initialize 'buckets'
    const buckets = {};
    buckets[key] = value;
    this.storage[index] = buckets;
    this.storage[index][key];
    // this.entries++;
  }
  // handle collisions 
  this.storage[index][key] = value;
  this.storage[index][key];
  // this.entries++;
  // console.log(this.entries);
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
  const index = hashCode(key, this.SIZE);
  const removed = this.storage[index][key];
  // remove entry from 'buckets'
  delete this.storage[index][key];
  // this.entries--;
  return removed;
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

const h = new HashTable();
h.set(1, 1);
h.set(2, 2);
h.set(3, 3);
h.set(4, 4);
h.set(5, 5);
h.set(6, 6);
console.log(h);
console.log(h.get(3));
console.log(h.remove(3));
console.log(h.remove(9))
console.log(h.storage);
console.log(h.set(4, 'true'));
console.log(h.storage);
// console.log(h.entries);


// Do not remove!!
module.exports = HashTable;

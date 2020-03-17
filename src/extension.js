/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;

  this.items = 0;
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
 *
 * @param {string} key - key to be used to create hashed address
 * @param {string|number|boolean} value - value to be stored in hash table
 * @return {number} The new number of items stored in the hash table
 * 
 * 
 *   set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything


 */

HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) {
    this.storage[index] = {};
    this.storage[index][key] = value;
    this.items++;
  } else {
    if (this.storage[index][key] === undefined) this.items++;
    this.storage[index][key] = value;
  }

  if (this.items >= this.SIZE * 0.75) {
    this.rehash(value, 2);
  }
  return this.items;
};

HashTable.prototype.rehash = function(value, resizeFactor) {
  this.SIZE = resizeFactor === 2 ? (this.SIZE *= 2) : (this.SIZE /= 2);
  this.items = 0;
  const storage = this.storage;
  this.storage = new Array(this.SIZE);
  storage.forEach(bucket => {
    for (const key in bucket) {
      let index = hashCode(key, this.SIZE);
      if (!this.storage[index]) {
        this.storage[index] = {};
        this.storage[index][key] = value;
        this.items++;
      } else {
        if (this.storage[index][key] === undefined) this.items++;
        this.storage[index][key] = value;
      }
    }
  });
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
  if (this.storage[index][key] === undefined) return undefined;
  return this.storage[index][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 * 
 *   remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
 */
HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE);
  if (this.storage[index][key] === undefined) return undefined;
  const value = this.storage[index][key];
  delete this.storage[index][key];
  this.items--;

  if (this.SIZE >= 16 && this.items <= Math.floor(0.25 * this.SIZE)) {
    this.rehash(value, 0.5);
  }
  return value;
};

// const myHashTable = new HashTable();
// myHashTable.set('a', 5);
// myHashTable.set('b', 4);
// myHashTable.set('c', 4);
// myHashTable.set('d', 6);
// myHashTable.set('e', 6);
// myHashTable.set('f', 6);
// console.log(myHashTable.set('g', 231321));
// myHashTable.set('f', 6);
// myHashTable.set('h', 6);
// myHashTable.set('i', 6);
// myHashTable.set('j', 6);
// myHashTable.set('k', 6);
// myHashTable.remove('a');
// myHashTable.remove('b');
// myHashTable.remove('c');
// myHashTable.remove('d');
// myHashTable.remove('e');
// myHashTable.remove('f');
// myHashTable.remove('h');
// console.log(myHashTable);

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

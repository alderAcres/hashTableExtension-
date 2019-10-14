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
  this.length = 0;
  this.storage = new Array(this.SIZE);
  this.tracker = {};
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
  const hashedKey = hashCode(key, this.SIZE);
  if (!this.storage[hashedKey]) this.storage[hashedKey] = {};

  // if key already exists, overwrite
  if (this.storage[hashedKey][key]) this.storage[hashedKey][key] = value;

  // if key doesn't exist, create new key/value and increment length (# of stored items)
  if (!this.storage[hashedKey][key]) {
    this.storage[hashedKey][key] = value;
    this.length += 1;
  }

  // Keeps track of current key/value pairs in this.storage
  this.tracker[key] = value;

  // If adding new item pushes to over 75% of size, double size and rehash everything
  if (this.length === (.75 * this.SIZE + 1)) {
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);

    for (const key in this.tracker) {
      const rehash = hashCode(key, this.SIZE);
      if (!this.storage[rehash]) this.storage[rehash] = {};
      if (this.storage[rehash][key]) this.storage[rehash][key] = value;

      if (!this.storage[rehash][key]) {
        this.storage[rehash][key] = value;
      }
    }
  }
}
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
  const hashedKey = hashCode(key, this.SIZE);
  if (!this.storage[hashedKey]) return undefined;

  const valueToReturn = this.storage[hashedKey][key];
  return valueToReturn;
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
  const hashedKey = hashCode(key, this.SIZE);
  if (!this.storage[hashedKey]) return undefined;

  const deletedValue = this.storage[hashedKey][key];
  delete this.storage[hashedKey][key];
  delete this.tracker[key];
  this.length -= 1;
  return deletedValue;
};

// const newHashTable = new HashTable();
// newHashTable.set('alpha', 1);
// newHashTable.set('beta', 2);
// newHashTable.set('gamma', 3);
// newHashTable.set('a', 4);
// newHashTable.set('b', 4);
// newHashTable.set('c', 4);
// newHashTable.set('d', 4);
// newHashTable.set('e', 4);
// newHashTable.set('f', 4);
// newHashTable.set('g', 4);
// newHashTable.set('h', 4);
// newHashTable.set('i', 4);
// newHashTable.set('j', 4);
// console.log('OUTPUT: newHashTable', newHashTable)
// console.log('rehash gamma ', hashCode('gamma', this.SIZE));
// console.log('rehash g ', hashCode('g', this.SIZE));

// YOUR CODE ABOVE

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

// Do not remove!!
module.exports = HashTable;

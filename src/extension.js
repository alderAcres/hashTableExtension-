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
  this.used = 0;
  this.storage = new Array(this.SIZE);
  for (let i = 0; i < this.storage.length; i++) {
    this.storage[i] = {};
  }
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
  // Determine our hashed address
  let address = hashCode(key, this.SIZE);
  // Check if storage is being used
  if (this.storage[address]) this.used++;
  // Check if over 75% of storage is being used
  if (this.used / this.SIZE > 0.75) {
    // Double our storage size
    // Create the new, larger storage space and fill it with our key.value pairs
    this.SIZE *= 2;
    let temp = new Array(this.SIZE);
    for (let i = 0; i < this.SIZE; i++) {
      temp[i] = {};
    }
    this.storage.forEach((key, value) => {
      address = hashCode(key, this.SIZE);
      temp[address][key] = value;
    });
    this.storage = temp;
  }
  // Store our input key/value pair
  this.storage[address][key] = value;
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
  let address = hashCode(key, this.SIZE);
  return this.storage[address][key];
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
  // Determine our hashed address and save our removed value to be returned
  let address = hashCode(key, this.SIZE);
  const removed = this.storage[address][key];
  // Delete the removed item from storage
  this.storage[address][key] = undefined;
  // Check if the storage space is now undefined and we didn't remove nothing
  // If so, we're using less space (by one)
  if (this.storage[address] && !removed) this.used--;
  if (this.used / this.SIZE < 0.25) {
    this.SIZE /= 2;
    let temp = new Array(this.SIZE);
    for (let i = 0; i < this.SIZE; i++) {
      temp[i] = {};
    }
    this.storage.forEach((key, value) => {
      address = hashCode(key, this.SIZE);
      temp[address] = { key: value };
    });
    this.storage = temp;
  }
  // Return the removed value (even if it's undefined)
  return removed;
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

let table = new HashTable();
console.log(table);
table.set('key', 'value1');
console.log(table);
console.log(table.get('key'));
console.log(table.remove('key'));

// YOUR CODE ABOVE

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

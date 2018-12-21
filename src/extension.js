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
function HashTable() {
  this.SIZE = 16;
  this.counter = 0;
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
  const threeQuarter = Math.floor(0.75 * this.SIZE);
  if (this.counter >= threeQuarter) this.SIZE = Math.floor(this.SIZE * 2);
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) this.storage[index] = {};
  this.storage[index][key] = value;
  this.counter++;
};
const newErr = new HashTable();
newErr.set('hi', 5);
newErr.set('hello', 'there');
newErr.set('hey', 'dude');
newErr.set(1, 'dude');
newErr.set(2, 'dude');
newErr.set(3, 'dude');
newErr.set(4, 'dude');
newErr.set(5, 'dude');
newErr.set(6, 'dude');
newErr.set(7, 'dude');
newErr.set(8, 'dude');
newErr.set(9, 'dude');
newErr.set(10, 'dude');
console.log(newErr.SIZE);

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
  threeQuarter = Math.floor(0.75 * this.SIZE);
  return this.storage[index][key];
};

// console.log(newErr.get('hi'));

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
  if (this.storage[index][key] === undefined) return undefined;
  const output = this.storage[index][key];
  delete this.storage[index][key];
  return output;
};

// console.log(newErr.remove('hi'));
// console.log(newErr);
// console.log(newErr.get('hi'));

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

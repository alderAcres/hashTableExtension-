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

  this.storage = new Array(this.SIZE);

  // make new property
  let occupiedBucket = 0;
  for (let bucket of this.storage) {
    if (bucket !== undefined) occupiedBucket++;
  }
  this.occupied = occupiedBucket;
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

  // type issues
  if (
    typeof value !== 'number' &&
    typeof value !== 'string' &&
    typeof value !== 'boolean'
  ) {
    return undefined;
  }
  const hashedIndex = hashCode(key, this.SIZE);
  // if bucket is empty
  // pushing both key:value pair to resolve collision
  if (this.storage[hashedIndex] === undefined) {
    // can't figure out how to combine line 32 with 33...   this.storage[hashedIndex] = {key: value} does not work
    this.storage[hashedIndex] = {};
    this.storage[hashedIndex][key] = value;
    this.occupied++;
    // if this.occupied / this.SIZE > .75,  double bucket size and rehash
    if (this.occupied / this.SIZE > 0.75) {
      this.SIZE *= 2;
      const oldStorage = this.storage; // store current storage
      this.storage = new Array(this.SIZE); // make new double size storage
      this.occupied = 0;
      // go through current bucket and rehash
      for (bucket of oldStorage) {
        if (bucket !== undefined) {
          for (key in bucket) {
            this.set(key, bucket[key]);
          }
        }
      }
    }

    return this.occupied;
  }
  // if bucket already exists, either add a new key:value pair or overwrite existing key value
  else {
    this.storage[hashedIndex][key] = value;
    return this.occupied;
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
  // store value before deleting
  const toDelete = this.storage[hashIndex][key];
  delete this.storage[hashIndex][key];
  // if that bucket is now empty, reinitiate to undefined so set() will function properly
  if (Object.keys(this.storage[hashIndex]).length === 0) {
    this.storage[hashIndex] = undefined;
    // decrement count
    this.occupied--;
  }
  return toDelete;
};

// testing

const hashTable = new HashTable();
hashTable.set(1, '5');
hashTable.set(2, '2');
hashTable.set('a', 'a');
hashTable.set('b', 'b');
hashTable.set('c', 'c');
hashTable.set('d', 'd');
hashTable.set('e', 'e');
hashTable.set('f', 'f');
hashTable.set('g', 'g');
hashTable.set('h', 'h');
hashTable.set('i', 'i');
hashTable.set('j', 'j');
hashTable.set('k', 'k');
hashTable.set('l', 'l');
hashTable.set('m', 'm');
hashTable.set('n', 'n');

console.log(hashTable);

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

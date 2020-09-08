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
  this.items = 0;
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
    this.items += 1;
  }

  if (this.buckets >= this.SIZE * 0.75) {
    this.rehash(this.SIZE * 2);
  }
};

HashTable.prototype.rehash = function (size) {
  this.SIZE = size;
  this.items = 0;

  const newStorage = new Array(this.SIZE);

  this.storage.forEach((bucket) => {
    if (bucket) {
      bucket.forEach(({ key, value }) => {
        const idx = hashCode(key, this.SIZE);

        // No bucket at idx
        if (!newStorage[idx]) {
          newStorage[idx] = [];
        }

        if (this.get(key)) {
          const existingElement = newStorage[idx].find((el) => el.key === key);
          existingElement.value = value;
        } else {
          newStorage[idx].push({ key, value });
          this.items += 1;
        }
      });
    }
  });

  this.storage = newStorage;
};

HashTable.prototype.get = function (key) {
  const idx = hashCode(key, this.SIZE);
  const bucket = this.storage[idx];

  for (const el of bucket) {
    if (el.key === key) {
      return el.value;
    }
  }

  // Not found
  return undefined;
};

HashTable.prototype.remove = function (key) {
  const idx = hashCode(key, this.SIZE);

  const bucket = this.storage[idx];
  // No bucket at idx
  if (!bucket) return undefined;

  const elementToBeDeleted = bucket.find((el) => el.key === key);
  // No matched element in the bucket
  if (!elementToBeDeleted) return undefined;

  this.storage[idx] = bucket.filter((el) => el !== elementToBeDeleted);
  this.items -= 1;

  if (this.SIZE >= 16 && this.items < Math.floor(this.SIZE * 0.25)) {
    this.rehash(this.SIZE / 2);
  }

  return elementToBeDeleted.value;
};

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

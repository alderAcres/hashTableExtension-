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
  this.filledBuckets = 0;
  this.changeSize = function (sizeChange) {
    if (this.SIZE >= 16) {
      this.SIZE = this.SIZE * sizeChange;
      this.filledBuckets = 0;
      const newHash = new Array(this.SIZE);
      this.storage.forEach((bucket) => {
        if (bucket) {
          for (const key in bucket) {
            const oldHashCode = hashCode(key, this.SIZE / sizeChange);
            const newHashCode = hashCode(key, this.SIZE);
            if (!newHash[newHashCode]) {
              newHash[newHashCode] = {}
              this.filledBuckets += 1;
            }
            newHash[newHashCode][key] = this.storage[oldHashCode][key];
          }
        }
      });
      this.storage = newHash;
    }
  };
}

HashTable.prototype.set = function (key, value) {
  if (this.filledBuckets / this.SIZE >= 0.75) {
    this.changeSize(2);
    console.log(this.storage);

  }
  let hash = hashCode(key, this.SIZE);
  if (!this.storage[hash]) {
    this.storage[hash] = {};
    this.filledBuckets += 1;
  }
  this.storage[hash][key] = value;
  return this.SIZE;
};

const hashTable = new HashTable();
hashTable.set('name', 'brendan');
hashTable.set('name1', 'bren1');
hashTable.set('name2', 'bren2');
hashTable.set('name3', 'bren3');
hashTable.set('name4', 'bren4');
hashTable.set('name5', 'bren5');
hashTable.set('name6', 'bren6');
hashTable.set('name7', 'bren7');
hashTable.set('name8', 'bren8');
hashTable.set('name9', 'bren9');
hashTable.set('name1', 'bren10');
hashTable.set('name11', 'bren11');
hashTable.set('name12', 'bren12');
hashTable.set('name13', 'bren13');
hashTable.set('name14', 'bren14');
hashTable.set('name15', 'bren15');
hashTable.set('name16', 'bren16');
hashTable.set('name17', 'bren17');


HashTable.prototype.get = function (key) {
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash][key];
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
  const hash = hashCode(key, this.SIZE);
  const removedValue = this.storage[hash][key];
  if (Object.keys(this.storage[hash]).length === 1 && this.storage[hash][key]) {
    this.storage[hash] = undefined;
    this.filledBuckets -= 1;
    if (this.filledBuckets / this.SIZE <= 0.25) {
      this.changeSize(0.5);
    }
  } else if (this.storage[hash][key]) {
    delete this.storage[hash][key];
  }
  return removedValue;
};

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

/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
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

function HashTable(size = 16) {
  this.SIZE = size;
  this.length = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash]) this.storage[hash] = {};
  this.storage[hash][key] = value;
  this.length++;
  if (this.length >= this.SIZE * 0.75) {
    const newHashTable = new HashTable(this.SIZE * 2);
    for (let i = 0; i < this.SIZE; i++) {
      if (this.storage[i]) {
        for (const [k, v] of Object.entries(this.storage[i])) {
          const newHash = hashCode(k, this.SIZE * 2);
          if (!newHashTable.storage[newHash]) newHashTable.storage[newHash] = {};
          newHashTable.storage[newHash][k] = v;
          newHashTable.length++;
        }
      }
    }
    this.storage = newHashTable.storage;
    this.length = newHashTable.length;
    this.SIZE = newHashTable.SIZE;
  }
};

HashTable.prototype.get = function (key) {
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash][key]) {
    return this.storage[hash][key];
  }
};

HashTable.prototype.remove = function (key) {
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) {
    const result = this.storage[hash][key];
    delete this.storage[hash][key];
    this.length--;
    if (this.length <= this.SIZE * 0.25) {
      const newHashTable = new HashTable(this.SIZE / 2);
      for (let i = 0; i < this.SIZE; i++) {
        if (this.storage[i]) {
          for (const [k, v] of Object.entries(this.storage[i])) {
            const newHash = hashCode(k, this.SIZE / 2);
            if (!newHashTable.storage[newHash]) newHashTable.storage[newHash] = {};
            newHashTable.storage[newHash][k] = v;
            newHashTable.length++;
          }
        }
      }
      this.storage = newHashTable.storage;
      this.length = newHashTable.length;
      this.SIZE = newHashTable.SIZE;
    }
    return result;
  }
  return undefined;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

// Tests

// const hT = new HashTable();
// for (let i = 0; i < 13; i++) {
//   hT.set(`key ${i}`, `value ${i}`);
// }

// console.log(hT.get('key 0'));
// console.log(hT.remove('key 0'));
// console.log(hT);

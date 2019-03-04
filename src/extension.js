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

class HashTable {
  constructor() {
    this.SIZE = 16;
    this.storage = new Array(this.SIZE);
    this.numberOfItems = 0;
  }

  set(key, value) {
    this.numberOfItems += 1;

    if (this.numberOfItems >= this.SIZE * 0.75) {
      this.SIZE *= 2;
      this.rehash();
    } else {
      const hashIndex = hashCode(key, this.SIZE);
      if (!this.storage[hashIndex]) {
        this.storage[hashIndex] = {};
      }
      this.storage[hashIndex][key] = value;
    }

    return this.numberOfItems;
  }

  get(key) {
    const hashIndex = hashCode(key, this.SIZE);

    if (this.storage[hashIndex][key]) {
      return this.storage[hashIndex][key];
    } else {
      console.log("no such key exists.");
      return undefined;
    }
  }

  remove(key) {
    const hashIndex = hashCode(key, this.SIZE);
    if (this.storage[hashIndex][key]) {
      const toDelete = this.storage[hashIndex][key];
      delete this.storage[hashIndex][key];
      this.numberOfItems -= 1;
      if (
        this.SIZE > 16 &&
        this.numberOfItems <= Math.floor(this.SIZE * 0.25)
      ) {
        this.SIZE = this.SIZE / 2;
        this.rehash();
      }
      return toDelete;
    } else {
      return undefined;
    }
  }

  rehash() {
    const copyOfHashTable = [];
    this.storage.forEach(cell => {
      for (let key in cell) {
        const newHashIndex = hashCode(key, this.SIZE);
        const prevHashIndex = hashCode(key, this.SIZE / 2);
        if (!copyOfHashTable[newHashIndex]) {
          copyOfHashTable[newHashIndex] = {};
        }

        copyOfHashTable[newHashIndex][key] = this.storage[prevHashIndex][key];
      }
    });
    this.storage = copyOfHashTable;
  }
}

// Do not modify

function hashCode(string, size) {
  "use strict";

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

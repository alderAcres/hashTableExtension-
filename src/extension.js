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
class HashTable {
  constructor() {
    this.SIZE = 16;
    this.storage = {};
    this.count = 0;
  }

  set(key, value) {
    this.count += 1;
    const keyValue = key;
    const index = this.hashCode(key, this.SIZE);
    if (!this.storage[index]) {
      this.storage[index] = {};
      this.storage[index][key] = value;
    } else this.storage[index][keyValue] = value;
    if (this.count / this.SIZE >= 0.75) this.resize(this.SIZE * 2);
  }

  get(key) {
    const index = this.hashCode(key, this.size);
    for (const [keys, hashObj] of Object.entries(this.storage)) {
      if (keys === index) {
        for (const [hashKey, hashVal] of Object.entries(hashObj)) {
          if (hashKey === key) return hashVal;
        }
      }
    }
    return undefined;
  }

  remove(key) {
    let value;
    const index = this.hashCode(key, this.SIZE);
    if (!this.storage[index][key]) return undefined;
    for (const [keys, vals] of Object.entries(this.storage)) {
      if (index.toString() === keys) {
        value = vals[key];
        delete vals[key];
        this.count -= 1;
      }
    }

    if (this.count / this.SIZE <= 0.25 && this.SIZE > 16) this.resize(this.SIZE / 2);
    return value;
  }

  resize(newLimit) {
    const oldStorage = this.storage;
    this.SIZE = newLimit;
    this.storage = {};
    this.count = 0;

    for (const [key, val] of Object.entries(oldStorage)) {
      if (key) {
        for (const [hashKey, hashVal] of Object.entries(val)) {
          this.set(hashKey, hashVal);
        }
      }
    }
    return this.storage;
  }

  hashCode(string, size) {
    let hash = 0;
    if (string.length === 0) return hash;
    for (let i = 0; i < string.length; i += 1) {
      const letter = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + letter;
      hash &= hash;
    }
    return Math.abs(hash) % size;
  }
}

// YOUR CODE ABOVE

// Do not remove!!
module.exports = HashTable;

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
}

const hashT = new HashTable();

HashTable.prototype.set = function (key, value) {
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash]) {
    this.storage[hash] = { [key]: value };
  } else {
    this.storage[hash][key] = value;
  }
  let counter = 0;
  let current = [];
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i] instanceof Object) {
      current = Object.keys(this.storage[i]).concat(current);
      console.log(current);
      for (let j = 0; j < Object.keys(this.storage[i]).length; j++) {
        counter += 1;
        current = Object.keys(this.storage[i]).concat(current);
      }
      // console.log(counter)
    }
  }
  console.log(current);
  if (counter > this.SIZE * 0.75) {
    this.SIZE *= 2;
  }
};

console.log(hashT.set("key", "valuez"));
console.log(hashT.set("zy", "value"));
console.log(hashT.set("huuuu", "value"));
console.log(hashT);

HashTable.prototype.get = function (key) {
  const hash = hashCode(key, this.SIZE);
  const bucket = this.storage[hash];
  console.log(bucket);
  if (bucket !== null || bucket !== undefined) {
    return bucket[key];
  }
};

HashTable.prototype.remove = function (key) {
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash] === undefined) {
    return;
  }
  delete this.storage[hash][key];
  if (Object.keys(this.storage[hash]).length === 0) {
    delete this.storage[hash];
  }
  return;
};

// console.log(hashT);
// console.log(hashT.get("key"));
// console.log(hashT.get("zy"));
// console.log(hashT.remove("zy"));
// console.log(hashT);
// console.log(hashT.remove("zy"));
// console.log(hashT);
// console.log(hashT.remove("key"));
// console.log(hashT);
// console.log(hashT.remove("key"));
// console.log(hashT);

// YOUR CODE ABOVE

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

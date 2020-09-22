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
  //console.log(this.storage)
}

HashTable.prototype.set = function (key, value) {
  let hashKey = hashCode(key, this.SIZE);
  if (!this.storage[hashKey]) {
    let obj = {};
    obj[key] = value;
    this.storage[hashKey] = obj;
    this.currentSize++;
  } else {
    this.storage[hashKey][key] = value;
    this.currentSize++;
  }
  if (this.currentSize >= 0.75 * this.SIZE) {
    this.rehash(true);
  }
};

HashTable.prototype.rehash = function (resize, size) {
  //if resize then increment double size if not this.size first digit
  resize ? (this.SIZE *= 2) : (this.SIZE = Math.ceil(this.SIZE / 2));
  this.currentSize = 0;
  let storage = this.storage;
  //console.log(storage)
  storage.forEach((obj) => {
    for (let key in obj) {
      let hashKey = hashCode(key, this.SIZE);
      if (!this.storage[hashKey]) {
        let tempObj = {};
        console.log(tempObj);
        tempObj[key] = obj[key];
        this.storage[hashKey] = tempObj;
      } else {
        this.storage[hashKey][key] = obj[key];
        this.currentSize++;
      }
    }
  });
};

HashTable.prototype.remove = function (key) {
  let value = this.get(key);
  let hashKey = hashCode(key, this.SIZE);
  if (value) delete this.storage[hashKey][key];
  if (!Object.keys(this.storage[hashKey]).length) {
    this.storage[hashKey] = undefined;
    this.currentSize--;
  }
  //if(this.currentsize <=0.25 * this.size && this.size >16)
  if (this.currentSize <= 0.25 * this.SIZE && this.SIZE > 16) {
    this.rehash(false);
  }
  return value;
};

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

const other = new HashTable();
console.log(other.set("first key", 2));
console.log(other.set("hola", "hi"));

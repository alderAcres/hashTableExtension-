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

HashTable.prototype.set = function(key, value) {
  let position = hashCode(key, this.SIZE);
  let newArray = Object.keys(this.storage[position]);
  if (newArray.length > 12) {
    let position2 = hashCode(key, this.SIZE * 2);
    if (this.storage[position] === undefined) {
      let newObj = {};
      newObj[key] = value;
      this.storage[position] = newObj;
    } else {
      this.storage[position][key] = value;
    }
  }
};

HashTable.prototype.remove = function(key) {
  let position = hasCode(key, this.SIZE);
  for (let key in this.storage[position]){
    let newArray = Object.keys[this.storage[position]]
  }

  delete this.storage[position][key];
  if (this.SIZE > 16 && ){

  }
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

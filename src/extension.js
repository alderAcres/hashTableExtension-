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
  this.SIZE = 2;
  this.REHASHED = 0; // keeps track of how many times we rehashed
  this.length = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const hashKey = hashCode(key, this.SIZE);
  if (this.storage[hashKey] === undefined) {
    const newObj = {};

    // if (new length > SIZE * .75) Double SIZE and Rehash
    const threshold = Math.floor(this.SIZE * 0.75); 
    if (this.length > threshold) {
      // Double the Size
      this.SIZE = this.SIZE * 2;
      // increment number of times rehashed
      this.REHASHED++;
      // Rehash everything
      const oldStorage = this.storage;
      this.storage = new Array(this.SIZE);
      // iterate through entire hash
      for (let item in oldStorage) {
        if (item !== undefined) {
          console.log(oldStorage[item]);
          // for every item in oldStorage[item] push into this.storage
        }
      }

    }
    newObj[key] = value;
    this.storage[hashKey] = newObj;
    this.length++;
  } else {
    if (this.storage[hashKey][key] === undefined) {
      this.storage[hashKey][key] = value;   
      this.length++;
    } else {
      this.storage[hashKey][key] = value;
    }
  }
  return this.length;
};

// Test cases
const hash = new HashTable();
console.log(hash.set(8, 'number'));
console.log(hash.set(9, 'number2'));
console.log(hash);
console.log(hash.set('A', 'letter'));
console.log(hash);
/*
console.log(hash);
console.log(hash.get(9));
console.log(hash.length);
console.log(hash.remove(9));
console.log(hash);
console.log(hash.length);
*/



HashTable.prototype.get = function(key) {
  const hashKey = hashCode(key, this.SIZE);
  console.log(hashKey);
  if (this.storage[hashKey] === undefined) return undefined;
  else if (this.storage[hashKey].hasOwnProperty(key)) return this.storage[hashKey][key];
};

HashTable.prototype.remove = function(key) {
  const hashKey = hashCode(key, this.SIZE);
  if (this.storage[hashKey] === undefined) return undefined;
  else if (this.storage[hashKey].hasOwnProperty(key)) {
    const returnValue = this.storage[hashKey][key];
    delete this.storage[hashKey][key];
    this.length--;
    return returnValue;
  }
};
// YOUR CODE ABOVE

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

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
  this.itemCount = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key, this.SIZE);
  const cap = (this.itemCount + 1) / this.SIZE;

  if (this.storage[hash] === undefined || this.storage[hash][key] === undefined) {
    if (cap > 0.75) {
      this.oldStorage = this.storage;
      this.SIZE *= 2;
      this.storage = new Array(this.SIZE);
      this.itemCount = 0;
      
      //rerun for the new value
      const hash = hashCode(key, this.SIZE);
      this.storage[hash] = {};
      this.itemCount += 1;
      this.storage[hash][key] = value;

      for (let i = 0; i < this.oldStorage.length; i++) {
        if (this.oldStorage[i] !== undefined) {
          for (const oldKey in this.oldStorage[i]) {
            this.set(oldKey, this.oldStorage[i][oldKey]);
          }
        }
      }

      return this.itemCount;
    }
  }
  

  if (this.storage[hash] === undefined) {
    this.storage[hash] = {};
  }

  if (this.storage[hash][key] === undefined) {
    this.itemCount += 1;
  }

  this.storage[hash][key] = value;

  return this.itemCount;
};

// TESTS:
const hashtest = new HashTable();
console.log(hashtest);
console.log(hashtest.set('dan', 90));
console.log(hashtest.set('dan', 95));
console.log(hashtest.set('nad', 100));
console.log(hashtest.set('anna', 91));
console.log(hashtest.set('barry', 91));
console.log(hashtest.set('carol', 91));
console.log(hashtest.set('beth', 91));
console.log(hashtest.set('ellen', 91));
console.log(hashtest.set('mary', 91));
console.log(hashtest.set('joe', 91));
console.log(hashtest.set('bob', 91));
console.log(hashtest.set('ken', 91));
console.log(hashtest.set('chris', 91));
console.log(hashtest);
console.log(hashtest.set('yeri', 91));
console.log(hashtest);


HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);

  return this.storage[hash][key];
};

HashTable.prototype.remove = function(key) {
  const hash = hashCode(key, this.SIZE);
  const cap = (this.itemCount - 1) / this.SIZE;

  if (this.storage[hash][key] !== undefined) {
    if (this.SIZE > 16 && this.cap < 0.25) {
      
    }
  }

  // if (this.storage[hash][key] === undefined) {
  //   return undefined;
  // } 

  // const deletedItem = this.storage[hash][key];
  // delete this.storage[hash][key];
  // this.itemCount -= 1;
  // return deletedItem;
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

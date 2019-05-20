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
  this.storedItems = 0;
  this.storage = new Array(this.SIZE);
}

// this nearly works, but it incorrectly keeps track of how many items are stored in the hash table because it processes rehashed items after they have been rehashed
// the storage size will grow as needed the first time we pass 75% of storage, but the double processing will cause it to grow early all subsequent times, so this needs to be fixed
HashTable.prototype.set = function(key, value) {
  if (this.storedItems + 1 >= this.SIZE * (3/4)) {
    this.SIZE *= 2;
    this.storedItems = 0;
    this.storage[this.SIZE - 1] = undefined;
    // slot represents either an empty slot or the object stored at that slot. index represents the index of the slot in the table.
    this.storage.forEach((slot, index) => {
      // if the slot is empty, we don't have to do anything with it
      if (typeof slot === 'object') {
        // if the slot contains an object, all properties at that object need to be rehashed
        const keys = Object.keys(slot);
        if (keys.length > 0) {
          keys.forEach(key => {
            // we calculate the new hashIndex based on the new size
            const hashIndex = hashCode(key, this.SIZE);
            const value = this.storage[index][key];
            delete this.storage[index][key];
            if (this.storage[hashIndex] === undefined) {
              this.storage[hashIndex] = {};
            }
            this.storage[hashIndex][key] = value;
            console.log('stored items ', this.storedItems)
            console.log({key, value})
            this.storedItems++;
          });
        }
      }
    });
  }
  const hashIndex = hashCode(key, this.SIZE);
  if (this.storage[hashIndex] === undefined) {
    this.storage[hashIndex] = {};
  }
  this.storage[hashIndex][key] = value;
  this.storedItems++;
};

HashTable.prototype.get = function(key) {
  const hashIndex = hashCode(key, this.SIZE);
  return this.storage[hashIndex][key];
};

HashTable.prototype.remove = function(key) {
  const hashIndex = hashCode(key, this.SIZE);
  if (!this.storage[hashIndex].hasOwnProperty(key)) {
    return undefined;
  }
  delete this.storage[hashIndex][key];
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

const table = new HashTable();
table.set('firstname', 'max');
table.set('lastname', 'gonzalez');
table.set('mother', 'lisa');
table.set('father', 'luciano');
table.set('brother', 'henry');
table.set('pet', 'olive');
table.set('pet type', 'doggy');
table.set('school', 'uci');
table.set('mascot', 'anteater');
table.set('degrees', 'english and spanish');
table.set('graduated', '2017');
table.set('born', '1995');
console.log(table);
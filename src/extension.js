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
  this.numStored = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  let hash = hashCode(key, this.SIZE);
  if ((this.numStored / this.SIZE) < .75) {
    if (!this.storage[hash]) {
      this.storage[hash] = {};
    }
    if (this.storage[hash][key]) this.numStored--;
    this.storage[hash][key] = value;
    this.numStored++;
  } else {
    this.SIZE = this.SIZE * 2;
    let temp = new Array(this.SIZE);
    for (let i = 0; i < this.storage.length; i++) {
      temp[i] = this.storage[i];
    }
    this.storage = temp;
    if (!this.storage[hash]) {
      this.storage[hash] = {};
    }
    if (this.storage[hash][key]) this.numStored--;
    this.storage[hash][key] = value;
    this.numStored++;
  }
};

let test = new HashTable();
test.set('a', true);
test.set('b', true);
test.set('c', true);
test.set('d', true);
test.set('e', true);
test.set('f', true);
test.set('g', true);
test.set('h', true);
test.set('i', true);
test.set('j', true);
test.set('k', true);
console.log(test.numStored);
test.set('l', true);
console.log(test.numStored);
console.log(test.SIZE);
test.set('m', true);
console.log(test.numStored);
console.log(test.SIZE);
console.log(test);
test.set('n', true);
console.log(test.numStored);
console.log(test);
test.set('ab', 'hi');
console.log(test.numStored);
console.log(test);

HashTable.prototype.get = function(key) {
  let hash = hashCode(key, this.SIZE);
  return (!this.storage[hash] || !this.storage[hash][key]) ? 'Key does not exist in the hash table' : this.storage[hash][key];
};
console.log(test.get('ab'));
console.log(test);
console.log(test.numStored);


HashTable.prototype.remove = function(key) {
  let hash = hashCode(key, this.SIZE);
  if (!this.storage[hash] || !this.storage[hash][key]) {
    return 'Key does not exist in the hash table';  
  } 
  let cache = this.storage[hash][key];
  delete this.storage[hash][key];
  this.numStored--;
  return cache;
}
console.log(test.remove('ab'));
console.log(test.remove('a'));
console.log(test.remove('a'));
console.log(test);


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

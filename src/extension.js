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
  this.SIZE = 5;
  
  this.storage = new Array(this.SIZE);
}
// If adding the new item will push the number of stored items to over 75% of
// the hash table's SIZE, then double the hash table's SIZE and rehash everything

// if curr length of storage obj + 1 is greater than 75% of storage length, rehash 
HashTable.prototype.set = function(key, value) {
  const idx = hashCode(key, this.SIZE);
  // check if adding new item will increase storage
  const numOfObjs = Object.keys(this.storage); 
  if ((!this.storage[idx]) && (((numOfObjs.length) + 1) > ((this.storage.length) * .75))) {
    this.storage = new Array(this.SIZE * 2)
  }
  if (this.storage[idx]) {
    this.storage[idx][key] = value;
  } else {
  this.storage[idx] = {};
  this.storage[idx][key] = value;
  }
};

HashTable.prototype.get = function(key) {
  // declar a var to hold indx of input key
  const idx = hashCode(key, this.SIZE);
  // returns value of key
  return this.storage[idx][key]
};

HashTable.prototype.remove = function(key) {
  // declar a var to hold indx of input key
  const idx = hashCode(key, this.SIZE);
  // return undefined if key doesn't exist
  if (!this.storage[idx][key]) return undefined;
  // if key exists, delete key from storage
  delete this.storage[idx][key];
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

 const newHash = new HashTable();
console.log(newHash.storage.length)
newHash.set('A', 'apple')
console.log(Object.keys(newHash.storage))
newHash.set('D', 'dandy')
console.log(newHash.storage)
console.log(Object.keys(newHash.storage))
newHash.set('Ddd', 'derp')
console.log(newHash.storage.length)
newHash.set('Hellohellotest', 'zzz')
newHash.set('Testing', 'zzzbabb')
console.log(newHash)
console.log(newHash.storage.length)
// console.log(Object.keys(newHash.storage))
// console.log(newHash.get('D'))

// Do not remove!!
module.exports = HashTable;

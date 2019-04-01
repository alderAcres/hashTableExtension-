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
    const newObj = {};
    let index = hashCode(key, this.SIZE);
    let result = this.storage[index];
    let storageSize = Math.floor(this.SIZE * .25);
    
    if(!this.storage[index]) {
      newObj[key] = value;
      this.storage[index] = newObj;
    } else {
      result[key] = value;
    }

    let filled = this.storage.filter(el => el);
    console.log(filled);
    if(filled.length >= storageSize) {
      this.SIZE = this.SIZE * 2;
    }
    return this.storage;
};
// let hash = new HashTable;
// console.log(hash.set('j', 5));
// console.log(hash.set('j', 5));
// console.log(hash.set('s', 8));
// console.log(hash.set('f', 5));
// console.log(hash.set('d', 5));
// console.log(hash.set('e', 5));
// console.log(hash.set('w', 5));
// console.log(hash.set('js', 5));
// console.log(hash.set('ja', 5));
// console.log(hash.set('jm', 5));
// console.log(hash.set('jn', 5));
// console.log(hash.set('jb', 5));
// console.log(hash.set('jv', 5));
// console.log(hash.set('q', 5));
// console.log(hash.set('r', 5));
// console.log(hash.set('t', 5));
// console.log(hash.set('y', 6));
// console.log(hash.set('u', 5));
// console.log(hash.set('i', 5));

// console.log(hash)



HashTable.prototype.get = function(key) {
    const hashFunc = hashCode(key, this.SIZE);
    let result = this.storage[hashFunc];
    if(Object.keys(result).length > 1) {
      return result[key];
    }
    return result[key];
};

HashTable.prototype.remove = function(key) {
    const hashFunc = hashCode(key, this.SIZE);
    let result = this.storage[hashFunc];
    let deleteKey = result[key];
    if(!result[key]) {
      return undefined;
    }
    delete result[key];

    let filled = this.storage.filter(el => el) 
    if(this.storage.length > 16 && Math.floor(this.storage.length/4) > filled.length) {
      this.SIZE = this.SIZE/2;
    }
};

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

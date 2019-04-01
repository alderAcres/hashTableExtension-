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
  this.count = this.SIZE;
}

HashTable.prototype.set = function (key, value) {
  const hashKey = hashCode(key, this.SIZE);
  const obj = {};
  obj[key] = value

  if (this.count === this.SIZE - (this.SIZE * 0.75)) {
    this.SIZE = this.SIZE * 2;
    }

  if (this.storage[hashKey] === undefined) {
    this.storage[hashKey] = obj;
    this.count--;
  } else {
    Object.assign(this.storage[hashKey], obj);
  }
}

const hash = new HashTable();
console.log(hash);
hash.set('a', 1);
console.log(hash);
hash.set('b',2)
hash.set('c',3)
hash.set('d',4)
hash.set('e',5)
hash.set('f',6)
hash.set('g',7)
hash.set('h',8)
hash.set('i',9)
hash.set('j',10)
hash.set('k',11)

console.log(hash);
console.log(hash.SIZE)

hash.set('l',12) 
console.log(hash);
console.log(hash.SIZE)
hash.set('m',13)

console.log(hash);
console.log(hash.SIZE);
// hash.set('n',14)
// hash.set('o',15)
// hash.set('p',16)










HashTable.prototype.get = function(key) {
  const hashKey = hashCode (key, this.SIZE);
  if(this.storage[hashKey]) {
    return this.storage[hashKey][key];
  } else {
    return 'The value for this key is not stored in this HashTable.'
  }
};


HashTable.prototype.remove = function(key) {
  const hashKey = hashCode (key, this.SIZE);
  const removedVal = this.storage[hashKey][key];
  if (this.storage[hashKey][key]) {
    delete this.storage[hashKey][key];
    return removedVal;
  } else {
  return undefined;
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

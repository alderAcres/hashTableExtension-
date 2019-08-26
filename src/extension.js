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
  this.index = 0;
}

HashTable.prototype.set = function(key, value) {
  let hashed = hashCode(key, this.SIZE);
  if(this.storage[hashed] === undefined) this.storage[hashed] = {[key] : value};
  if(this.storage[hashed][key] === undefined) {
  this.storage[hashed][key] = value;
  this.index++;
  }
  if (this.index >= this.SIZE*0.75) {
    this.SIZE = this.SIZE*2;
    this.rehash();
  }
  return this.index;
};

HashTable.prototype.get = function(key) {
  let hashed = hashCode(key, this.SIZE);
  return this.storage[hashed][key];
};

HashTable.prototype.remove = function(key) {
  let hashed = hashCode(key, this.SIZE);
  delete this.storage[hashed][key];
  if (this.storage >= 16 && this.index <= this.SIZE*0.25) {
    this.SIZE = this.SIZE/2;
    this.rehash();
  }
};
HashTable.prototype.rehash = function(num) {
  this.storage.forEach(val => {
    for (let key in  val) {
      let hashKey = hashCode(key, this.SIZE);
      if (!this.storage[hashKey]) {
        let tempval = {};
        tempval[key] =  val[key];
        this.storage[hashKey] = tempval;
        this.index;
      } else {
        this.storage[hashKey][key] =  val[key];
        this.index;
      }
    }
  });
}

// let hased = new HashTable();
// hased.set(8,'d');
// console.log(hased.set(7,'b'));
// console.log(hased);
// console.log(hased.set('a','b'));
// console.log(hased.set('b','b'));
// console.log(hased.set('c','b'));
// console.log(hased.set('d','b'));
// console.log(hased.set(7,'b'));
// console.log(hased.set(7,'b'));
// console.log(hased)
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

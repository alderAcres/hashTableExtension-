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
  this.count = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.rehash = function(){
  let newArr = new Array(this.SIZE);
  let old = this.storage;
  old.forEach((obj) => {
    if (obj !== undefined) {
      for (var key in obj) {
        let newkey = hashCode(key, this.SIZE);
        if (!newArr[newkey]) {
          let tempobj = {};
          tempobj[key] = obj[key];
          newArr[newkey][key] = tempobj;
        } else {
          newArr[newkey][key] = obj[key];
        }
      }
    }
  })
  this.storage = newArr;
}

HashTable.prototype.set = function(key, value) {
  let index = hashCode(key, this.SIZE);
  if (this.count >= Math.ceil(this.SIZE*0.75)) {
    this.SIZE = this.SIZE*2;
    this.rehash();
  }
  if (this.storage[index] === undefined) {
    let obj = {};
    obj[key] = value;
    this.storage[index] = obj;
  } 
  else {
    this.storage[index][key] = value;
  }
  this.count++;
  return this.count;
};

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);

  return this.storage[index][key];
};

HashTable.prototype.remove = function(key) {
  if (this.SIZE > 16 && (this.count-1) < Math.ceil(this.SIZE*0.25)) {
    this.SIZE = this.SIZE*0.5; 
    this.rehash();
  }

  let index = hashCode(key, this.SIZE);

  this.count--;

  if (this.storage[index][key]) {
    let temp = this.storage[index][key];
    delete this.storage[index][key];
    return temp;
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

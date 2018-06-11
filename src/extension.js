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
  this.length = 0;
}

HashTable.prototype.set = function(key, value) {
  let location = new hashCode(key, this.SIZE), orgSize = this.SIZE;
  this.length += 1; 
  
  if (this.length / orgSize > 0.75 ){
    this.SIZE = this.SIZE * 2;
    for (let i = 0; i < orgSize; i++){
      if (this.storage[i] !== undefined){
        let currentObj = this.storage[i];
        delete this.storage[i];
        location = new hashCode(key, this.SIZE);
        this.storage[location] = currentObj;
      }
    }
    location = new hashCode(key, this.SIZE);
  }

  if (this.storage[location] === undefined){
    this.storage[location] = {}
  }
  this.storage[location][key] = value;
};


HashTable.prototype.get = function(key) {
  let location = new hashCode(key, this.SIZE); 
  return this.storage[location][key];
};


HashTable.prototype.remove = function(key) {
  
  let location = new hashCode(key, this.SIZE), orgSize = this.SIZE;
  let val = this.storage[location][key];
  delete this.storage[location][key];
  this.length -= 1;

  if (this.length / this.SIZE < 0.25){
    this.SIZE = this.SIZE / 2;
    for (let i = 0; i < orgSize; i++){
      if (this.storage[i] !== undefined){
        let currentObj = this.storage[i];
        delete this.storage[i];
        location = new hashCode(key, this.SIZE);
        this.storage[location] = currentObj;
      }
    }
  }  
  return val;
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


// let hashTable = new HashTable();
// hashTable.set('first key', 'first value');
// hashTable.set('second key', 'second value');
// hashTable.remove('first key');

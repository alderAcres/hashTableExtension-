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
  this.currentSize = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.rehashUp = function () {
  this.SIZE * 2;
  let storage = this.storage;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.rehashDown = function () {
  Math.ceil(this.SIZE / 2);
  let storage = this.storage;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.reinput = function () {
  this.storage.forEach((ele)=>{
    for(let k in ele){
      if(k !== undefined){
        let hashKey = hashCode(ele[k], this.SIZE);
        this.set(ele[k]);
      }
    }
  })
}

HashTable.prototype.set = function(key, value) {
  let hashKey = hashCode(key, this.SIZE);

  if(!this.storage[hashKey]) {
    this.storage[hashKey] = {};
    this.storage[hashKey][key] = value;
    this.currentSize++
  } else {
    this.storage[hashKey][key] = value; 
    this.currentSize++;
  }
  if(this.currentSize > 0.75 * this.SIZE){
    this.rehashUp();
    this.set();
    this.reinput();
  }
};

HashTable.prototype.get = function(key) {
  let hashKey = hashCode(key, this.SIZE);
  return this.storage[hashKey][key];
 };

 HashTable.prototype.remove = function(key) {
  let hashKey = hashCode(key, this.SIZE);
  let saved = this.storage[hashKey][key];
  delete this.storage[hashKey][key];
  this.currentSize--;
  if(this.currentSize <= 0.25 * this.SIZE && this.SIZE > 16){
    this.rehashDown();
    this.reinput();
  }
  return saved;
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

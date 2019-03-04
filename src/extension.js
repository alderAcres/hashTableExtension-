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
  if (this.storage[hash]) this.storage[hash][key] = value; 
  else {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }
  // checking for new size and increasing SIZE property if value count is more than 75%
  let counter = 0;
  this.storage.forEach((element) => {
    if (element) {
      counter++
    }
  });
  if (1.0*counter/this.SIZE > this.SIZE*0.75) {
    this.SIZE = this.SIZE * 2;
    //rehashing all data for new size
    this.storage.forEach((value, key) => {
      if (element){
        this.set(key, value);
        this.remove(key);
      }
    });
  }
};

  HashTable.prototype.get = function(key) {
    const hash = hashCode(key, this.SIZE);
    return this.storage[hash][key];
  };

  HashTable.prototype.remove = function(key) {
    const hash = hashCode(key, this.SIZE);
    let removedValue = this.storage[hash][key];
    delete this.storage[hash][key];
    let counter = 0;
    // checking for new size and reducing SIZE property if value count is less than 25%
    this.storage.forEach((element) => {
      if (element) {
        counter++
      }
    });
    if (1.0*counter/this.SIZE < this.SIZE*0.25 && this.SIZE > 32){
      this.SIZE = this.SIZE / 2;
      //rehashing all data for new size
      this.storage.forEach((value, key) => {
        if (element){
          this.set(key, value);
          this.remove(key);
        }
      });
    }
    return removedValue; 
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

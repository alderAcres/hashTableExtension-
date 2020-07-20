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
  this.SIZE = 16; // number of total buckets
  this.currSIZE = 0 // this is the number of buckets that have an obj in it.
  this.storage = new Array(this.SIZE);
}
HashTable.prototype.set = function(key, value) {
  const bucket = hashCode(key,this.SIZE);
  if (!this.storage[bucket]) {
    this.storage[bucket] = {};
    this.currSIZE++ // if we need to fill another bucket, incr currSIZE
  }
  this.storage[bucket][key] = value;
  //after we store new keyval Arrfill >75%
  if(this.currSIZE/this.SIZE > 0.75) {
    //resize: make new arr with double this.SIZE
    this.SIZE*=2
    //rehash 
    HashTable.prototype.rehash;
  }
};
HashTable.prototype.remove = function(key) {
  const bucket = hashCode(key,this.SIZE);
  const removed = this.storage[bucket][key]; //store item to be returned later
  delete this.storage[bucket][key];
  if (this.storage[bucket] === {}) {
    this.storage[bucket] = undefined;
    this.currSIZE--; // decrement current size if the bucket is now empty
  }
  if(this.currSIZE/this.SIZE<0.25 && this.SIZE>16) { // if less that 25% buckets are filled and this.SIZE >16
    this.SIZE/=2; // we will resize to half 
    HashTable.prototype.rehash; //then rehash
  }
  return removed;
};
HashTable.prototype.rehash = function () {
  const tempStorage = this.storage //store current this.storage in a tempArray.
  this.storage = new Array(this.SIZE) // create new this.storage with updated this.SIZE;
  const bucket = hashCode(key,this.SIZE); //hash function
  tempStorage.forEach(obj => {
  //not sure if i can just call the set function. for each key
    for (let key in obj) { 
      if (!this.storage[bucket]) {
        this.storage[bucket] = {};
      }
      this.storage[bucket][key] = obj[key]
    }
  })
}


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

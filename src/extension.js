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

//--------------------------------------------------------------

function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
};

//--------------------------------------------------------------

HashTable.prototype.set = function(key, value) {
// if adding new item will push number of stored items to over 75% of hash tables size then double the hash tables size and rehash everything 

  if(this.storage[hashCode(key, this.SIZE)]){
    this.storage[hashCode(key, this.SIZE)][key] = value; 
  } else {
    let hashObj = {};
    hashObj[key] = value; 
    this.storage[hashCode(key, this.SIZE)] = hashObj; 
  }
};

//---------------------------------------------------------------

HashTable.prototype.get = function(key) {
  if(this.storage[hashCode(key, this.SIZE)]){
    return this.storage[hashCode(key, this.SIZE)][key]
  } else {
    return;
  }
};

//---------------------------------------------------------------

HashTable.prototype.remove = function(key) {
  if(this.storage[hashCode(key, this.SIZE)]){
// if the hash tables size is greater than 16 and the result of removing the item drops the number of stored items to be less than 25% of the hash tables size (rounding down), then reduce the hash tables size by half and rehash everything 

// check if size is greater than 16 
    if(this.SIZE > 16){

// if so create empty object counter, iterate over hash table and check if each value is undefined 
// then check if emptyObj counter is less than 1/4 of this.SIZE. IF SO... 
// check if removing the item drops the number of stored items to be less than 25% of the hash Table size 
// (rounding down) IF SO ...
// create deleted object counter (delObjCounter), Delete half of the undefined (empty object) values by iterating through hash table and deleting an object if it is undefined or empty and increment the delObjCounter, change this.size to half of its current size 
// iterate over the remaining values 
    }
  
    let removed = this.storage[hashCode(key, this.SIZE)][key];
    delete this.storage[hashCode(key, this.SIZE)][key];
    return removed; 
  } else {
    return; 
  }
};

//---------------------------------------------------------------

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

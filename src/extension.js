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
function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.currentSize = 0;
}
//doubling the hash table size = 2*16 = 32 
// PASTE AND MODIFY YOUR CODE BELOW
HashTable.prototype.set = function(key, value) {
  //find the index from the function hashCode - where in array to store the value - hash the key to find index
  let index = hashCode (key, this.SIZE)
  //if you don't see that address of the key
  if (!this.storage[index]) {
  //the object storage at that string get no value which is empty object 
  this.storage[index] = {} ; }
  //if you find the string the assign the value to the string key - hashed index contains key/value pair
  this.storage[index][key] = value ;
  //if the provided key has already been used then overwrite value at index with new value
  // this.storage[index] = value;
  //return the hashed address where you set the key-value pairs
  return index;
  this.currentSize += 1;
  if(this.currentSize >= 0.75 * this.SIZE) {
  this.rehash();
  }

  HashTable.prototype.rehash = function(size) {
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);
    this.currentSize = 0;
    let storage = this.storage;
    storage.forEach( obj => {
      for( let key in obj) {
        let index = hashCode (key, this.SIZE);
        if(!storage[index]) 
        {let temporaryobject = {};}
        //sorry ran out of time just gonna repeat same set/add process or collisions and non collisions
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

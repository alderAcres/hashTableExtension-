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

const HashTable = require("./main");

// PASTE AND MODIFY YOUR CODE BELOW

HashTable.prototype.set = function(key, value) {

  let hashIndex = hashCode(key, this.SIZE);

  if(!this.storage[hashIndex]) {
    this.storage[hashIndex] = {};
    this.count++;
  } else {
    this.storage[hashIndex][key] = value;
    this.count++;
  }

  if (this.count >= 0.75 * this.SIZE) this.rehash();

};

//couldnt finish this bit here
HashTable.prototype.remove = function(key) {

  let hashIndex = hashCode(key, this.SIZE);
  let element = this.storage[hashIndex][key];
  
  delete this.storage[hashIndex][key];
  this.count--;

  return element;

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

HashTable.prototype.rehash = function(size) {
  this.SIZE *= 2;       //double up the size of hashtable (16 x 2)
  this.count = 0;       //set counter 

  let storage = this.storage;   //copy over everything from this.storage to storage
  this.storage = new Array(this.SIZE);    //set new storage to the new size (32)

  storage.forEach(obj => {    //loop over each object inside the hashtable array 
    for (let key in obj) {
      let hashIndex = hashCode(key, this.SIZE);
      if (!this.storage[hashIndex]) {       //if index is empty, create object, assign key-values
        let tempObj = {};
        tempObj[key] = obj[key];
        this.storage[hashIndex] = tempObj;
        this.count++;                       //keep track of the size of the hashtable
      } else {
        this.storage[hashIndex][key] = obj[key];    //else replace values to the key
        this.count++;
      }
    }
  });

}

// Do not remove!!
module.exports = HashTable;

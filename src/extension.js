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
  this.amount = 0
  this.storage = new Array(this.SIZE);
}
 const hash = new HashTable();

HashTable.prototype.set = function(key, value) {
  // create a const that is the result of the hashCOde with key passed in as it string param and this.size as size param
  const hashNum = hashCode(key, this.SIZE)
  // if amount prop is greater than 75% of size prop then double size prop
  if (this.amount > (this.size * .75)) this.size *= 2 
// if the hashNum index is empty make its value a empty object 
  // increase amount property by 1
  if (!this.storage[hashNum]) {this.storage[hashNum] = {}; this.amount++}
  // store key and val as a pair inside of the object at the hashNum index
  this.storage[hashNum][key] = value
};

HashTable.prototype.remove = function(key) {
  if (this.size > 16 && this.amount < (this.size * .25)) this.size /= 2;
  // create a const that is the index in the array at which the key : val pair resides
  const hashNum = hashCode(key, this.SIZE);
  // create a const that is the value associated with the key at the stoarge array's hashnum index
  const keep = this.storage[hashNum][key];
  // delete this hashNum property from the storage array 
  delete this.storage[hashNum][key]  
  // return keep
  return keep
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

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

  this.count = 0
}

HashTable.prototype.set = function(key, value) {

  //if count+1 is > 75% of this.SIZE
  if (count + 1 > this.SIZE * .75){
    //double this.SIZE
    this.SIZE = this.SIZE * 2;

    //&rehash everything thats already in the table
    this.storage.forEach( func = (ele, index) =>{
      
    })

  }
  
  let index = hashCode(key, this.SIZE);
  let count = 0;

  if (!this.storage[index]) this.storage[index] = {};

  this.storage[index][key] = value;
 
  this.count++;
  return this.count;

};

HashTable.prototype.get = function(key) {
  
  let index = hashCode(key, this.SIZE);
  
  return this.storage[index][key];

};

HashTable.prototype.remove = function(key) {

let index = hashCode(key, this.SIZE);

if(!this.storage[index][key]) return undefined;

let rmvVal = this.storage[index][key];

delete this.storage[index][key];

this.count--;

return rmvVal;

};


// Do not modify
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


const testHash = new HashTable;

testHash.set(1, "A");
testHash.set(2, "B");


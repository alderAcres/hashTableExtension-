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
  // count keeps track of elements and if 75% or more of the elements are not undefined, then we will double the size of the hashTable
  let count = 0;
  // iterate through the storage array

  // the location of the hash table is the output of the function passed in with the key and size of the hash table
  let location = hashCode(key, this.SIZE);
  // if the location is empty/undefined, create an obj inside the location and pass in the key, val pair; this will avoid collisons with similar values
  if (!this.storage[location]) {
    this.storage[location] = {};
    this.storage[location][key] = value;
  } else {
    // if something does exist in this obj, include the key, val pairs that were passed in the argument
    this.storage[location][key] = value;
  }
};
let hash = new HashTable();
console.log(hash.set('Edwin','awesome')); 
console.log(hash.set('dann','awesome')); 
console.log(hash);


HashTable.prototype.remove = function(key) {
  // search for the location of the key
  let location = hashCode(key, this.SIZE);
  // will keep track if a key exists
  let count = 0;
 // iterate through obj and check to see if the key passed in exists
  for (let prop in this.storage[location]) {
    if (key === prop) {
      // if the count remains 0, then the key does not exist in the hash table
      count++;
    }
  }
   // if key does not exist in the storage obj return undefined
  if (!count) return;
  let remvoedItem = this.storage[location][key];
  delete this.storage[location][key];
  return remvoedItem;
};
console.log(hash.remove('Edwin'));
console.log(hash.remove('george'));
console.log(hash);


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

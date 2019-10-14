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
  this.items = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  let hashKey = hashCode(key, this.SIZE);
  if (!this.storage[hashKey]) { //if it doesnt exist
    let obj = {};
    obj[key] = value; //create new obj to store
    this.storage[hashKey] = obj; //is this.SIZE affected?
    // return this.items+=1;
  } else { //create object, adds one item to the HashTable
    this.storage[hashKey][key] = value;
    // return this.items+=1;
  }
  //resize after we put it in- basically check the count, then if it is greater than 75%, double the abailable space
  //can i put this after the if statements above?
  if (this.items >= .75 * this.SIZE) {
    this.SIZE *= 2;
    this.items = 0;
  }
};

// If the hash table's SIZE is greater than 16 and the result of removing the
// item drops the number of stored items to be less than 25% of the hash table's SIZE
// (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
HashTable.prototype.remove = function(key) {
  let hash = this.storage[hashCode(key, this.SIZE)]
  if (this.SIZE > 16 && this.items < .25 * this.SIZE) {
    this.SIZE /= 2;
  }
  if (hash[key]) {
    let output = hash[key];
    delete hash[key];
    this.items-=1;
    return output;
  } else {
    return hash[key]; //should just be undefined
  }
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

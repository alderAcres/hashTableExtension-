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
  this.storage[key] = value;
  let counter = 0;
  //count number of items stored in the hash table
  for (let i = 0; i < this.SIZE; i++){
    if (this.storage[i]) {
      counter++
    }
  }
  //if the counter is greater than 75% of the hash table's size, 
  if (counter > .75 * this.SIZE) {
      //double this.SIZE
      this.SIZE *= 2;
      //rehash
      HashTable();
  }
  return counter++;
};


HashTable.prototype.get = function(key) {
  return this.storage[key];
};

HashTable.prototype.remove = function(key) {
  //save element at given space as temp variable
  let temp = this.storage[key];
  //delete element at given space
  delete this.storage[key];
  //return temp variable
  //determine size of hashtable
  for (let i = 0; i < this.SIZE; i++){
    if (this.storage[i]) {
      counter++
    }
  //if SIZE is greater than 16 AND counter is less than 25% of SIZE (math.floor)
  if ((this.SIZE > 16) && (counter < Math.floor(.25 * this.SIZE))) {
    // reduce the hash table's SIZE by 1/2  
    this.SIZE /= 2;
    //rehash
    HashTable();
  }
  return temp;
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

// Do not remove!!
module.exports = HashTable;


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

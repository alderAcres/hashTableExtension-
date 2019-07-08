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
  // //check if over 75% full
  // if((this.items+1)/this.SIZE > .75){
  //   //double hash table's size
  //   this.SIZE = this.SIZE*2;
  //   //rehash everything
  //   for(let i = 0; i < this.storage.length; i++){
  //     //need to access all previous keys to rehash them
  //     //this.set()
  //   }

  }
  //pass key into hash function to generate index
  let hashedIndex = hashCode(key,this.SIZE);
  //set value at hash index equal to value arg
  this.storage[hashedIndex] = value;
  //increment item count
  this.items++;
  //return number of items
  return this.items;
};

HashTable.prototype.get = function(key) {
  //get hashed index
  let hashedIndex = hashCode(key,this.SIZE);
  //return value at hashedIndex
  return this.storage[hashedIndex];
};

HashTable.prototype.remove = function(key) {
  //get hashed index
  let hashedIndex = hashCode(key,this.SIZE);
  //save value at hashedIndex
  let val = this.storage[hashedIndex];
  //remove value from storage
  delete this.storage[hashedIndex];
  //decrement item count
  this.items--;
  //return value
  return val;
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

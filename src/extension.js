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

//Hash Table Resizing if too big or too small;
HashTable.prototype.set = function(key, value) {
let index = hashCode(key, this.SIZE);
let space = this.Size; //storage current size.

  if(this.storage[index]) {
  //if index exists, set index with key to equal value
  this.storage[index][key] === value;
  //space increases after every set;
  space++;
  } else {
    //else set that index as an empty obj.
    this.storage[index] = {};
    //store value into object key at given index.
    this.storage[index][key] = value;
    //space increases;
    space++;
  }
  //if our space exceeds 75%;
  if(space >= (this.Size * (1/4)) {
    //we set original this.Size * 2 to newSpace variable.
    newSpace = this.Size * 2;
    //set this.stroage to new Array with new Space.
    this.storage = new Array(newSpace);
    //after we set storage to new Array length, we have to rehash.
    let newIndex = hashCode(key, newSpace);
  }
};

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);
  console.log(this.storage[index][key]);
  return this.storage[index][key];
};

HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  if(!this.storage[index]) {
    return undefined;
  } else {
    let value = this.storage[index][key];
    delete this.storage[index][key];
    return value;
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

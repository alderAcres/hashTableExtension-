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
  let itemNum = 0;

  // if (this.storage.reduce(acc, curr) => if (curr != null) acc++)

  // for (let i = 0; i < this.SIZE; i++) {
  //   if (this.storage[i]) itemNum++;
  // }

  // if ((itemNum / this.SIZE) * (4 / 3) >= 1) {
  //   let itemArr = this.storage.filter(el => el != null);
  //   this.SIZE = this.SIZE * 2;
  //   for (let i = 0; i < itemArr.length; i++) {

  //     this.set(itemArr[i])
  //   }
  // }


  let itemsStored = 0;
  let index = hashCode(key, this.SIZE);

  if (!this.storage[index]) {
    this.storage[index] = {};
  };

  this.storage[index][key] = value;

  for (let i = 0; i < this.SIZE; i++) {
    if (this.storage[i] != null) {
      let keys = Object.keys(this.storage[i]);
      itemsStored += keys.length;
    }
  };

  return itemsStored;
};

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);

  return this.storage[index][key];
};

HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  let returnVal = this.storage[index][key];

  delete this.storage[index][key];

  for (let i = 0; i < this.SIZE; i++) {
    let el = this.storage[i];
    if (el && Object.keys(el).length === 0) {
      delete this.storage[i];
    }
  }

  return returnVal;
};

let newHash = new HashTable;
console.log(newHash);
newHash.SIZE = 32;
newHash.storage.length = newHash.SIZE;
console.log(newHash);




console.log(newHash.set('published first:', 'the pig and the pony'));
console.log(newHash.set('published second:', 'pink corn moon'));
console.log(newHash.get('published first:', 'the pig and the pony'));
console.log(newHash.get('published second:', 'pink corn moon'));
console.log(newHash);
let itemArr = newHash.storage.filter(el => el != null);
console.log(itemArr)
console.log(newHash.remove('published first:', 'the pig and the pony'));
console.log(newHash);
console.log(newHash.remove('published second:', 'pink corn moon'));
console.log(newHash);

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

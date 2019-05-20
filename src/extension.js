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

HashTable.prototype.set = function (key, value) {
  // locate hash address from our hashcode function
  const addy = hashCode(key, this.SIZE);
  // create an object and add its keys and value
  const obj = {};
  obj[key] = value;
  // if the address is undefined, then we can set our obj in the address
  if (this.storage[addy] === undefined) {
    this.storage[addy] = obj;
  } else {
    // else, if already defined. we will overwrite the key value
    this.storage[addy][key] = value;
  }
  // check if our size is over 75% then we will double the size and re-hash
  // iterate through our hash array to count undefined slots, if this.size divided by undefined count then recurse with our size doubled
  let sizeCount = 0;
  for (let i = 0; i < this.SIZE; i += 1){
    if (this.storage[i] != undefined){
      sizeCounter += 1;
    }
  }
  if (sizeCount / this.SIZE >= .75){
    this.SIZE *= 2;
    return HashTable.prototype.set(key,value)
  }
};



HashTable.prototype.remove = function (key) {
  // locate address using our hashcode
  const addy = hashCode(key, this.SIZE);
  // loop in our our obj, if the key of our obj matches our key arg, then remove
  for (let objKey in this.storage[addy]) {
    if (objKey == key) {
      delete this.storage[addy][objKey];
    }
  }
  // if our hash size is greater than 16 loop through our array with a counter to count how many undefined
  // if the number of undefined is greater than 75% , which means we have less than 25% of storage. reduce our size and recurse
  let sizeCount = 0;
  if (this.SIZE > 16){
    for (let i = 0; i < this.SIZE; i += 1){
      if (this.storage[i] == undefined){
        sizeCount += 1;
      }
    }
    if (sizeCount / this.SIZE >= .75){
      this.SIZE = this.SIZE / 2;
      return HashTable.prototype.remove(key,value);
    }
  }
  // else, return undefined
  return undefined;
};


// const test = new HashTable();


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

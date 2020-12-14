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
  this.items = 0;
}

HashTable.prototype.set = function(key, value) {
  //run the key through the hashCode function to determine the index
  const obj = this.storage;
  const index = hashCode(key, this.SIZE);

  if (this.items > (this.SIZE * 3 / 4)){
    //double the size of this.SIZE
    this.SIZE *= 2;
    this.items = 0;
    //create a new storage array
    this.newStorage = new Array(this.SIZE);
    //loop over every index of the old storage array
    this.storage.forEach(obj = {
      if (typeof obj === 'object') {
      //if the element is an object loop over every key value pair
        //run each key through the hashcode function
        //create an object, if it doesnt exist
        //add that key value to that index
      }
    });

  } else {
    if (obj[index] === undefined) obj[index] = {};
    obj[index][key] = value;
    this.items += 1;
    return this.items;
  }

};

HashTable.prototype.get = function(key) {
  //run the key through the hashCode function to determine the index
  const obj = this.storage;
  const index = hashCode(key, this.SIZE);

  if (obj[index] === undefined) return undefined;
  if (key in obj[index]) return obj[index][key];
  else return undefined;

};

HashTable.prototype.remove = function(key) {
  //run the key through the hashCode function to determine the index
  const obj = this.storage;
  const index = hashCode(key, this.SIZE);

  if (obj[index] === undefined) return undefined;
  if (obj[index][key]) {
    const deletedValue = obj[index][key];
    delete obj[index][key];
    this.items -= 1;
    return deletedValue;
  }
  return;;
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

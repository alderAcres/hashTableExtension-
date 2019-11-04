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
  this.SIZE = 4;
  this.counter = 0
  this.rehashed = false
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {

  let ratio = (this.counter/this.SIZE)
  if (ratio >= 0.75 && this.rehashed ===false){
    
    this.SIZE = this.SIZE*2;
    console.log(this.storage)
    for (let keys in this.storage){
      console.log(this.storage[keys])
    }


    this.storage = new Array(this.SIZE)
    console.log(this.storage)
    this.rehashed = true


  }


  let hashKey = hashCode(key, this.SIZE)

  if (this.storage[hashKey] === undefined) {
    let hashKeyObj = {};
    this.counter ++;
    this.storage[hashKey] = hashKeyObj
    this.storage[hashKey][key] = value
  }
  else {
    this.storage[hashKey][key] = value;
  }
};

HashTable.prototype.get = function(key) {
  let hashKey = hashCode(key, this.SIZE)
  for (let keys in this.storage[hashKey]) {

    if (keys === key) {
      return this.storage[hashKey][key]
    }
  }
  return "no value found with that given key";
};

HashTable.prototype.remove = function(key) {
  let hashKey = hashCode(key, this.SIZE)
  for (let keys in this.storage[hashKey]) {
    if (keys === key) {
      delete this.storage[hashKey][key];
      return "item deleted";
    }
  }
  return "no value found with that given key AKA undefined";
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


let HT = new HashTable();

HT.set("key1", "value1")
HT.set("key2", "value1")
HT.set("key3", "value1")
HT.set("key3", "value1")
console.log(HT.storage)






console.log(HT)



// Do not remove!!
module.exports = HashTable;

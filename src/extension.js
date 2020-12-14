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

//const HashTable = require("./main");

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
}

// PASTE AND MODIFY YOUR CODE BELOW
HashTable.prototype.get = function(key) {
  const hashIndex = hashCode(key, this.SIZE);
  return this.storage[hashIndex][key];
};

HashTable.prototype.set = function(key, value) {
  let hashIndex = hashCode(key, this.SIZE);
  if(!this.storage[hashIndex]) this.storage[hashIndex] = {}
  if(this.storage.length * 0.75 === 12) {
    this.SIZE = 32;
    let hashIndex = hashCode(key, this.SIZE);
    this.storage[hashIndex] = key;
    this.storage[hashIndex][key] = value;
  } else {
    this.storage[hashIndex][key] = value;
  }
};

const newHash = new HashTable();
newHash.set("hello","world")
newHash.set("hello1","world")
newHash.set("hello2","world")
newHash.set("hello3","world")
newHash.set("hello4","world")
newHash.set("hello5","world")
newHash.set("hello6","world")
newHash.set("hello7","world")
newHash.set("hello8","world")
newHash.set("hello9","world")
newHash.set("hello10","world")
newHash.set("hello11","world")
newHash.set("hello12","world")
newHash.set("hello13","world")
newHash.set("hello14","world")
newHash.set("hello15","world")
newHash.set("hello16","world")
newHash.set("hello17","world")
console.log(newHash.get('hello17'), newHash.SIZE)

// 2. remove:
// - If the hash table's SIZE is greater than 16 and the result of removing the
//   item drops the number of stored items to be less than 25% of the hash table's SIZE
//   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

HashTable.prototype.remove = function(key) {
  const removeValue = this.get(key);
  let hashIndex = hashCode(key, this.SIZE);
  delete this.storage[hashIndex][key];
  this.storage.length--;
  console.log(this.storage.length)
  console.log(this.storage.length < this.SIZE * 0.25)

  if(this.SIZE > 16 && this.storage.length < this.SIZE * 0.25) {
    this.SIZE = this.SIZE / 2;
    console.log('touched')
    let hashIndex = hashCode(key, this.SIZE);
    this.storage[hashIndex] = key;
    this.storage[hashIndex][key] = value;
  }

  return removeValue;
};

console.log(newHash.remove('hello17'), newHash.SIZE)
console.log(newHash.remove('hello16'), newHash.SIZE)
console.log(newHash.remove('hello15'), newHash.SIZE)
console.log(newHash.remove('hello14'), newHash.SIZE)
console.log(newHash.remove('hello13'), newHash.SIZE)
console.log(newHash.remove('hello12'), newHash.SIZE)
console.log(newHash.remove('hello10'), newHash.SIZE)
console.log(newHash.remove('hello8'), newHash.SIZE)
console.log(newHash.remove('hello7'), newHash.SIZE)
console.log(newHash.remove('hello6'), newHash.SIZE)
console.log(newHash.remove('hello5'), newHash.SIZE)
console.log(newHash.remove('hello4'), newHash.SIZE)


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

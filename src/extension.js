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
  this.currentSize = 0
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  //get hash index
  const hashIndex = hashCode(key, this.SIZE);
  //if key exist, replace with new key/value
  if(this.storage[hashIndex]){
    this.storage[hashIndex][key] = value;
    //add to hashtable size
    this.currentSize++
  //if key does not exist, add empty object and add key/value pair  
  } else {
    this.storage[hashIndex] = {};
    this.storage[hashIndex][key] = value;
    //add to hashtable size
    this.currentSize++
  }
  //resize hash table is size greater than 75% of size
  if(this.currentSize >= 0.75 * this.SIZE){
   this.rehash(true)
  }
};

HashTable.prototype.get = function(key) {
  //get hash index
  const hashIndex = hashCode(key, this.SIZE);
  //return undefined if key does not exist
  if(this.storage[hashIndex][key] === undefined) return;
  //return value of key
  return this.storage[hashIndex][key];
};


HashTable.prototype.remove = function(key) {
  //get hash index
  const hashIndex = hashCode(key, this.SIZE);
  //return undefined if key does not exist
  if(this.storage[hashIndex][key] === undefined) return;
  //get removed key/value
  const removedValue = this.storage[hashIndex][key];
  //delte key/value
  delete this.storage[hashIndex][key];
  //decrease hash table size
  this.currentSize--
  //resize hash table if less than 25% and greater than 16
  if(this.currentSize < 0.25 * this.SIZE && this.SIZE > 16){
    this.rehash(false)
  }
  //return removed key/value
  return removedValue;
};

//rehash function
HashTable.prototype.rehash = function(resize){
  //adjust hashtable size
  if(resize){
    this.SIZE *= 2
  } else {
    this.SIZE = Math.floor(this.SIZE /2)
  }
  //reset current size
  this.currentSize = 0
  //update storage size array
  this.storage = new Array(this.SIZE)
  //loop through array and rehash with new this.SIZE
  for(let object in this.storage){
    for(let key in object){
      let hashIndex = hashCode(key, this.SIZE);
      //if key exist, update value
      if(this.storage[hashIndex]){
        this.storage[hashIndex][key] = object[key]
      //if not key exist, add object and key/value
      } else {
        this.storage[hashIndex] = {};
        this.storage[hashIndex][key] = object[key]
      }
    }
  }
}

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

//TEST:
let testTable = new HashTable()
console.log(testTable.set("test", 100))
console.log(testTable.set("test2", 95))
console.log(testTable.set("test3", 45))
console.log(testTable.set("test4", 78))
console.log(testTable.set("test5", 65))
console.log(testTable.set("test6", 99))
console.log(testTable.set("test7", 100))
console.log(testTable)
console.log(testTable.set("test8", 50))
console.log(testTable.set("test9", 45))
console.log(testTable.set("test10", 95))
console.log(testTable.set("test11", 98))
console.log(testTable.set("test12", 85))
console.log(testTable.set("test13", 67))
console.log(testTable.set("test14", 34))
console.log(testTable.set("test15", 76))
console.log(testTable)
console.log(testTable.get("test3"))
console.log(testTable.remove("test6"))
console.log(testTable)
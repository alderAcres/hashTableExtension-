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
  this.index = 0
}

HashTable.prototype.set = function(key, value) {
  //if index exceeds 12, expand this.SIZE to 32
  if (this.index === 2){
    this.SIZE = this.SIZE * 2
    let reHashObj = {}
    reHashObj[key] = value
    for (let i = 0; i < this.storage.length; i++){
      if (this.storage[i]){
        for(let [key,value] of Object.entries(this.storage[i])){
          reHashObj[key] = value
        }
      }
    }
    for(let [key,value] of Object.entries(reHashObj)){
      let bucketNum = hashCode(key, this.SIZE)
      if (this.storage[bucketNum] && this.storage[bucketNum][key]) this.storage[bucketNum][key] = value
      else if (this.storage[bucketNum]) {
        this.index += 1
        this.storage[bucketNum][key] = value
      }
      else {
        this.index += 1
        this.storage[bucketNum] = {}
        this.storage[bucketNum][key] = value
      }
    }
  } else {
    let bucketNum = hashCode(key, this.SIZE)
    if (this.storage[bucketNum] && this.storage[bucketNum][key]) this.storage[bucketNum][key] = value
    else if (this.storage[bucketNum]) {
      this.index += 1
      this.storage[bucketNum][key] = value
    }
    else {
      this.index += 1
      this.storage[bucketNum] = {}
      this.storage[bucketNum][key] = value
    }
  }
};
myTable = new HashTable
myTable.set('full', 'stack')
myTable.set('ape', 'shit')
myTable.set('wt', 'f')
console.log(myTable.index)
console.log(myTable.storage)

HashTable.prototype.get = function(key) {
  let bucketNum = hashCode(key, this.SIZE)
  return this.storage[bucketNum][key]
};

HashTable.prototype.remove = function(key) {
  let bucketNum = hashCode(key, this.SIZE)
  if (!this.storage[bucketNum][key]) return undefined
  else {
    delete this.storage[bucketNum][key]
    this.index -= 1
  }

};
myTable.remove('full')
console.log(myTable.index)
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

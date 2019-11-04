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

// */
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {

    let hashKey = hashCode(key, this.SIZE)
    let capacity

    if (!this.storage[hashKey]) {
      this.storage[hashKey] = {}
      this.storage[hashKey][key] = value
    }
    let count = 0
    for (let val of this.storage) {
      if (val) count += 1
    }
    capacity = count / this.storage.length
  
    if (capacity > 0.75) {
      let oldArray = JSON.parse(JSON.stringify(this.storage))
      this.SIZE *= 2
      for (let bucket of oldArray) {
        if (bucket) {
          for (let key in bucket) {
            hashKey = hashCode(key, this.SIZE)
            this.storage[hashKey] = {}
            this.storage[hashKey][key] = bucket[key]
          }
        }
      }
    }
};


HashTable.prototype.get = function(key) {
      hashKey = hashCode(key, this.SIZE)
      return this.storage[hashKey][key]
};


HashTable.prototype.remove = function(key) {

  hashKey = hashCode(key, this.SIZE)
  let toDelete = this.storage[hashKey][key]
  delete this.storage[hashKey][key]

  let count = 0
  for (let val of this.storage) {
    if (val) count += 1
  }
  capacity = count / this.storage.length

  if (capacity < 0.25) {
    let oldArray = JSON.parse(JSON.stringify(this.storage))
    this.SIZE /= 2
    for (let bucket of oldArray) {
      if (bucket) {
        for (let key in bucket) {
          hashKey = hashCode(key, this.SIZE)
          this.storage[hashKey] = {}
          this.storage[hashKey][key] = bucket[key]
        }
      }
    }
  }
  return toDelete

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


let HT = new HashTable()
console.log(HT.storage)
console.log(HT.set('testKey', 'testValue'))
console.log(HT.set('test2', 'testVal'))
console.log(HT.storage)








// Do not remove!!
module.exports = HashTable;

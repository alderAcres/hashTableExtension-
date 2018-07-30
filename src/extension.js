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
  const hash = hashCode(key, this.SIZE)
  //The storage has 16 keys, and will inevitably will have collision.
  //Each of the 16 keys stores an object that has the key argument as the key, and value argument as the value
  //the if checks if there is an object already at the key, if so, adds onto the object
  //if not, the else will add an object at this key
  if (this.storage[hash]) this.storage[hash][key] = value
  else {
    const hashObj = {};
    hashObj[key] = value
    this.storage[hash] = hashObj;
  }
  if (Object.keys(this.storage).length > this.SIZE * 0.75){
    this.SIZE *= 2
    const tempStorage = {}
    for (let hash in this.storage){
      for (let key in this.storage[key]){
        const newHash = hashCode(this.storage[hash][key])
        if (tempStorage[newhash]) tempStorage[newHash][key] = this.storage[hash][key]
        else {
          const hashObj = {};
          hashObj[key] = this.storage[hash][key]
          tempStorage[newHash] = hashObj;
        }
      }
    }
    this.storage = tempStorage; 
  }
};

HashTable.prototype.get = function(key) {
  //HashTable.add stores an object at each key. If there was already an object at the key,
  //then a key and value were added to the existing obj. To retrieve the value, just search for 
  //the key of this.storage[hash]
  const hash = hashCode(key, this.SIZE)
  return this.storage[hash][key]
};

HashTable.prototype.remove = function(key) {
  const hash = hashCode(key, this.SIZE)
  if (this.storage[hash][key]) delete this.storage[hash][key]
  else return undefined
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

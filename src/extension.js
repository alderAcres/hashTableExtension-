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
HashTable.prototype.get = function(key) {
  const hashKey = hashCode(key, this.SIZE)
  if(this.storage[hashKey]){
    return this.storage[hashKey][key]
  }
};

HashTable.prototype.set = function(key, value) {
  const hashKey = hashCode(key, this.SIZE)
  if(!this.storage[hashKey]) this.storage[hashKey] = {}
  this.storage[hashKey][key] = value
  let count = 0
  for(let ele of this.storage){
    if(ele !== undefined){
      count += 1
    }
  }
  console.log("COUNT", count)
  if(count >= this.SIZE * .75) {
    const newArr = new Array(this.SIZE).concat(this.storage)
    this.SIZE *= 2
    console.log("newArr", newArr)
    this.storage = newArr
  }
};


HashTable.prototype.remove = function(key) {
  const hashKey = hashCode(key, this.SIZE)

  if(this.storage[hashKey]) {
    const copy = this.storage[hashKey][key]
    delete this.storage[hashKey][key]

    let count = 0
    for(let ele of this.storage){
      if(ele !== undefined){
        count += 1
      }
    }
    if(this.SIZE > 16 && count <= this.SIZE * .25) {
      const newArr = new Array(this.SIZE/2).concat(this.storage)
      this.SIZE /= 2
      console.log("newArr", newArr)
      this.storage = newArr
    }
    
    return copy
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

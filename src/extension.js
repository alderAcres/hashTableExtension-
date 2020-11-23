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

function HashTable(size = 16) {
  this.SIZE = size;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  let hash = hashCode(key, this.SIZE)

  if (this.storage[hash]){
    let rewrite = false
    for (let i = 0; i< this.storage[hash].length; i++){
      if (this.storage[hash][i][0] === key){
        this.storage[hash][i][1] = value
        rewrite = true
      }
    }
    if (!rewrite) {
      this.storage[hash].push([key, value])
    }
  } else {
    this.storage[hash] = [[key, value]]
  }

  let len = this.storage.flat().length

  //check if the size is greater than 75% of this.SIZE
  if (Math.floor(this.SIZE*.75)<len) {
    let resizedHashTable = new HashTable(this.SIZE*2)

    for (let entry of this.storage){
      if (entry){
        for (let pair of entry){
          resizedHashTable.set(pair[0], pair[1])
        }
      }
    }
    this.storage = resizedHashTable.storage
  }
  


  return len
};


HashTable.prototype.get = function(key) {
  let hash = hashCode(key, this.SIZE)
  for (let pair of this.storage[hash]){
    if (pair[0] === key) return pair
  }
};


HashTable.prototype.remove = function(key) {
  let hash = hashCode(key, this.SIZE)
  let returnVal = undefined
  for (let i = 0; i< this.storage[hash].length; i++){
    if (this.storage[hash][i][0] === key){
      returnVal = this.storage[hash][i][1]
      this.storage[hash].splice(i, 1)
    }
  }

  //check if there is less than 25% entries
  //then resize
  let len = this.storage.flat().length
  if (Math.floor(this.SIZE*.25)>len){
    let resizedHashTable = new HashTable(this.SIZE/2)

    for (let entry of this.storage){
      if (entry){
        for (let pair of entry){
          resizedHashTable.set(pair[0], pair[1])
        }
      }
    }
    this.storage = resizedHashTable.storage
  }

  return returnVal
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



let newHashTable = new HashTable()
newHashTable.set(1, "firstVal")
newHashTable.set("uhh", "secondVal")
newHashTable.remove(1)
console.log(newHashTable.storage)


// Do not remove!!
module.exports = HashTable;

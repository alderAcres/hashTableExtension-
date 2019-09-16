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
  this.items = 0
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {debugger;
  this.items++

  let setter = (key, value) => {debugger;
    let hash = hashCode(key, this.SIZE)
    if (this.storage[hash] !== undefined) {
      this.storage[hash][key] = value
    }
    else{
      this.storage[hash] = {}
      this.storage[hash][key] = value
    }
  }

  if(this.items > Math.floor(this.SIZE*.75)) {
    this.SIZE *= 2
    this.storage = this.storage.concat(new Array(this.storage.length))

    //rehash everything
    this.storage.forEach( (elem,index) => {
      //elem is the key values in an object to use for rehashing
      //not working correctly because setting undefined will remove some elements unwantedly
      //the fix is to store the correct reference to the old hash element and then remove it later
      
      if (elem !== undefined) {
        let keyArr = Object.keys(elem)
        for (var i = 0; i<keyArr.length; i++) {
          setter( keyArr[i] , elem[keyArr[i]] )
        }
        this.storage[index] = undefined
      }
    })
  }
  else {setter(key, value)}

};

for (var i =0; i< 13; i++) {test.set(`key ${i}`, `value ${i}`)}

HashTable.prototype.get = function(key) {
  let hash = hashCode(key, this.SIZE)
  if (this.storage[hash] === undefined) {return undefined}
  if (this.storage[hash][key] === undefined) {return undefined}
  return this.storage[hash][key]
};

HashTable.prototype.remove = function(key) {
  this.items--
  let remover = (key) => {
    let hash = hashCode(key, this.SIZE)

    let lookup = this.get(key)
    if (lookup === undefined) {return lookup}
    else{
      delete this.storage[hash][key]
      if (Object.keys(this.storage[hash]).length === 0) {this.storage[hash]  = undefined}
    }
    return lookup
  }

  if (this.SIZE > 16 && this.items < Math.floor(this.Size*.25)) {
    //resize by cutting the whole thing in half and rehashing

  }
  else {remover(key)}
  
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

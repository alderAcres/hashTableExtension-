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
  capacity = this.SIZE * 0.75 - 1
  if (Object.keys(table.storage).length === capacity) {

    this.SIZE = this.SIZE * 2

    for (let hashIndex in this.storage) {
      for (let keyIndex of hashIndex) {
        newHash  = hashCode(keyIndex, this.SIZE)
        tempValue = table.get(keyIndex)
        table.remove(keyIndex)
        if (!this.storage[newHash]) this.storage[newHash] = {}
        this.storage[newHash][keyIndex] = tempValue
      }
    }
  }
  //For some reason having an issue assigning to the '1' index of this.storage
  hash  = hashCode(key, this.SIZE)

  if (this.storage[hash] === undefined) this.storage[hash] = {}

  this.storage[hash][key] = value

};


HashTable.prototype.get = function(key) {
  hash = hashCode(key, this.SIZE)
  return this.storage[hash][key]
};


HashTable.prototype.remove = function(key) {
  capacity = this.SIZE * 0.25
  if (Object.keys(table.storage).length === capacity && this.SIZE > 16) {
    this.SIZE = this.SIZE * 1/2

  }
  else {
    hash = hashCode(key, this.SIZE)
    if (this.storage[hash] === undefined) return undefined
    else{
      toBeRemoved = this.storage[hash][key]
      delete this.storage[hash][key]
      console.log(`Key value pair removed: {"${key}", ${toBeRemoved}}`)
      result = {}
      result[key] = toBeRemoved
      return result
    }
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

// Tests //

// table = new HashTable()
// console.log(Object.keys(table.storage))
// table.set("olleh",5)
// console.log(table)
// table.set("crying",7)
// table.set("babier",7)
// table.set("qweuriop",7)
// table.set("ql",7)
// table.set('muffin', 2)
// table.set('apple', 2)
// table.set('twelve', 2)
// table.set('notification', 2)
// table.set('penci', 2)
// table.set('one', 2)
// table.set('two', 2)
// console.log(Object.keys(table.storage))
// console.log(table)
// console.log(table.get('olleh'))
// //console.log(table.remove('hello'))
// console.log(table.storage[2])


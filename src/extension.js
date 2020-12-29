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
  const hashKey = hashCode(key, this.SIZE)

  if(this.storage[hashKey] !== undefined) {
    this.storage[hashKey][key] =  value
  }else {

    //Check if (currentStoredValues + 1) > (75% of this.SIZE)
    let storedValsCount = 1
    for(let i = 0; i < this.storage.length; i++) {
      if(this.storage[i] !== undefined) storedValsCount+=1
    }

    //If Hash table's size is 75%+, increase the size and rehash the table 
    if((storedValsCount/this.SIZE) > .75) {
      this.reHash('increase')
    }
    //Otherwise add the value to the hash table 
    else {
      const newHash = new HashTable()
      this.storage[hashKey] = newHash
      this.storage[hashKey][key] = value
    }
  }

  return this.SIZE
};

HashTable.prototype.remove = function(key) {
  //Check if (currentStoredValues - 1) < (25% of this.SIZE)
  let storedValsCount = -1
  for(let i = 0; i < this.storage.length; i++) {
    if(this.storage[i] !== undefined) storedValsCount+=1
  }

  //If Hash table's size is 75%+, increase the size and rehash the table 
  if((storedValsCount/this.SIZE) < .25 && this.SIZE > 16) {
    this.reHash('decrease')
  }

  const hashKey = hashCode(key, this.SIZE)
  const returnVal = this.storage[hashKey][key]
  delete this.storage[hashKey][key]
  return returnVal
};

HashTable.prototype.reHash = function(instructions) {
  console.log('rehashing')
  if(instructions === 'increase') {
    const newSize = this.SIZE * 2
    const newHashTable = new HashTable(newSize)

    this.storage.forEach((val) => {
      console.log(val === undefined)
    })
    
  }else {

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

const table = new HashTable(10)
table.set('first key', 'first value')
table.set('second key', 'second value')
table.set('key first q', 'fourth value')
console.log(table)
console.log(table)
table.set('third key', 'third value')
table.set('fourth key', 'fourth value')
table.set('fifth key', 'fourth value')
table.set('sixth key', 'fourth value')
table.set('seventh key', 'fourth value')
table.set('eighth key', 'fourth value')
table.set('ninth key', 'fourth value')
table.set('tenth key', 'fourth value')
table.set('eleventh key', 'fourth value')
table.set('twelfth qz key', 'fourth value')
table.set('thirteenth key', 'fourth value')
table.set('fourteenthh key', 'fourth value')
table.set('fifteenth key', 'fourth value')
table.set('sixteenth key', 'fourth value')
table.set('18th key', 'fourth value')
table.set('19th key', 'fourth value')
table.set('20th key', 'fourth value')
table.set('155th key', 'fourth value')
console.log(table)
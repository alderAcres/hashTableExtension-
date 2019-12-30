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

//create a condition: if pusshing value takes over 75% of this.SIZE
  //create variable over75 assign value of SIZE * 0.25
  //if value is greater than over75 varuiable,
  //this.SIZE = SIZE * 2
  //rehash -> invoke hashCode func (key, new this.SIZE)
    //reassign all this.storage[hashKey][key](index) = value

HashTable.prototype.set = function(key, value) {
  const hashKey = hashCode(key, this.SIZE); 
  const over75 = this.SIZE * 0.25; 
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
  }
  if (value > over75) {
    this.SIZE = this.SIZE * 2;
    const hashKey = hashCode(key, this.SIZE)
    this.storage[hashKey][key] = value;
  }
  this.storage[hashKey][key] = value;
};



HashTable.prototype.remove = function(key) {
  //create variable, assign return value of hashCode
  const hashKey = hashCode(key, this.SIZE);
  //if obj(this.storage is empty, return undefined)
  if (!this.storage[hashKey][key]) return undefined;
  //if there is value in the obj,
  if (this.storage[hashKey][key]) {
    //assign remove value into variable
    const removeValue = this.storage[hashKey][key];
    //delete removing value
    delete this.storage[hashKey][Key];
    //return removing value
    return removedValue;
    
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

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
  console.log(this.storage.length - 4)
}


HashTable.prototype.set = function(key, value) {
  let keyIndexNum = hashCode(key, this.SIZE)
  this.storage[keyIndexNum] = {}
  if(this.storage[keyIndexNum] === undefined){
    if(this.storage[keyIndexNum].length){ // Incorrect condition 
      this.SIZE = 32
      keyIndexNum = hashCode(key, this.SIZE)
      this.storage[keyIndexNum][key] = value
    }
    
    this.storage[keyIndexNum][key] = value
  }else{
    this.storage[keyIndexNum][key] = value
  }
  console.log(this.storage.length)
};


HashTable.prototype.get = function(key) {
  let keyIndexNum = hashCode(key, this.SIZE)
  if(this.storage[keyIndexNum][key] !== undefined){
    return this.storage[keyIndexNum][key]
  }
};



HashTable.prototype.remove = function(key) {
  let keyIndexNum = hashCode(key, this.SIZE);
  let keyValue = this.storage[keyIndexNum][key];
  if(this.storage[keyIndexNum][key] !== undefined){
    delete this.storage[keyIndexNum][key];
    return keyValue;
  }
  else return undefined;
};


// Do not modify
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


const test = new HashTable()
test.set('DAD', '949-220')
// test.set('udsD', '954-720')
// test.set('DAthbD', '969-220')
// test.set('DAzv', '949-000')
// test.set('DAczD', '949-200')
// test.set('DAdD', '9649-220')
// test.set('DssfAD', '9449-220')
// test.set('DcD', '9459-220')
// test.set('DAcD', '949-2720')
// test.set('DvcdAD', '9559-220')
// test.set('DAccD', '9v49-2220')
// test.set('DcsAD', '9449-2230')
// test.set('DAvgD', '9439-22560')
// test.set('DAxwD', '9649-2250')
// test.set('DAakD', '9419-2220')






// console.log(test)
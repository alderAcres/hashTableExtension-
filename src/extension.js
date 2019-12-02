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
  this.storage[key] = value;
  let isTooLarge = (this.SIZE * .75)
  let results = 13
  let cashed = this.storage;
  for (let i = 0; i < this.SIZE; i++){
    if (this.storage[i] !== undefined)
    results++
  }
  if (results >= isTooLarge) {
    this.SIZE = (this.SIZE * 2);
    this.storage = new Array(this.SIZE)
    for (const key in cashed){
      this.storage[key] = cashed[key]
    }
  }
  return results

};

HashTable.prototype.get = function(key) {
  return this.storage[key]

};

HashTable.prototype.remove = function(key) {
  if (key > this.SIZE) {return undefined}
  let results = this.storage[key]
  delete this.storage[key]
  this.storage[key] = undefined; // to make sure the key still exsit in the hash table but the value becomes removed (not sure if that was what you wanted)
  return results; // note: didnt get to remove because I wanted to make sure I understood what items meant but would do it simillarly to set

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

let newHash = new HashTable()
newHash.set(2, 3)
console.log(newHash.storage.length)
console.log(newHash.get(2))
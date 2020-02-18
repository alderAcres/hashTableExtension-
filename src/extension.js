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
  this.SIZE = 6;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  let bucket = hashCode(key, this.SIZE) 
  if (this.storage[bucket] === undefined) this.storage[bucket] = {[key]: value,}
  else {
    this.storage[bucket][key] = value
  }

  let counter = 0;
  for (let i = 0; i < this.SIZE; i++) {
    // iterate through the hashtable and increment the counter variable when the bucket is not empty 
    if (this.storage[i] !== undefined) counter++
  }

  // check if counter is greater than 75% of the given size
  if (counter > this.SIZE * 0.75) {
    // double the size if the statement is met
    this.SIZE = this.SIZE * 2
  }
};

let test = new HashTable
test.set('a', '1')
test.set('b', '2')
test.set('c', '3')
test.set('d', '4')
test.set('e', '5')
console.log(test)


HashTable.prototype.remove = function(key) {
  let bucket = hashCode(key, this.SIZE) 
  if (this.storage[bucket][key] === undefined) {
    return undefined;
 } else {
    delete this.storage[bucket][key]
  }

  // if this.SIZE is greater than 16 and result of removing the item drops 
  // the number of stored items to be less than 25% of this.SIZE 

  let counter = 0;
  for (let i = 0; i < this.SIZE; i++) {
    if (this.storage[i] !== undefined) counter++
  }
  
  if(this.SIZE > 16 && counter < Math.floor(this.SIZE * 0.25)) {
    // reduce the size by half 
    this.SIZE = this.SIZE / 2

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

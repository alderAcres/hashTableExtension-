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

function fillCheck(array) {
  let full = 0;
  array.forEach(element => {if (element) full += 1});
  return (full / array.length);
}

HashTable.prototype.set = function(key, value) {
  const position = hashCode(key, this.SIZE);
  if (!this.storage[position]) this.storage[position] = {};
  this.storage[position][key] = value;
  //if this.storage.length > this.size * .75
  if (fillCheck(this.storage) > this.SIZE * .75) {
    
  }
  
  //resize hash table
  //ran out of time here!
};

HashTable.prototype.get = function(key) {
  const position = hashCode(key, this.SIZE);
  return this.storage[position][key];
};

HashTable.prototype.remove = function(key) {
  const position = hashCode(key, this.SIZE);
  const value = this.storage[position][key];
  delete this.storage[position][key];
  return value;
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

const table = new HashTable;
table.set('george', 'washington');
table.set('john', 'adams')
table.set('thomas', 'jefferson');
table.set('james', 'madison')
// console.log(table.length); //undefined--it's an object
// console.log(Array.isArray(table)) //false
// console.log(typeof table) //object
// console.log(Array.isArray(this.storage)) //false
// console.log(typeof this.storage) //undefined--access problem?
// console.log(table.storage) //here it is
// console.log(table.storage.length) //16, although it isn't full.
console.log(fillCheck(table.storage)); //25

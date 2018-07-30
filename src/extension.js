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
function HashTable(obj) {
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
  
  this.high_limit = 28; //75% of 16 + 16
  this.low_limit = 4; //25% of 16

  this.length = 0;
  this.items = {};
  for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          this.items[prop] = obj[prop];
          this.length++;
      }
  }
}

HashTable.prototype.set = function(key, value) {
  let previous = undefined;
  //check if object contains specified property
  if (this.items.hasOwnProperty(key)) {
    previous = this.items[key];
  } else {
    this.length++;
  }
  this.items[key] = value;

  //check size limit (high)
  if (this.length >= this.high_limit) {
    console.log("size limit reached!");
    this.SIZE = 32; //increase size
    //this.set(key, value); //re-hash
  }
  return previous;
};

HashTable.prototype.get = function(key) {
  //check if object contains specified property
  if (this.items.hasOwnProperty(key)) {
    return this.items[key];
  } else {
    return undefined;
  }
};

HashTable.prototype.remove = function(key) {
  let previous = undefined;
  //check if object contains specified property
  if (this.items.hasOwnProperty(key)) {
    previous = this.items[key];
    this.length--;
    //check size limit (low)
    if (this.length <= this.low_limit) {
      console.log("Stored items less than 25%")
    }

    delete this.items[key]; 
    return previous;
  } else {
    return undefined;
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

// TESTS
var h = new HashTable({one: 1, two: 2, three: 3, "four": 4, "five": 5, "six": 6, 
"seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve": 12, "thirteen": 13,
"fourteen": 14, "fifteen": 15});
console.log(h.length); //15

h.set("a", 16);
h.set("b", 17);
h.set("c", 18);
h.set("d", 19);
h.set("e", 20);
h.set("f", 21);
h.set("g", 22);
h.set("h", 23);
h.set("i", 24);
h.set("j", 25);
h.set("k", 26);
h.set("l", 27);
h.set("m", 28);
h.set("n", 29);
h.set("o", 30);
console.log(h.length); //30
console.log("size", h.SIZE);
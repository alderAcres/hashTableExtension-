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
  this.numELements = 0;
}



HashTable.prototype.set = function(key, value) {
  let index = hashCode(key, this.SIZE);
  let percent75 = this.SIZE * 0.75;

  if (this.numELements >= percent75) {
    this.rehash();
  } 

  if (this.storage[index] === undefined) {
    this.storage[index] = {};
    this.storage[index][key] = value;
    this.numELements++;
  } else {
    this.storage[index][key] = value;
    this.numELements++;
  }
};

HashTable.prototype.rehash = function() {
    this.SIZE *= 2;
    this.numELements = 0;

    this.storage.forEach(obj => {
     for (let key in obj) {
        let index = hashCode(key, this.SIZE);
        if (this.storage[index] === undefined) {
          let newObj = {};
          newObj[key] = obj[key];
          this.storage[index] = newObj;
          this.numELements++;
        } else {
          this.storage[index][key] = obj[key];
          this.numELements++;
        }
     }
   });
}


HashTable.prototype.get = function(key) {
  const index = hashCode(key, this.SIZE);

  return this.storage[index][key];
};


HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE);
  const deletedKey = this.storage[index][key];
  delete this.storage[index][key];
  return deletedKey;
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




// TESTING 

// Create new instance of hashtable
const table = new HashTable;

// Add some key-value pairs to table
table.set("a", "apple");
table.set("b", "bear");
table.set("c", "cat");
table.set("d", "dog");
table.set("e", "elephant");
table.set("f", "frog");
table.set("g", "gerbil");
table.set("h", "hippo");
table.set("i", "ink");
table.set("j", "jar");
table.set("k", "koala");
table.set("l", "lemur");
table.set("m", "marsupial");
table.set("n", "n");
table.set("o", "olive");


// See what table looks like - check if .set function working 
// also check for any collisions
// console.log(table);


// check remove function 
// console.log(table.remove("New York"));

// see if remove function removed key from table 
// console.log(table);
// console.log(table.numELements)

table.set("p", "pear");
table.set("q", "queen");
table.set("dog", "sweet");
table.set("New York", "raining");
table.set("cookies", "yum");
table.set("Codesmith", "awesome");
table.set("challenge", "complete");
console.log(table);
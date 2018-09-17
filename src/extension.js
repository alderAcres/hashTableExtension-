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
  //index from running hashCode
  let numberOfKeys = 0;
  for (let i = 0; i < this.storage.length; i++) {
    for(let key in this.storage[i]) {
      numberOfKeys += 1;
    }
  }
    
  if (numberOfKeys >= (.75*this.SIZE)) {
    this.SIZE *= 2
 	} 
  
  let index = hashCode(key, this.SIZE) 
  
  if (this.storage[index] === undefined) {
    const newObj = {};
    newObj[key] = value;
    this.storage[index] = newObj;
  } else {
    this.storage[index][key] = value;
  }
};

//test 
// let test = new HashTable();
// test.set('Elliot',50);
// test.set('Brian',40);
// test.set('Sam',70);
// test.set('Joel',20);
// test.set('Ellio',52);
// test.set('Bria',43);
// test.set('Sa',32);
// test.set('Joe',22);
// test.set('Elli',55);
// test.set('Bri',45);
// test.set('S',35);
// test.set('Jo',25);
// test.set('Ell',58);
// test.set('Ban',48);
// test.set('Sm',38);
// test.set('Jel',28);
// console.log(test);

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};

HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  delete this.storage[index][key];
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

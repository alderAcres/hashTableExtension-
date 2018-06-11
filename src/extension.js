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
  this.buckets = 0;
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE); 

  if(this.storage[index] === undefined) {
    this.storage[index] = {};
    this.buckets += 1;
  }
  this.storage[index][key] = value;

  if((this.buckets / this.SIZE) * 100 >= 75) {
    console.log(this.SIZE);
    const newTable = new HashTable();

  }
};

HashTable.prototype.get = function(key) {
  const index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};


HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE);
  if(this.storage[index] === undefined) return undefined;
  const value = this.storage[index][key];
  delete this.storage[index][key];
  return value;
};

const table = new HashTable();

table.set('dog', '1');
table.set('cat', '2');
table.set('mom', '3');
table.set('dad', '4');
table.set('erik', '5');
table.set('tyurty', '6');
table.set('boros', '7');
table.set('qwrqwre', '8');
table.set('green', '9');
table.set('blue', '10');
table.set('fish', '11');
table.set('crab', '12');
table.set('fasdfa', '13');
table.set('basketballs', '14');
console.log(table);

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

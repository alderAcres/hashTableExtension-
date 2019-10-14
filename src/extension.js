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
  this.count = 0;
  this.slots = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  let hash = hashCode(key, this.SIZE);
  if(this.storage[hash]){
    this.storage[hash][key] = value
  }
  else{
    this.storage[hash] = {}
    this.storage[hash][key] = value;
    this.slots++;
    if(this.slots >= this.SIZE * 0.75){
        this.SIZE *= 2;
        this.count = 0;
        this.slots = 0;
        let tempArr = this.storage;
        this.storage = new Array(this.SIZE);
        for(let i = 0; i < tempArr.length; i++){
            for(var x in tempArr[i]){
                this.set(x, tempArr[i][x])
            }
        }
    }
  }
  return ++this.count;
};

HashTable.prototype.remove = function(key) {
  let output = this.storage[hashCode(key, this.SIZE)][key];
  delete this.storage[hashCode(key, this.SIZE)][key];

  //RAN OUT OF TIME BEFORE FIGURING OUT HOW TO REMOVE EMPTY OBJECTS
  if(this.slots <= this.SIZE * 0.25){
    this.SIZE /= 2;
    this.count = 0;
    this.slots = 0;
    let tempArr = this.storage;
    this.storage = new Array(this.SIZE);
    for(let i = 0; i < tempArr.length; i++){
        for(var x in tempArr[i]){
            this.set(x, tempArr[i][x])
        }
    }
  }

  if(output) return output
  else return undefined;
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

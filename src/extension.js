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
function HashTable(size = 16) {
  this.SIZE = size;
  this.stored = 0;
  this.storage = new Array(this.SIZE);
  this.keys = new Set(); 
}

HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key,this.SIZE);
  this.storage[hash][key] = value;
  if (!this.keys.has(key)){
    this.stored++;
    this.keys.add(key);
    this.storage[hash] = {};
  }
  if (this.stored > this.SIZE*(3/4)){
    const newStorage = new HashTable(this.SIZE*2);
    keys.forEach(key=>{
      newStorage.set(key,this.get(key));
    })
    for (let i=0; i < newStorage.storage.length; i++){
      Object.keys(newStorage.storage[i]).forEach(
        (key)=>{
          this.storage[i]
      })
    }
    this.SIZE*=2;
  }
};

HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);
  if(this.storage[hash]){
    return this.storage[hash][key];
  }
  return undefined;
};

HashTable.prototype.remove = function(key) {
  let val = undefined;
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]){
    val = this.storage[hash][key];
    delete this.storage[hash][key];
    this.stored--;
  }
  return val;
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

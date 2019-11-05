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
  for (let index in this.storage){
    this.storage[index] = {};
  }
  this.items = 0;
}

HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key, this.SIZE);
  const threshold = this.SIZE*.75;

  if (!this.storage[hash][key] && this.items < threshold - 1){
    this.storage[hash][key] = value;
    this.items++;
    return this.items;
  } else if (!this.storage[hash][key]){
    for (let hash of this.storage){
      if (this.storage[hash]){
        let tempKey = this.storage.hash
      this.SIZE = this.SIZE *
    
    return "This key is unacceptable."
  }
};

HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);
  for (let i = 0; i < this.storage.length; i++){
    if (this.storage[hash][key]){
      return this.storage[hash][key];
    } else {
      return undefined;
    }
  }
};

HashTable.prototype.remove = function(key) {
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash][key]){
    let temp = this.storage[hash][key];
    delete this.storage[hash][key];
    this.items--;
    return temp;
  } else {
    return "Please ensure your key is correct and try again.";
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

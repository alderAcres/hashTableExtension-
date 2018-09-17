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
  let hash = hashCode(key, this.SIZE);
  let items = 0;
  let stored = [];
  let obj = {};
  obj[key] = value;
  for (let i = 0; i < this.storage.length; i++){
    items += this.storage[i].length;
  }
  if (items > (0.75 * this.SIZE)){
    for (let i = 0; i < this.storage.length; i++){
      if (this.storage[i].length > 0){
        stored.push(this.storage[i])
      }
    }
    this.SIZE *= 2;
    this.storage = newArray(this.SIZE);
    for (let i = 0; i < stored.length; i++){
      for (let j = 0; j < stored[i].length; j++){
        let newHash = hashCode(Object.keys(stored[i][j])[0], this.SIZE);
        let newObj = {};
        newObj[Object.keys(stored[i][j])[0]] = Object.values(stored[i][j])[0]
        if (this.storage[newHash] === undefined) {
          this.storage[newHash] = [newObj];
        } else {
          this.storage[newHash].push(newObj);
        }
      }
    }
  } else {
    if (this.storage[hash] === undefined){
      this.storage[hash] = [obj];
    } else {
      this.storage[hash].push(obj);
    }
  }
};

//ran out of time
HashTable.prototype.get = function(key) {
  let hash = hashCode(key, this.SIZE);
  for (let i = 0; i < this.storage[hash].length; i++){
    if (this.storage[hash][i].hasOwnProperty(key)){
      return this.storage[hash][i][key];
    }
  }
};

HashTable.prototype.remove = function(key) {
  let hash = hashCode(key, this.SIZE);
  for (let i = 0; i < this.storage[hash].length; i++){
    if(this.storage[hash][i].hasOwnProperty(key)){
      this.storage[hash].splice(i, 1);
    } else if(i == this.storage[hash].length - 1){
      return undefined;
    }
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

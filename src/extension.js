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
  const hash = hashCode(key, this.SIZE);

  //check if location exists
  if(this.storage[hash]) {

    //check if any objects at location matches the key
    const i = this.storage[hash].findIndex(function(obj){
      return obj.hasOwnProperty(key);
    })
    //if found, override the obj
    if(i >= 0) {
      this.storage[hash][i] = {[key]: value};
    //if not found, push key/value to array
    } else {
      this.storage[hash].push({[key]: value})
    }
  } else {
    //check the size of storage [do undefined values count toward size??]
    const count = this.storage[hash].reduce(function(count, location){
      return Array.isArray(location) ? count++ : count;
    }, 0);

    const percent = this.SIZE / count * 100;
    if(percent > 75) {
      //get all the stored objects
      const objs = this.storage
      //resize
      const newArray = new Array(this.SIZE * 2);

    } else {
      this.storage[hash] = [ {[key]: value} ];
    }
  }
};

HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) {
    const i = this.storage[hash].findIndex(function(obj){
      return obj.hasOwnProperty(key);
    })
    if (i >= 0) {
      return this.storage[hash][i][key];
    }
    return undefined
  }
  return undefined
};

HashTable.prototype.remove = function(key) {
  const hash = hashCode(key, this.SIZE);
  
  // check if hash exists
  if(this.storage[hash]) {
    const i = this.storage[hash].findIndex(function(obj){
      return obj.hasOwnProperty(key);
    })
    //check if obj exists at hash location
    if(i >= 0) {

      //remove obj. mutates the array
      this.storage[hash].splice(i, 1);

      //check if array is empty. If so, set it to undefined
      if (this.storage[hash].length === 0) {
        this.storage[hash] = undefined;
      }
    }
    return undefined
  }
  return undefined
};


// Do not modify
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

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
// SET
HashTable.prototype.set = function(key, value) {
  // set variable that stores result from hashed function invocation 
  let output = hashCode(key, this.SIZE);
  // check if 'bucket' is empty
  // if true, add key: value to specified index
  if (this.storage[output]) {
    // build out obj on bucket
    this.storage[output][key] = value;
  } else {
    // if false, create new obj at 'bucket' and populate with result
    this.storage[output] = {};
    this.storage[output][key] = value;
  }
};

// REMOVE
HashTable.prototype.remove = function(key) {
  let output = hashCode(key, this.SIZE);
  // store deleted data in a var
  let temp = this.storage[output][key];
  // check if output exists
  // if false, return undefined
  if (!this.storage[output][key]) return undefined;
  // if true, delete temp with 'delete' keyword and return
  delete this.storage[output][key];
  return temp;
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

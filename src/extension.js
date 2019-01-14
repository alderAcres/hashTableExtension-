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

// INCOMPLETE IMPLEMENTATION BELOW!
HashTable.prototype.set = function(key, value) {
  //add load factor value
  //traverse the array to find non-empty addresses
  let loaded = 0;
  for (let i = 0; i < this.SIZE; i++) {
    //check if object at addresses is empty
    if (Object.keys(obj).length !== 0) loaded += 1;
  }
  let load = loaded/this.SIZE;
  if (load + 1 > .75) {
      //double hash table size
      this.SIZE = 2 * this.SIZE;
      //allocate new store
      this.newstore = new Array(this.SIZE);
      for (let i = 0; i < this.SIZE; i++ ) {
        this.storage[i] = {};
      }  
  }
      //rehash old elements in previous table
      //reset this.storage to point to new hash table and delete this.newstore

  else {
    //allocate storage for colliding values within each bucket 
    for (let i = 0; i < this.SIZE; i++ ) {
      this.storage[i] = {};
    }
    //calculate the address for the key to be stored via hash function
    let hash = hashCode(key, this.SIZE);
    
    //overwrite key if key-value pair is already present
    if (this.storage[hash][key]) this.storage[hash][key] = value;
    //otherwise store the new key-value pair at the hash table address
    this.storage[hash][key] = value;
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

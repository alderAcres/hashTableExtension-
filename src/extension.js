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
  // Keep track of current size to determine when to resize
  this.currentSize = 0;
};

HashTable.prototype.set = function(key, value) {
  // Determine the hashkey 
  let hashkey = hashcode(value, this.SIZE);
  // If specific hashkey doesn't exist
  if (!this.storage[hashkey]) {
  // Create an empty object to store key : value pairs 
    let obj = {};
    obj[key] = value;
  // Place object in correct hashkey 
    this.storage[hashkey] = obj;
  // Add 1 to current size of hashtable
    this.currentSize++;
  // Else create a linked list 
  } else {
    this.storage[hashkey][key] = value;
    // Add 1 to current size of hashtable
    this.currentSize++;
  }
  // Check to see if current size is larger than 75% of hash table's size 
  // Rehash if it is
  if (this.currentSize >= .75 * this.SIZE) {
    this.rehash();
  }
};

// Create rehash function
HashTable.prototype.rehash = function() {
  // Need to keep track of variable to determine which way to resize?
  // Double the hashtable size
  this.SIZE *= 2; 
  // Half the hashtable size 
  this.SIZE = Math.floor(this.SIZE / 2);
  // Set the current size back to 0
  this.currentSize = 0;
  this.storage = new Array(this.size);

  // Run the set function on every object again with new size
  this.storage.forEach(obj => {
   let hashkey = hashcode(value, this.SIZE);
   if (!this.storage[hashkey]) { 
     let obj = {};
     obj[key] = value;
     this.storage[hashkey] = obj;
     this.currentSize++;
   } else {
     this.storage[hashkey][key] = value;
     this.currentSize++;
   }
  })

};

HashTable.prototype.get = function(key) {
  // Determine hashkey of key 
  let hashkey = hashCode(key, this.SIZE);
  // If there exists object in hashkey, return that object
  // Else return undefined
  if (this.storage[hashkey]) {
    return this.storage[hashkey][key];
  } else {
    return undefined;
  }
};

HashTable.prototype.remove = function(key) {
  // Find item you want to delete
  let delItem = this.get(key);
  // Determine hashkey of key 
  let hashkey = hashCode(key, this.SIZE);
  // If there exits an item to delete, delete it 
  // Else return undefined
  if (delItem) delete this.storage[hashkey][key]
    this.storage[hashkey] = undefined;
  // Decrement current size 
  this.currentSize--;
  // Check to see if current size is less than 25% of the size and greater than 16
  // If true then resize accordingly
  if (this.currentSize <= .25 * this.SIZE && this.SIZE > 16) {
    this.rehash();
  }
  // Return deleted item
  return delItem;
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
};

// Do not remove!!
module.exports = HashTable;

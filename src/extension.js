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

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.count = 0;
  this.storage = new Array(this.SIZE);
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
//each time set is called, increment the count of elements stored in the hash table
this.count ++
//if the count is equal or greater than 75 % of the hash table's size....
if (this.count/this.SIZE >= .75) {
  //double hashtable size
  this.SIZE *= 2

  //re-index all contents
  //for loop to iterate through all bins from 0 to old index
    //if there is a bin...
      //check if the keys at each bin are NOT equal to the bin number when run through the hash function
        //if not equal then use SET method to add the key value pair to the correct place
        //delete the key value pair from old bin

  for (let i = 0; i < this.SIZE/2; i++) {
    //if bin value is not null
    if (this.storage[i]) {
      for (let key in this.storage[i]) {
        let hash = hashCode(key)
        //if the hashcode is NOT equal to the index of this bin
        if (hash !== i) {
          this.set(key)
          delete this.storage[i][key]
        }
      }
    }
  }
}

//if bin has null value, add an empty object to the bin and then add key:value to it
let bin = hashCode(key, this.SIZE)
if (!this.storage[bin]) {
  this.storage[bin] = {}
  this.storage[bin][key] = value
} else {
  this.storage[bin][key] = value
}
};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
let bin = hashCode(key, this.SIZE)
if (this.storage[bin][key]) {
  return this.storage[bin][key]
} 
return undefined
};


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  
  //get hashcode
  let bin = hashCode(key, this.SIZE)
  //check if value at bin of storage is undefined
  if (!this.storage[bin][key]) {
    return undefined
  } else { 
  // otherwise, delete the value at the key in bin of storage
    delete this.storage[bin][key]
    //since an element was removed, decrement count
    this.count --
    //if the count is equal to or less than 25 % of the hash table's size....
    if (this.count/this.SIZE <= .25) {
 
    //re-index all elements to this.SIZE/2


    // THEN halve hashtable size
    this.SIZE /= 2
  }
 
  

 
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

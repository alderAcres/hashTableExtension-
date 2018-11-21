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

/*
APPROACH:
// - To Add Property: Completed (pseudocode pasted below)
 - To Remove Property:
  - After removing element, decrement this.filled
  - if (parseFloat(this.filled / this.SIZE) < 0.25)
    - 
    // - if parseFloat(this.filled / this.SIZE) > 0.74
    // - then this.SIZE *= 2;
    // - let oldTable = this.storage 
    // - let this.storage = new Array(this.Size)
    // - loop through oldTable:
    // - if (oldTable[i])
        // - for (let key in currentItem)
        // - this.add(key, currentItem[key]
*/

// PASTE AND MODIFY YOUR CODE BELOW

function HashTable() {
  this.SIZE = 16;
  // - create internal property (filled) that stores the percent filled up of hashTable
  this.filled = 0;
  this.storage = new Array(this.SIZE);
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  // - if parseFloat(this.filled / this.SIZE) > 0.74
  if (Math.round(parseFloat(this.filled / this.SIZE)) > 0.74) {
    // - then this.SIZE *= 2;
    this.SIZE *= 2;
    // - let oldTable = this.storage 
    let oldTable = this.storage;
    // - let this.storage = new Array(this.Size)
    this.storage = new Array(this.SIZE);
    // - loop through oldTable:
    for (let entry of oldTable) {
    // - if (oldTable[i])
      if (entry) {
        // - for (let key in currentItem)
        // - this.add(key, currentItem[key]
        for (let key in entry) {
          this.set(key, entry[key]);
        }
      }
    }
  }
  else {
    // Convert key to hash key
    let hashKey = hashCode(key, this.SIZE);
    // if (!hashTable[hashKey]):
    if (!this.storage[hashKey]) {
      // Create an object with the original key and value
      let newObj = {};
      newObj[key] = value;
      // Insert created object into hash table at the generated hash key
      this.storage[hashKey] = newObj;
    }
    // else
      // Add to existing object with the string key and value
    else {
      this.storage[hashKey][key] = value;
    }
    //   - After adding each item, increment this.filled property
    this.filled++; 
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
  // Generate hashKey using hashcode function
  let hashKey = hashCode(key, this.SIZE);
  // return this.storage[hashKey][key]
  return this.storage[hashKey][key];
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
  // Generate hashKey using hashCode function
  let hashKey = hashCode(key, this.SIZE);
  let deletedValue = this.storage[hashKey][key];
  // Delete property at this.storage[hashKey][key];
  delete this.storage[hashKey][key];
  this.filled--;

  // If hash table's SIZE > 16 && stored items less than 25% of hash table
  if (this.SIZE > 16 && Math.round(parseFloat(this.filled / this.SIZE)) < 0.25) {
    // - then this.SIZE /= 2;
    this.SIZE /= 2;
    // - let oldTable = this.storage 
    let oldTable = this.storage;
    // - let this.storage = new Array(this.Size)
    this.storage = new Array(this.SIZE);
    // - loop through oldTable:
    for (let entry of oldTable) {
    // - if (oldTable[i])
      if (entry) {
        // - for (let key in currentItem)
        // - this.add(key, currentItem[key]
        for (let key in entry) {
          this.set(key, entry[key]);
        }
      }
    }
  }


  return deletedValue;
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


// TEST CASES
let hashtable = new HashTable();
console.log(hashtable);
hashtable.set("hello", 4)
hashtable.set("hi", 5)
hashtable.set("bye", 6)
hashtable.set("buhbye", 7)
hashtable.set("howdy", 8)
hashtable.set("heyThere", 9)
hashtable.set("HeyThere", 10)
hashtable.set("HEYTHERE", 11)
hashtable.set("SUP", 15)
hashtable.set("BONJOURNO", 23)
hashtable.set("vannakam", 23)
console.log(hashtable)
hashtable.remove("HeyThere");
console.log(hashtable.filled)
console.log(hashtable.SIZE)
console.log(hashtable);
console.log(parseFloat(hashtable.filled / hashtable.SIZE))
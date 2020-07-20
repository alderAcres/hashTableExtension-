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
function HashTable(tableSize = 16) {
  this.SIZE = tableSize > 16 ? tableSize : 16; // set minimum table size as 16
  this.load = 0; // track hash table load

  this.storage = new Array(this.SIZE);
  // assign empty object to each index of storage array
  for (let i = 0; i < this.storage.length; i++) {
    this.storage[i] = {};
  }
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
  const hashedKey = hashCode(key, this.SIZE);
  
  // store key-value pair in object at hashed index, increment load
  this.storage[hashedKey][key] = value; 
  this.load++;

  // double table size if load ratio greater than 75%
  if ((this.load / this.SIZE) > 0.75) { 
    this.resize(this.SIZE * 2);
  }

  return this.load;
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
  const hashedKey = hashCode(key, this.SIZE);
  return this.storage[hashedKey][key] || null; // returns null if key not found
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
  const hashedKey = hashCode(key, this.SIZE);
  
  // store value to be deleted
  const removed = this.storage[hashedKey][key]

  // delete key-value pair at hashed index, decrement load
  delete this.storage[hashedKey][key];
  this.load--;

  // halve table size if load ratio less than 25%
  if ((this.load / this.SIZE) < 0.25) { 
    this.resize(this.SIZE / 2);
  }
 
  return removed;
};

HashTable.prototype.resize = function(tableSize) {
  const tempTable = new HashTable(tableSize);

  // iterate through all values in original hash table, reassign to temp hash table
  for (let bin of this.storage) {
    for (let item in bin) {
      tempTable.set(item, bin[item]);
    }
  }

  // assign size, load, and storage from temp hash table to original hash table
  this.SIZE = tempTable.SIZE;
  this.load = tempTable.load;
  this.storage = tempTable.storage;
}


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

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
function HashTable(size = 16) {
  this.SIZE = size;
  
  this.storage = new Array(this.SIZE);
  this.length = 0;
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
  let obj = { key, value, next: null};
  let index = hashCode(key, this.SIZE);
  let temp = this.storage[index];
  if (temp) {
    this.storage[index] = obj;
    obj.next = temp;
  } else
    this.storage[index] = obj;


  if (Math.ceil((this.length/this.SIZE) * 100) > 75) {
    this.updateSize(this.SIZE * 2);
  }

  return this.length += 1;
};

HashTable.prototype.updateSize = function (size) {
  let newHash = new HashTable(size);
  this.storage.forEach(({key, value, next}) => {
    newHash.set(key, value);
    if (next) {
      let temp = next;
      while (temp.next) {
        newHash.set(temp.key, temp.value);
        temp = temp.next;
      }
    }
  });
  this.storage = newHash.storage;
  this.SIZE = newHash.SIZE; 
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
  let temp = this.storage[hashCode(key, this.SIZE)];
  if (!temp) return;
  while (temp) {
    if (temp[key]) {
      let value = temp.value;
      return value;
    }
    temp = temp.next;
  }
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
  let temp = this.storage[hashCode(key, this.SIZE)];
  if (!temp) return;
  while (temp) {
    if (temp[key]) {
      let value = temp.value;
      temp = undefined;
      this.length -= 1;
      if (Math.ceil((this.length/this.SIZE) * 100) < 25 && this.SIZE > 16) {
        this.updateSize(this.size / 2);
      }
      return value;
    }
    temp = temp.next;
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

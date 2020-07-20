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
  this.numItems = 0;
  this.usage = function () {
    return this.numItems / this.SIZE * 100;
  }
}


HashTable.prototype.set = function(key, value) {
  let bin = hashCode(key, this.SIZE);
  if(this.usage() >= this.SIZE * .75) {
    this.SIZE *= 2;
    for (key in this.storage[bin]){

    }
  }
  if(!this.storage[bin]) {
    this.storage[bin] = {};
    this.storage[bin][key] = value;
    this.numItems++;
  } else {
    this.storage[bin][key] = value;
    this.numItems++;
  }
  console.log(this.usage())
  return this.numItems;
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
  let bin = hashCode(key, this.SIZE);
  let value = this.storage[bin][key];
  return value;
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
  let bin = hashCode(key, this.SIZE);
  let value = this.get(key);
  let deleted = delete this.storage[bin][key];
  this.numItems--
  return value;
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

// Tests:
let hashTable = new HashTable;
hashTable.set('first key', 'first value');
console.log(hashTable.set('second key', 'second value'));
hashTable.set('first key', 'new value'); // needs to not increment numItems
console.log(hashTable);
console.log(hashTable.get('first key'));
console.log(hashTable.remove('first key'));
console.log(hashTable);

// Do not remove!!
module.exports = HashTable;

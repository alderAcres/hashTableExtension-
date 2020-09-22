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
  let jumbledKey = hashCode(key, this.SIZE)
  if (this.storage[jumbledKey] === undefined) {
    this.storage[jumbledKey] = {}
  }
  // loop through and check to see how many values have been stored
  let counter = 0;
  for (let prop in this.storage) {
    if (this.storage[prop]) {
      counter++
    }
  }
  // double the size if 75% or more of values have been stored
  console.log('counter:' + counter)
  if ((counter / this.SIZE) > 0.75) {
    this.SIZE = this.SIZE * 2
    this.storage = new Array (this.SIZE)
  }
  console.log('this.size: ' + this.SIZE)
  // loop to the next available empty storage space and set the value at that location. Break the loop once the value is stored.
  for (let i = 0; i < this.SIZE; i++) {
    if (!this.storage[i] && this.storage[i-1] !== undefined) {
      this.storage[i] = value;
      break;
    }
  }
  // console.log('this.storage[jumbledKey][key]: ' +this.storage[jumbledKey][key])
  console.log('this.storage: ' +this.storage)
  console.log('this.storage[2] ' + this.storage[2])
  
  return this.storage;
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
  let jumbledKey = hashCode(key, this.SIZE)
  console.log(this.storage[jumbledKey][key])
  return this.storage[jumbledKey][key]
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
  let jumbledKey = hashCode(key, this.SIZE)
  if (this.storage[jumbledKey] === undefined) return undefined
  else {
    let removeMe = this.storage[jumbledKey][key];
    delete this.storage[jumbledKey][key];
    return removeMe;
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
let hashTable = new HashTable()
hashTable.set(2,5)
hashTable.set(3,4)
hashTable.set(4,6)
hashTable.set(5,7)
hashTable.set(10,6)
hashTable.set(9,6)
hashTable.set(8,6)
hashTable.set(7,6)
hashTable.set(15,6)
hashTable.set(14,3)
hashTable.set(13,2)
hashTable.set(12,5)
hashTable.set(11,7)
hashTable.set(1,4)
hashTable.set(16,8)

hashTable.get(2)
// Do not remove!!
module.exports = HashTable;

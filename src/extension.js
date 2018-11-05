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
  for (let i = 0; i < this.storage.length; i++) {
    this.storage[i] = {};
  }
  this.tracker = 0;
}
let test = new HashTable(10);
console.log(test);

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
  let index = hashCode(key, this.SIZE);
  this.storage[index][key] = value;
  this.tracker += 1;
  if (this.tracker > (this.SIZE * .75)) {
    this.SIZE *= 2;
    const collection = this.storage;
    for (let i = 0; i < collection.length; i++) {
     if (collection[i]) {
      for (let key in collection[i]) {
        index = hashCode(key, this.SIZE);
        collection[index][key] = collection[i][key]
      }
    }
    }
  }
};
console.log(test)
test.set('value 1', 1)
test.set('value 2', 2)
test.set('value 3', 3)
test.set('value 4', 4)
test.set('value 5', 5)
test.set('value 6', 6)
test.set('value 7', 7)
test.set('value 8', 8)
test.set('value 9', 9)
test.set('value 10', 10)
test.set('value 11', 11)
test.set('value 12', 12)
test.set('value 13', 13)
console.log(test)
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
  let index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};
console.log(test.get('value 2'))
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  delete this.storage[index][key];
};
test.remove('value 1');
console.log(test)


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

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
  let keys = Object.keys(this.storage);
  let values = Object.values(this.storage);
  console.log(values);
  console.log(keys);
  console.log(keys.length);
  console.log(keys);
  const address = hashCode(key, this.SIZE);
  this.storage[address] = value;
  let percentFull = (keys.length/this.SIZE) * 100;
  console.log(percentFull);
  if (percentFull >= 75) {
    this.SIZE = this.SIZE * 2;
    keys.every((key) => {
      let address = hashCode(key, this.SIZE);
      this.storage[address] = value;
    });
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
  return this.storage[hashCode(key, this.SIZE)];
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
  const address = hashCode(key, this.SIZE);
  delete this.storage[address];
  let keys = Object.keys(this.storage);
  let percentFull = (keys.length/this.SIZE) * 100;
  if(percentFull < 25 && this.SIZE > 16) {
    this.SIZE = this.SIZE/2;
    keys.every(key => {
      let address = hashCode(key, this.SIZE);
      this.storage[address] = value;
    })
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

let table = new HashTable();
table.set('value1', 1);
console.log(table.get('value1'));
table.set('value2', 2);
console.log(table.get('value2'));
table.set('value3', 3);
console.log(table.get('value3'));

console.log(table.get('value1'));
console.log(table.get('value2'));
console.log(table.get('value3'));

console.log(table.storage);
table.remove('value1');
console.log(table.storage);
console.log(table.get('value1'));
table.remove('value2');
console.log(table.storage);
console.log(table.get('value2'));
table.remove('value3');
console.log(table.storage);
console.log(table.get('value3'));

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
  this.currSize = 0;
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
  if (value === undefined || key === undefined) throw new Error ('Please provide both a key and a value using a string, number, or boolean');
  console.log(key);
  const index = hashCode(key, this.SIZE);
  console.log(index);
  const bucket = this.storage[index];
  if (bucket !== undefined && bucket[key] !== undefined) {
    bucket[key] = value
    return this.currSize;
  }
  this.currSize++;
  console.log(this.currSize);
  console.log(this.SIZE);
  console.log(this.currSize / this.SIZE)
  if (this.currSize / this.SIZE >= .75) {
    //expand table
    //rehash
  }
  if (!bucket) {
    this.storage[index] = {};
    this.storage[index][key] = value;
    return this.currSize;
  }
  if (!bucket[key]){
    this.storage[index][key] = value;
    return this.currSize;
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
  const index = hashCode(key, this.SIZE);
  console.log(index);
  if (this.storage[index] === undefined) throw new Error ('The key provided is not stored within the hash table')
  console.log(this.storage[index][key])
 if (this.storage[index][key] !== undefined) return this.storage[index][key];
};

const table = new HashTable();



/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE);
  console.log(index);
  if (this.storage[index] === undefined || this.storage[index][key] === undefined) return undefined;
  const output =  this.storage[index][key]
  delete this.storage[index][key]
  this.currSize--;
  return output;
};

console.log(table);
console.log(table.set('Jarred',5));
console.log(table);
console.log(table.get('Jarred'));
console.log(table.set('test','123'));
console.log(table.set(1,1));
console.log(table.set(3,5));
console.log(table.set(4,5));
console.log(table.set(5,5));
console.log(table.set(6,5));
console.log(table.set(7,5));
console.log(table.set(8,5));
console.log(table.set(9,5));
console.log(table.set(10,5));
console.log(table.set(11,5));
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

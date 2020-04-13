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
// add value to hashtable with given key
// if key exists update value
// handle collisions
  const hashVal = hashCode(key, this.SIZE);
  if(this.SIZE === this.SIZE * 0.75){
    this.SIZE = this.SIZE * 2;
    const hashVal = hashCode(key, this.SIZE);
  }

  if(this.storage[hashVal]){
  this.storage[hashVal][key] = value;
  }

  else{
    this.storage[hashVal] = {};
    this.storage[hashVal][key] = value;
  }
};

let newHash = new HashTable();
newHash.set('1', 22);
newHash.set('11', 12);
newHash.set('1', 18);
newHash.set('0', 15);
newHash.set('33', 9);
newHash.set('5', 99);
newHash.set('14', 4);
newHash.set('88', 12);
newHash.set('90', 92);
newHash.set('48', 38);
newHash.set('27', 85);
newHash.set('3', 91);
newHash.set('9', 9);
newHash.set('42', 4);
newHash.set('92', 2);
newHash.set('19', 22);

console.log(newHash.storage)
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
// access value at given key;
// get specified key if both are at the same address
  const hashVal = hashCode(key, this.SIZE);
  return this.storage[hashVal][key];
};

console.log(newHash.get('1'))
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // get value at specified key
  // store value
  // delete key:value pair
  // return out the deleted value
  // if the value doesnt exit return undefineds
  const hashVal = hashCode(key, this.SIZE);

  if(!this.storage[hashVal][key]) return undefined;
  const deletedVal = this.storage[hashVal][key];
  delete this.storage[hashVal][key];

  if(Math.floor(this.storage.length / this.SIZE) <= 0.25){
    this.SIZE = this.SIZE/2;
    const hashVal = hashCode(key, this.SIZE);
  }
  return deletedVal;
};

console.log(newHash.remove('0'))


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

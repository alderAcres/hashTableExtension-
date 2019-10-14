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
HashTable.prototype.set = function (key, value) {
  // passing the key and the default size into hashCode to find the index (insertion point) 
  let insertionPt = hashCode(key, this.SIZE);
  // console.log(insertionPt);
  // if at the insertion point of the array is undefined -> we put an empty object and then populate with key value pair
  if (this.storage[insertionPt] === undefined) {
    this.storage[insertionPt] = {};
  }
  this.storage[insertionPt][key] = value;
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
HashTable.prototype.get = function (key) {
  // passing the key and the default size into hashCode to find the index (insertion point)
  let insertionPt = hashCode(key, this.SIZE);

  // go to the insertion point (index) in the this.storage array and use key to find value to return 
  return this.storage[insertionPt][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  // passing the key and the default size into hashCode to find the index (insertion point)
  let insertionPt = hashCode(key, this.SIZE);

  // store the item that you want to remove in a variable
  const itemToRemove = this.storage[insertionPt][key];

  // delete the key value pair in the object
  delete this.storage[insertionPt];

  // return the item to remove that you stored
  return itemToRemove;
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

// TEST~
let newHashTable = new HashTable;
newHashTable.set('codesmith', 16);
newHashTable.set('bye', 16);
newHashTable.get('codesmith');
// console.log(newHashTable.get('codesmith'));
// newHashTable.remove('codesmith');
console.log(newHashTable);

// Do not remove!!
module.exports = HashTable;

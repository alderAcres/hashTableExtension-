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

const newTable = new HashTable();

console.log(newTable);

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

/*
input: key, value
output: number
goal: add a given value to the hash table at the specified key
goal: return the new number of items stored in the hash table
note: If the provided key has already been used to store another value, simply overwrite the existing value with the new value.
note: If the hashed address already contains another key/value pair, you must handle
the collision appropriately.
AITC: Yes
*/

HashTable.prototype.set = function(key, value) {
  const hashedKey = hashCode(key, this.SIZE);
  // set given value of the hashtable at the given key
  // increment length by 1
  this.storage[hashedKey] = value;
  // handle the collision
    // BUT HOW!
  // return the new number of items stored in the hash table
  return this.SIZE;
};

newTable.set('right', true);
// console.log(newTable);

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

/*
input: key (string)
output: value
goal: retrieve a value stored in the hash table at the given key
note: If more than one value is stored at the key's hashed address, then you must retrieve the correct value that was originally stored with the provided key
edge: none
AITC: maybe?
*/
HashTable.prototype.get = function(key) {
  const hashedKey = hashCode(key, this.SIZE);
  // return the value at the given key in the hash table
  return this.storage[hashedKey];
};

console.log(newTable.get('right'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

/*
input: key (string)
output: value
goal: delete a key/value pair from the hash table
edge: if the key does not exist in the hash table, return undefined
AITC: Yes
*/
HashTable.prototype.remove = function(key) {
  let hashedKey = hashCode(key, this.SIZE);
  // define a temp variable to hold the deleted key to be returned
  const temp = hashedKey;
  // if the key does not exist at the hash table, return undefined
  if (!this.storage[hashedKey]) return undefined;
  // move over every index and value to account for the deleted key-value pair
  for (let i = hashedKey; i < this.SIZE; i += 1) {
    // decrement the value;
    this.storage[hashedKey] -= 1;
    // BUT HOW DO I SHIFT OVER THE INDEX?
  }
  // delete the key/value pair from the hash table
  delete this.storage[hashedKey];
  // return the deleted value
  return temp;
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

// Do not remove!!
module.exports = HashTable;

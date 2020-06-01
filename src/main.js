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
  // set index to result of running hashfunction on key
  let index = hashCode(key, this.SIZE);
  // create a new map if the index at HashTable is empty
  if (!this.storage[index]) {
    this.storage[index] = new Map();
    // this.storage[index][key] = value;
    this.storage[index].set(key, value);
  } else {
    // this.storage[index][key] = value;
    this.storage[index].set(key, value);
  }
};

let hashtable = new HashTable;
hashtable.set('kevin', 'ruan')
hashtable.set('new', 'york')
hashtable.set('basket', 'ball')
hashtable.set('new', 'hampshire') // overwrite key testing
// console.log(hashCode('kevin', 16))
console.log(hashtable)

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
  // go to the map at the index
  // loop over the map to find the key and return VALUE

  // account for undefined indexes
  if (!this.storage[index]) return 'not a valid key'; //FIX?: should return undefined?

  for (let [findMe, value] of this.storage[index]) {
    if (findMe === key) return value;
  }
   // if we don't find key 
    return 'not a valid key';
};

// console.log(hashtable.get('new'))

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
  // if index at storage is undefined
  if (!this.storage[index]) return undefined;
  for (let [findMe, value] of this.storage[index]) {
    if (findMe === key) this.storage[index].delete(key);
    return;
  }
  // return undefined after loop ends
  return undefined;
};
// hashtable.remove('kevin')
// console.log(hashtable);

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

// let hashtable = new HashTable;
// hashtable.set('kevin', 'ruan')
// console.log(hashCode('kevin', 16))
// console.log(hashtable)

// Do not remove!!
module.exports = HashTable;

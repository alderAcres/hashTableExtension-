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

  // EXTENSION:
  let takenSpots = 0;
  for (let i = 0; i < this.storage.length; i += 1) {
    if (this.storage[i] !== undefined) takenSpots += 1;
  }
  // console.log('takenSpots', takenSpots)

  // if adding the element would push storage items to over 75% of the hash table's SIZE
  // double the hash table's SIZE and rehash everything
  let rehashStorage;
  let seventyFive = (this.SIZE * 3) / 4
  // if spots are over 75% 
  if (takenSpots > seventyFive) {
    // double the hash size
    this.SIZE = this.SIZE * 2;
    rehashStorage = new Array(this.SIZE);
  };
  // rehash everything
  this.storage.forEach(map => {
    // loop over map and run each key on hashing function
    for (let [key, value] of map) {
     let index = hashCode(key, this.SIZE);

    }
  })
 // set storage to rehashStorage

};

HashTable.prototype.testing = function() {
  this.SIZE = this.SIZE * 2;
  this.storage = new Array(this.SIZE);
  console.log(this.storage);
}
let hashtable = new HashTable;
hashtable.set('kevin', 'ruan')
hashtable.set('new', 'york')
hashtable.set('basket', 'ball')
console.log(hashtable.testing())


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

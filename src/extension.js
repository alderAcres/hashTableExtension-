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
  this.amount = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.reHash = function(newSize) {
  // create an object for storing key: value pairs
  const tempStorage = {};
  // loop through storage arr
  for (let i = 0; i < this.storage.length; i++) {
    // let contents = this.storage[i]
    // for each spot in storage
      // if it doesn't === undefined or an empty obj
      // grab every key: value pair in the obj into the array
  }
  // set this.storage = new Array(newSize)
  // set this.SIZE = newSize;
  // loop through key:value pairs in the obj and rehash (SET) with the new size
}

const ht = new HashTable();

console.log( ht.set('hello2', 'jake') )
console.log( ht.set('hello6', 'jake') )
console.log( ht.get('hello2'))
console.log(ht.amount)
console.log(ht)
console.log( ht.remove('hello2'))
console.log(ht.amount)
console.log(ht)
console.log( ht.get('hello2'))


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
  // if the value ADDED will push to the amount over 75% of the storage
  // double the size of the storage and re-hash everything (reHash helper function?)
  if ((this.amount + 1)/this.SIZE > 0.75) {
    this.reHash(this.SIZE * 2);
  }
  
  const hashedKey = hashCode(key, this.SIZE);
  if (!this.storage[hashedKey]) {
    const bucketObj = {};
    bucketObj[key] = value;
    this.storage[hashedKey] = bucketObj;
  } else {
    bucketObj.key = value;
  }
  this.amount++;
  return this.amount;
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
  const hashedKey = hashCode(key, this.SIZE);
  return this.storage[hashedKey][key];
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
  // if this.SIZE > 16 &&
  // if the value REMOVED will push to the amount under 25% of the storage
  // halve the size of the storage (rounded DOWN) and re-hash everything (reHash helper function?)
  if (this.SIZE > 16 && ((this.amount - 1)/this.SIZE) < 0.25) this.reHash( Math.floor(this.SIZE/2) );

  const hashedKey = hashCode(key, this.SIZE);
  const storedVal = this.storage[hashedKey][key];
  console.log( this.storage[hashedKey] );
  delete this.storage[hashedKey][key]
  this.amount--;
  // leaves an empty object, but still works with all the logic because it's falsy
  return storedVal;
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

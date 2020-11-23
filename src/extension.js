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
  // create variable used to assess the used buckets in hash
  let usedSpace = 0;
  // iterate through buckets, assess which are being used
  for (let i = 0; i < this.storage.length; i += 1) {
    if (this.storage[i]) usedSpace += 1;
  }
  // if the used space is greater than 75% of total, do the following
  if (usedSpace > (this.SIZE * 0.75)) {
    // create const oldSize, to keep track of the buckets that will have values in them
    const oldSize = this.SIZE;
    // double size of hash
    this.SIZE *= 2;
    // iterate through
    for (let i = 0; i < oldSize; i += 1) {
      const toRehash = new Map(this.storage[i]);
      console.log('toRehash', toRehash);
      delete this.storage[i];
      for (let prop in toRehash) {

      }
    }
  }
  // create a const index, assign a unique location within the hashtable by using hashfunction
  const index = this.storage[hashCode(JSON.stringify(key), this.SIZE)];
  // test if the bucket being accessed in hash has a value stored in it
  if (!this.storage[hashCode(JSON.stringify(key), this.SIZE)]) {
    // if so, store an empty object literal in this bucket to handle collisions
    this.storage[hashCode(JSON.stringify(key), this.SIZE)] = {};
    // create a key/value pair with entered in arguments in the object literal nested in the bucket
    this.storage[hashCode(JSON.stringify(key), this.SIZE)][key] = value;
  } else {
    // if the bucket already has a value stored in it, create a key/value pair with the arguments
      // in the object stored there
    this.storage[hashCode(JSON.stringify(key), this.SIZE)][key] = value;
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
  // return the value stored at address main from entering the input as an argument to hashCode 
  // at the key of input
  return this.storage[hashCode(JSON.stringify(key), this.SIZE)][key];
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
  // save the value stored at address main from entering the input as an argument to hashCode 
  // at the key of input
  const value = this.storage[hashCode(JSON.stringify(key), this.SIZE)][key];
  // delete the key/value pair at this key
  delete this.storage[hashCode(JSON.stringify(key), this.SIZE)][key];
  return value;
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

/*******************Test Suite *************************/
const testHash = new HashTable();
// test initial contents of hash
console.log('testHash:', testHash);
for (let i = 0; i < 18; i += 1) {
  testHash.set(`key${i}`, `value${i}`);
}
// test set method
console.log('testHash:', testHash);
testHash.set('key5', 'newValue');
console.log('testHash:', testHash);
// test get method
console.log('testHash.get(\'key10\'):', testHash.get('key10'));
console.log('testHash.get(\'key16\'):', testHash.get('key16'));
// test remove method
console.log('testHash.remove(\'key16\'):', testHash.remove('key16'));
console.log('testHash.remove(\'key10\'):', testHash.remove('key10'));
console.log('testHash.get(\'key10\'):', testHash.get('key10'));
console.log('testHash.get(\'key16\'):', testHash.get('key16'));
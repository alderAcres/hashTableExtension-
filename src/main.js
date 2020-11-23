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
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
HashTable.prototype.set = function(key, value, hashLength = 0) {
  // check if adding the value is makes the total of all values greater than 75%
  let oldHashLength = hashLength;
  console.log(oldHashLength);
  for (let i = 0; i < this.storage.length; i++){
    if (this.storage[i]){
      let keys = Object.keys(this.storage[i])
      hashLength += keys.length;
    } else {hashLength += 0}
  }
  if (hashLength <= oldHashLength * .75) {
    this.SIZE *= 2;
    return this.set(key, value, hashLength)
  } 
  // we need to get the value of the hash function of key
  let hashInd = hashCode(key, this.SIZE);
  // check to see if there is anything at the index provided by the hash function
  if (!this.storage[hashInd]) {
    // if empty we would create an empty object with the key value pair
    this.storage[hashInd] = {};
    this.storage[hashInd].key = value;
  } else {
    // we would add the key value pair into the hash table
    this.storage[hashInd].key = value;
  }
  console.log(hashLength);
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
  // need to find the object at the hash index
  let hashInd = hashCode(key, this.SIZE);
  // return the key at that has index
  return this.storage[hashInd].key;
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
  // find the object at the hash index
  let hashInd = hashCode(key, this.SIZE);
  // hold the value at the key
  let hold = this.storage[hashInd].key;
  // remove the key value pair with key as key
  delete this.storage[hashInd].key;
  // return the value
  return hold;

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
  // need to find the object at the hash index
  let hashInd = hashCode(key, this.SIZE);
  // return the key at that has index
  return this.storage[hashInd].key;
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
  // find the object at the hash index
  let hashInd = hashCode(key, this.SIZE);
  // hold the value at the key
  let hold = this.storage[hashInd].key;
  // remove the key value pair with key as key
  delete this.storage[hashInd].key;
  // return the value
  return hold;

};

let hashTable = new HashTable();
console.log(hashTable.set('first key', 'first value'));
console.log(hashTable.set('second key', 'second value'));
console.log(hashTable.set('third key', 'third value'));
console.log(hashTable.set('forth', 'forth value'));
console.log(hashTable.set('fifth key', 'fifth value'));
// console.log(hashTable.get('first key')); //.to.be('first value');
// console.log(hashTable.get('second key')); //.to.be('second value');
// console.log(hashTable.storage.length); //.to.eql(16);
// console.log(hashTable.remove('first key')); // .to.eql('first value');
// console.log(hashTable.get('first key')); // .to.eql(undefined);

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

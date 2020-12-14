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
  let hashCount = 2;
  for (let i = 0; i < hashTable.storage.length; i++) {
    if (hashTable.storage[i]) hashCount += 1;
  }
  console.log(hashCount)
  if (hashCount / hashTable.storage.length > .75) {
    hashTable.SIZE *= 2
  }
  console.log(hashTable.SIZE)
  // set hash number for current function calling using hash code
  const hash = hashCode(key, this.SIZE)
  // set the give key and value as an object at the calculated current hash = value will overwrite if key has already been used
  // need to use bracket notatioin on key b/c it's a variable
  hashTable.storage[hash]= {[key]: value};
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
  // find has for key that we are looking up
  const hash = hashCode(key, this.SIZE)
  // return the value of the key that we are looking up making sure to only return the value of key we are looking up if there is more than one property stored at the hash
  return hashTable.storage[hash][key];
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
  // set hash for remove function call
  const hash = hashCode(key, this.SIZE)
  // if the property doesn't exist at the hash, return undefined
  if (hashTable.storage[hash] === undefined) return undefined;
  // otherwise delete the property at the hash.
  delete hashTable.storage[hash]; 
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

const hashTable = new HashTable();
hashTable.set('test1', 1)
hashTable.set('test2', 2)
hashTable.set('test3', 3)
hashTable.set('test4', 4)
hashTable.set('test5', 5)
hashTable.set('test6', 6)
hashTable.set('test7', 7)
hashTable.set('test8', 8)
hashTable.set('test9', 9)
hashTable.set('test10', 10)
hashTable.set('test11', 11)
hashTable.set('test12', 12)
hashTable.set('test13', 13)
hashTable.set('test14', 14)
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

HashTable.prototype.set = function (key, value) {
  // get the index using the hashCode function to hash the key
  let index = hashCode(key, this.SIZE);
  // if nothing exists within the storage, set this.storage[index] to be equal to an empty object
  if (this.storage[index] === undefined) this.storage[index] = {};
  // then set the key value pair within the object of this.storage[index]
  this.storage[index][key] = value;

  this.rehash("expand")

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
  const index = hashCode(key, this.SIZE);
  // if there is a value within this.storage[index], then return the value corresponding to the key parameter. 
  if (this.storage[index]) return this.storage[index][key];
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
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) return undefined;
  else delete this.storage[index][key];

  this.rehash("shrink")
};

HashTable.prototype.rehash = function (expand) {
  // Strategy:
  // Be able to check if the stored items are over 75% of this.SIZE or less than 25% of this.SIZE
      // loop through this.storage to count if the number of stored item is > this.SIZE * .75 or < this.SIZE * .25
  // If yes, rehash everything by rehashing everything
  let currStorage = this.storage.filter(item => !(!item))
  // console.log("curr", currStorageSize.length)
  if (currStorage.length < this.SIZE * 0.25 || currStorage.length >  this.SIZE * 0.75) {
    let newStorage = []
    for (let chunk of currStorage) {
      let index;
      for (let key in chunk) {
        index = hashCode(`${key}`, expand === "expand" ? this.SIZE * 2 : this.SIZE / 2);
        // if nothing exists within the storage, set this.storage[index] to be equal to an empty object
        if (newStorage[index] === undefined) newStorage[index] = {};
        // then set the key value pair within the object of this.storage[index]
        newStorage[index][key] = chunk[key];
      }
    }
  // double the hash table's SIZE
    expand === "expand" ? this.SIZE *= 2 : this.SIZE /= 2;
  // rehash everything by setting this.storage to be a copy of the newStorage
    this.storage = [...newStorage]
  }
}

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
let hashTable = new HashTable();

hashTable.set("lucy", "says hi")
hashTable.set("justin", "says hello")
// hashTable.set("luis", "says ello")

console.log(hashTable.get("lucy"))
console.log(hashTable.get("justin"))
// console.log(hashTable.get("luis"))
console.log(hashTable)

// Do not remove!!
module.exports = HashTable;

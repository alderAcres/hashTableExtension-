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
  this.length = 0;
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
  if(this.length / this.SIZE > 0.75) { // if more than 75% storage, update
    this.SIZE *= 2; // double the size
    const oldStorage = this.storage; // get reference to the storage
    this.storage = new Array(this.SIZE); // create new storage with this.SIZE
    this.length = 0; // set counter to zero
    for(let i = 0; i < oldStorage.length; i++) { // iterate through old storage and set
      for(let oldKey in oldStorage[i]) { // iterate through the key and value pair stored in the old storage and call set (recursion)
        this.set(oldKey, oldStorage[i][oldKey]);
      }
    }
  }
  const index = hashCode(key, this.SIZE);
  let sameKey = false;
  if(this.storage[index]) { // check if storage at the index has object
    for(let thisKey in this.storage[index]) { // check if the input key exists in the object
      if(thisKey === key) { // if input key exists, then set flag to true for later usage
        sameKey = true;
      }
    }
    // *update or *create key and value pair
    this.storage[index][key] = value;
  } else {
    // create new object with key and value pair,
    // and assign it to storage at the hashcode index
    this.storage[index] = {[key]: value};
  }
  if(!sameKey) this.length++; // if input key is new to the storage, then increment the counter
  return this.length;
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
  const index = hashCode(key, this.SIZE);
  // if storage at the index has object stored, then return the value matching the key from the object;
  // otherwise, return undefined (this.storage[index])
  return this.storage[index] ? this.storage[index][key] : undefined;
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
  const index = hashCode(key, this.SIZE);
  let value = undefined;
  if(this.storage[index]) { // check if storage at the index has object
    if(this.storage[index].hasOwnProperty(key)) { // check if object has matching key and value pair
      // copy *primitive type* the value stored at the object with key matching
      value = this.storage[index][key];
      delete this.storage[index][key]; // remove the key and value pair from the object
      this.length--;
    }
  }
  // if less than 25% storage and SIZE is greater than 16, update hash table
  if(this.length / this.SIZE < 0.25 && this.SIZE > 16) {
    this.SIZE /= 2; // the size divided by 2
    const oldStorage = this.storage; // get reference to the storage
    this.storage = new Array(this.SIZE); // create new storage with this.SIZE
    this.length = 0; // set counter to zero
    for(let i = 0; i < oldStorage.length; i++) { // iterate through old storage and set
      for(let oldKey in oldStorage[i]) { // iterate through the key and value pair stored in the old storage and call set (recursion)
        this.set(oldKey, oldStorage[i][oldKey]);
      }
    }
  }
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

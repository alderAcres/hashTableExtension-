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
  // added variable to track current number of Hashtable elements
  this.storageLength = 0;
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
  // assume to handle collisions we will store all key/value pairs
  // within an object.

  // call hashCode to determine storage index
  let storageIndex = hashCode(key, this.SIZE);

  /*

    Psuedocode for resize
    * Determine what 75% of HashTable is and store in a variable x
    * Cycle thru Hashtable and tally current used elements. if the current tally
      equals or greater than x-1 then resize hash
        * Copy this.storage to tempLocation
        * Double this.SIZE
        * Create new HashMap with new this.SIZE and assign to storage
        * ForEach item in tempLocation insert into new this.storage using this.set()
        

  */

  // create storageObject if not exist
  if((this.storage[storageIndex] === undefined) || (this.storage[storageIndex] === null)) {
    this.storage[storageIndex] = new Object();
  }
  // Insert Key/Value pair to this.storage[storageIndex][key] equals value
  // if key exists overwrite the value.  Do not increment storageLength if exists
  if((this.storage[storageIndex][key] === undefined) || (this.storage[storageIndex][key] === null)){
    // increment the Hashtable size by 1 if not an overwrite
    this.storageLength += 1;
  }

  // insert/overwrite value
  this.storage[storageIndex][key] = value;

  // return the current size of the Hashtable
  return this.storageLength;
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

  let output;

  // call hashCode to determine storage index
  storageIndex = hashCode(key, this.SIZE);

  // retrieve value from storage assuming an object at element position stores key/values
  // read only if object is not null or undefined
  if((this.storage[storageIndex] !== undefined) && (this.storage[storageIndex] !== null)) {
    output = this.storage[storageIndex][key];
  }

  // return value
  return output;
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

  let output;

  // call hashCode to determine storage index
  storageIndex = hashCode(key, this.SIZE);

  // retrieve value from storage assuming an object at element position stores key/values
  // read only if object is not null or undefined
  if((this.storage[storageIndex] !== undefined) && (this.storage[storageIndex] !== null)) {
    output = this.storage[storageIndex][key];
    delete this.storage[storageIndex][key];

    // decrement this.storageLength
    this.storageLength -= 1;
  }

  // return output
  return output;

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

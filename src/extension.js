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
  this.itemsStored = 0;
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
  // Step 1. trigger hasCode function to generate new hash key by passing in the key and value parameters
  let hashKey = hashCode(key, this.SIZE);

  // Step 2. Check to see if key in hashtable is defined or not
  if (this.storage[hashKey] !== 'undefined') {

    // Step 3. If hashkey is defined set it equal to your key parameter value
    this.storage[hashKey] = value;

    // Step 4. Update items stored number
    this.itemsStored++;

    // Step 5. Return the new number of keys stored in table
    //return this.itemsStored;

    // Return new table
    return this.storage[hashCode(key, this.SIZE)][key];
  }


  // Increase Table
  if (this.itemsStored >= (this.SIZE)*.75){
    this.SIZE = this.SIZE * 2;
    return this.storage[hashCode(key, this.SIZE)][key];
  }

  // Step 6. If key is undefined, handle the collision by creating a new object
  // Step 6a. Create new object literal
  let collisionObj = {};

  // Step 6b. Set collision objects key = value using parameters
  collisionObj[key] = value;

  // Step 6c. Set the hashtable key equal to the newly created object
  this.storage[hashCode(key, this.SIZE)] = collisionObj;


  // Step 6d. Update items stored number
  this.itemsStored++;

  // return collision obj;
  return collisionObj[key];
  // // Step 6e. Return the new number of keys stored in table
  // return this.itemsStored;
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
  // Step 1. trigger hasCode function to generate new hash key by passing in the key and value parameters
  let hashKey = hashCode(key, this.SIZE);

  // Step 2. Find value of this.storage @ poisition key and return it
  return this.storage[hashCode(key, this.SIZE)][key];
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
  // Step 1. trigger hasCode function to generate new hash key by passing in the key and value parameters
  let hashKey = hashCode(key, this.SIZE);

  // Step 2. Create a let variable to cache the original value of the key on the hashtable
  let hashKeyCache = this.storage[hashKey][key];

    // Decrease Table
    if (this.itemsStored < (this.SIZE)*.25){
      this.SIZE = this.SIZE/2;
      return this.storage[hashCode(key, this.SIZE)][key];
    }

  // Step 3. Check if key exists to begin 
  if (hashKeyCache === 'undefined') {
    return 'undefined';
  }

  // Step 4. Delete the actual key element
  delete this.storage[hashKey][key];

  // Step 5. Update items stored number
  this.itemsStored--;

  // Step 6 Return the original value you cached when the prototype was initiated
  return hashKeyCache;

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

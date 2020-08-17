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
  // convert key into a hashed position using our hash function
let hashed = hashCode(key, this.SIZE);

  // retrieve the stored array at that location
  //ex: [[[1,2],[1,4]],[[2,10]]]
let retrieve = this.storage[hashed];
  // retrieve = [[1,2],[1,4]]

  // if retrieve doesn't exist
  // then we create an empty array []
  // and then store that inner array at that position
if (!retrieve) {
  let innerarray = [];
  this.storage[hashed] = innerarray;
  }

let collision = false;
  // check to see if there is a collision by looping through the innerarray
  //[[1,2],[1,4]]
  //keyvalue = [1,2]
  //if key[0] === key then override it with the current value
for (let i = 0; i < retrieve.length; i++) {
  let keyvalue = retrieve[i];
    if (keyvalue[0] === key) {
      keyvalue[1] = value;
      let collision = true;
    }
  }

  // if no collision; push [1,2] into our retrieve which was the contents at this.storage[hashed]
if (!collision) {
  retrieve.push([key, value]);
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
HashTable.prototype.get = function (key) {
  // convert key into a hashed position using our hash function
let hashed = hashCode(key, this.SIZE);
  // return the collection of key/value pairs stored at this hash location
let retrieve = this.storage[hashed];
  // if nothing then return false
if (!retrieve) {
  return null;
  }
  // if it does exist, iterate through the collection, and return the values of all the key
for (let i = 0; i < retrieve.length; i++) {
  let innervalue = retrieve[i];
    if (innervalue[0] === key) {
      return innervalue[1];
    }
  }

return null;
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
  // ran out of time, but basically you'll need to iterate through the hash, and then its innerelements and check to see if any existing keys that match the passed in key, delete all the key/value pairs 
};

// Do not modify
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

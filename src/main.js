/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 *
 * @format
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
  //find hash
  const hash = hashCode(key, this.SIZE);

  //check if object already exists - if not create one
  //store key value pair in object located at hash
  if (this.storage[hash] !== undefined) {
    this.storage[hash][key] = value;
  } else {
    const obj = {};
    obj[key] = value;
    this.storage[hash] = obj;
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
HashTable.prototype.get = function (key, cb = (obj, k) => obj[k]) {
  //find hash
  const hash = hashCode(key, this.SIZE);
  //create a temp variable to refer to object sotred at hash location
  const obj = this.storage[hash];
  //if nothing is at the location then return undefined
  if (obj === undefined) return;
  //otherwise run callback funciton - default call back is to simply return the value
  return cb(obj, key);
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
  //find hash
  const hash = hashCode(key, this.SIZE);
  //create callback function to delete the stored key value pair fromt he object and return the value
  const cb = function (obj, k) {
    const temp = obj[k];
    delete obj[key];
    return temp;
  };
  //use get logic to find and remove key value pair
  return this.get(key, cb);
};

// Do not modify
function hashCode(string, size) {
  "use strict";

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

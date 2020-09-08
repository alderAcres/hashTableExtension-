/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  //our array size will be a predetermined size of 16
  this.SIZE = 16;
  //instantiate a new array with 16 undefined as its elements. Assign this new array
  // as to the storage property on our "this" object.
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
  let index = hashCode(key, this.SIZE);
  //if the hashCode index has not already been assigned to a place in the array, then store
  //our key/value as an object on that array's index.
  if (this.storage[index] === undefined) {
    //assign our hashCode index on the array an empty object.
    this.storage[index] = {};
  }
  //on this object assign it with our passed in key/value pair.
  this.storage[index][key] = value;
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

// //Issue: removing "nelson" key seems to leave an empty object in place of it. We need to redefine our removed index to undefined.
//          ran out of time, but need to fix this for remove function to work.
HashTable.prototype.remove = function (key) {
  //call hashCode returns an index that is assigned to our passed in key
  let indexToRemove = hashCode(key, this.SIZE);
  //store it in temp variable so that we may delete it and also return it.
  let removedValue = this.storage[indexToRemove][key];
  delete this.storage[indexToRemove][key];
  return removedValue;
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

//my created console.log test cases:
// const hash = new HashTable();
// hash.set("Nelson", "Braeburn Dr");
// console.log(hash.get("Nelson"));
// console.log(hash.storage);

// console.log(hash.remove("Nelson"));

// //Issue: removing nelson seems to leave an empty object in place of it. We need to redefine our removed index to undefined
// console.log(hash.storage);

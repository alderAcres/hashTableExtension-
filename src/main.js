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
  // console.log(this.storage);
  const index = hashCode(key, this.SIZE);
  // bucket is empty, create a new array and push key, value
  if (this.storage[index] === undefined) {
    const arr = [];
    this.storage[index] = arr;
    arr.push([key, value]);
  } else {
    // bucket is not empty, push key, value
    let arr = this.storage[index];
    arr.push([key, value]);
  }
};

// console.table(ht.storage);
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
  // if bucket is empty
  if (this.storage[index] === undefined) {
    throw new Error("key does not exist in table");
  }
  // if bucket isn't empty, then pass the ref to the existing arr in a var for convenience
  const arr = this.storage[index];
  // traverse through array for key then return value
  let value;

  for (let currEl of arr) {
    if (currEl[0] === key) {
      value = currEl[1];
      break;
    }
  }

  return value;
};

// tests
const ht = new HashTable();
// //test for collision
// ht.set("billy", 01);
// both these keys result in the same index
// ht.set("kate", 44);
// ht.set("lkph", 52);

// console.log(ht.get("lkph"));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {};

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

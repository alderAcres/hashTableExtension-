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
  this.hash = key => {
    return key.toString().length % this.SIZE;
  };
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
  let index = this.hash(key);
  // console.log(index, key, value);
  if (!this.storage[index]) {
    this.storage[index] = [];
  }
  this.storage[index].push([key, value]);
  return index;
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
  console.log("Getting...");
  let index = this.hash(key);
  if (!this.storage[index]) return null;
  for (let entry of this.storage[index]) {
    if (entry[0] === key) {
      return entry[1];
    }
  }
};

/**
 * remove - delete a key/value pair from the hash table
 * - If the key does not exist in the hash table, return undefined
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
  let index = this.hash(key);
  for (let entry of this.storage[index]) {
    console.log("Checking hash table...", entry, this.storage[index]);
    if (entry[0] === key) {
      console.log("deleting...", entry);
      this.storage[index].pop();
    }
  }
  return key + " deleted";
};

const myTable = new HashTable();
// console.log(myTable);
myTable.set("Test String", 5);
myTable.set("Other String", 1);
myTable.set("Still Another String", 7);
myTable.set("Still Another String", -999);
// console.log(myTable);
// console.log(myTable.get("Test String"));
console.log(myTable.remove("Test String"));
console.log("Removed?", myTable.storage);

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

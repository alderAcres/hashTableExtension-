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
  let hashNum = hashCode(key, this.SIZE); // gets unique id form hash
  if (!this.storage[hashNum]) this.storage[hashNum] = {};
  this.storage[hashNum][key] = value;
  return this;
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
  let hashNum = hashCode(key, this.SIZE); // gets unique id form hash
  //check if there's value with specific key
  if (!this.storage[hashNum]) return undefined;
  return this.storage[hashNum][key];
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
  let hashNum = hashCode(key, this.SIZE); // gets unique id form hash
  //find the specific key/value in the stored in hash
  //if it doesn't exist, do nothing

  //if exist, stored temp variable for value
  //delete that key value pair
  if (!this.storage[hashNum][key]) return undefined;
  let temp = this.storage[hashNum][key];
  delete this.storage[hashNum][key];
  return temp;
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

const hash = new HashTable();
const name = "joe";
// const hashNum = hashCode(name, 16)
console.log(hash.set(name, "11221"));
console.log(hash.set("john", 11223));
console.log(hash.remove("joe"));
console.log(hash.get("danny"));
console.log(hash.get("john"));

// Do not remove!!
module.exports = HashTable;

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
  // pass key and array size to hashCode and assign unique index to index variable
  const index = hashCode(key, this.SIZE);
  // check if that unique index doesn't exist
  // create an empty object at that index
  if (!this.storage[index]) {
    this.storage[index] = {};
  }
  // put key/value pair to that specified index | values will overwrite if have same key
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
  // pass key and array size to hashCode and assign unique index to index variable
  const index = hashCode(key, this.SIZE);
  // return the index location of array at key for value
  return this.storage[index][key];
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
  let removed;
  // pass key and array size to hashCode and assign unique index to index variable
  const index = hashCode(key, this.SIZE);
  // check if index key/value pair doesn't exists
  // return undefined
  if (!this.storage[index][key]) {
    return undefined;
  }
  // else
  // save target key/value pair to remove from array index
  // delete the target key/value pair
  // return removed key/value pair
  removed = this.storage[index][key];
  delete this.storage[index][key];
  return removed;
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

const hash = new HashTable();
hash.set("Key-One", "Value-One");
hash.set("Key-Two", "Value-Two");
hash.set("Key-Three", "Value-Three");
hash.set("Key-Four", "Value-Four");
hash.set("Key-Five", "Value-Five");
hash.set("Key-Six", "Value-Six");
hash.set("Key-Seven", "Value-Seven");
hash.set("Key-One", "Value-One");
// console.log(hash.get("Key-Four"));
console.log(hash);
console.log(hash.remove("Key-Four"));
console.log(hash);

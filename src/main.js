/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.currentSize = 0;
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
  let hashKey = hashCode(key, this.SIZE);

  // if storage at key is undefined update the storage
  if (!this.storage[hashKey]) {
    const tempObj = {};
    tempObj[key] = value;

    //re-assign storage at hash key
    this.storage[hashKey] = tempObj;
  } else {
    //if provided key has already been used to store another value, overwrite the existing with new
    this.storage[hashKey][key] = value;
  }

  // increment the number of items stored
  this.currentSize++;

  // return new number of items store in hash table
  return this.currentSize;
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
  if (typeof key !== "string") return console.error(`Invalid Type: typeof key: ${key} should be string`);

  // get the hash key
  let hashKey = hashCode(key, this.SIZE);

  return this.storage[hashKey] ? this.storage[hashKey][key] : undefined;
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
  let hashKey = hashCode(key, this.SIZE);

  if (!this.storage[hashKey][key]) return undefined;

  const deletedVAlue = this.storage[hashKey][key];

  delete this.storage[hashKey][key];

  return deletedVAlue;
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

const myTable = new HashTable();

myTable.set("name", "James");
myTable.get("name");
myTable.remove("name");

// Do not remove!!
module.exports = HashTable;

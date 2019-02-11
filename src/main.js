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
  const code = hashCode(key, this.SIZE);
  if (!this.storage[code]) {
    this.storage[code] = { [key]: value };
  } else {
    this.storage[code][key] = value;
  }
  return 1;
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
  const code = hashCode(key, this.SIZE);
  // check if the key exists in the array
  if (!this.storage[code]) return false;
  // if it does exist, check the object to see if it exists
  if (!this.storage[code].hasOwnProperty(key)) return false;
  // return the value
  return this.storage[code][key];
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
  const code = hashCode(key, this.SIZE);
  // check if the key exists in the array
  if (!this.storage[code]) return false;
  // if it does exist, check the object to see if it exists
  if (!this.storage[code].hasOwnProperty(key)) return false;
  // delete the key value pair
  const deletedValue = this.storage[code][key];
  delete this.storage[code][key];

  return deletedValue;
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

const ht = new HashTable();
ht.set("a", 1);
ht.set("b", 2);
ht.set("c", 3);
ht.set("hELLLO", 4);
ht.set("hELO", 4);
ht.set("hEO", 4);
console.log(ht.storage);
ht.remove("hEO");
ht.remove("a");
ht.remove("hELLLO");
console.log(ht.get("hEO"));
console.log(ht.get("c"));
ht.set("a", 1);
console.log(ht.get("a"));

console.log(ht.storage);
// Do not remove!!
module.exports = HashTable;

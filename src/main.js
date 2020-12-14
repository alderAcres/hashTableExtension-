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

const hashT = new HashTable();

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
  const hash = hashCode(key, this.SIZE);
  console.log(hash);
  if (!this.storage[hash]) {
    this.storage[hash] = { [key]: value };
  } else {
    this.storage[hash][key] = value;
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
  const hash = hashCode(key, this.SIZE);
  const bucket = this.storage[hash];
  console.log(bucket);
  if (bucket !== null || bucket !== undefined) {
    return bucket[key];
  }
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
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash] === undefined) {
    return;
  }
  delete this.storage[hash][key];
  if (Object.keys(this.storage[hash]).length === 0) {
    delete this.storage[hash];
  }
  return;
};

hashT.set("key", "valuez");
hashT.set("zy", "value");
console.log(hashT);
console.log(hashT.get("key"));
console.log(hashT.get("zy"));
hashT.remove("zy");
console.log(hashT);
hashT.remove("zy");
console.log(hashT);
hashT.remove("key");
console.log(hashT);
hashT.remove("key");
console.log(hashT);

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

/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
class HashTable {
  constructor() {
    this.SIZE = 16;
    this.storage = new Array(this.SIZE);
    this.numberOfItems = 0;
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

  set(key, value) {
    const hashIndex = hashCode(key, this.SIZE);
    if (!this.storage[hashIndex]) {
      this.storage[hashIndex] = {};
    }

    this.storage[hashIndex][key] = value;
    this.numberOfItems += 1;
    return this.numberOfItems;
  }

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
  get(key) {
    const hashIndex = hashCode(key, this.SIZE);

    if (this.storage[hashIndex][key]) {
      return this.storage[hashIndex][key];
    } else {
      console.log("no such key exists.");
      return undefined;
    }
  }

  /**
   * remove - delete a key/value pair from the hash table
   *
   * - If the key does not exist in the hash table, return undefined
   *
   * @param {string} key - key to be found and deleted in hash table
   * @return {string|number|boolean} The value deleted from the hash table
   */
  remove(key) {
    const hashIndex = hashCode(key, this.SIZE);
    if (this.get(key)) {
      const toDelete = this.storage[hashIndex][key];
      delete this.storage[hashIndex][key];
      this.numberOfItems -= 1;
      return toDelete;
    } else {
      return undefined;
    }
  }
}

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
hash.set("banana", 1);
hash.set("blah", 2);
hash.set("meh", 3);
hash.set("cat", 4);
hash.set("bake", 5);
hash.set("book", 67777);
hash.remove("book");

// console.log(hash.get("banana"));
console.log(hash);

// Do not remove!!
module.exports = HashTable;

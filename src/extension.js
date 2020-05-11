/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
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
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) {
    //if nothing exists at this position in this.storage, create object to cover collision and create a new property
    this.storage[index] = {};
    this.storage[index][key] = value;
    //after adding new key to hash table, check if number of keys in this.storage is greater than 75% of this.SIZE
    if (this.SIZE * 0.75 < Object.keys(this.storage).length) {
      //double this.SIZE
      this.SIZE = this.SIZE * 2;
      this.storage.forEach((val) => {
        for (let key in val) {
          //for every object in every element in this.storage, rehash and reassign
          //I can definitely optimize this cause it's o(n^2) atm but no time
          //not even sure if im correctly deleting and rehashing
          delete this.storage[key];
          console.log(this.storage);
          const index = hashCode(key, this.SIZE);
          this.storage[index] = {};
          this.storage[index][key] = val[key];
        }
      });
    }
  } else {
    this.storage[index][key] = value;
  }
  return this.storage;
};

const hashTable = new HashTable();
hashTable.set("yo", 1);
hashTable.set("hey", 2);
hashTable.set("yooo", 2);
hashTable.set("a", 2);
hashTable.set("b", 2);
hashTable.set("c", 2);
hashTable.set("d", 2);
hashTable.set("e", 2);
hashTable.set("j", 2);
hashTable.set("g", 2);
hashTable.set("h", 2);
hashTable.set("i", 2);
hashTable.set("m", 2);
hashTable.set("n", 2);
console.log(hashTable);
console.log(hashTable.storage.length);
console.log(Object.keys(hashTable.storage).length);

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
  const index = hashCode(key, this.SIZE);
  if (this.storage[index]) return this.storage[index][key];
  return null;
};

console.log(hashTable.get("yooo"));
console.log(hashTable.get("whatsup"));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) return undefined;
  const deleted = this.storage[index][key];
  delete this.storage[index][key];
  return deleted;
};

// YOUR CODE ABOVE

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

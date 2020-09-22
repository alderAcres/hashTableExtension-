/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
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
  //Adds given value to the hash table with specified key.
  let index = hashCode(key, this.SIZE);
  // I have a possible key, index for hashTable. I want to first check if index already exists as key.
  // if it doesn't exist I set it to empty object at that index:
  if (this.storage[index]) {
    this.storage[index][key] = value;
    ++this.length;
  } else {
    this.storage[index] = {};
    this.storage[index][key] = value;
    ++this.length;
  }
  //set returns the new number of items stored
  return this.length;
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
  // find the index at the hashTable which will hold provided key and value
  let index = hashCode(key, this.SIZE);
  // access and return the value through bracket notation
  return this.storage[index][key];
};
/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
//  */
HashTable.prototype.remove = function (key) {
  // delete a key value pair;
  let index = hashCode(key, this.SIZE);

  // if key doesn't exist return undefined
  if (!this.storage[index][key]) return undefined;
  // store the key value pair in the index of storage into a variable
  const toRemove = this.storage[index][key];
  // delete the variable
  delete this.storage[index][key];
  // decrement length to reflect the deleted property
  --this.length;
  // return the property just deleted.
  return toRemove;
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

// tests

const myHashTable = new HashTable();
console.log(myHashTable);
console.log(myHashTable.set("a", 1));
console.log(myHashTable.set("b", 2));
console.log(myHashTable.get("b"));
console.log(myHashTable.get("a"));
console.log(myHashTable.remove("b"));
// // Do not remove!!
module.exports = HashTable;

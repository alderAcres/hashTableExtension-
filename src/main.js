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

let table = new HashTable();
console.log(table);
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
  let hash = hashCode(key, this.SIZE); //[[[],[]], , , , , ,]
  if (!this.storage[hash]) {
    this.storage[hash] = [[key, value]];
    //return this.storage;
  } else {
    let el = this.storage[hash];
    for (let i = 0; i < el.length; i++) {
      if (el[i][0] === key) {
        el[i][1] = value;
        //return this.storage;
      }
      this.storage[hash][this.storage[hash].length] = [key, value];
      //return this.storage;
    }
  }
};
console.log(table.set(1, 2));
console.log(table.set(3, 4));
console.log(table.set(1, 5));

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
  //get the hash
  let hash = hashCode(key, this.SIZE);
  let el = this.storage[hash];
  if (el) {
    for (let i = 0; i < el.length; i++) {
      if (el[i][0] === key) return el[i][1];
    }
  }
  return undefined;
};
console.log(table.get(1));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  let hash = hashCode(key, this.SIZE);

  let el = this.storage[hash];
  //console.log(el);
  if (el) {
    for (let i = 0; i < el.length; i++) {
      if (el[i][0] === key) {
        el.splice(i, 1);
        //return this.storage;
      }
    }
  }
  return undefined;
};

console.log(table.remove(1));
// Do not modify
function hashCode(string, size) {
  'use strict';

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

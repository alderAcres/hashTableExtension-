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
  this.orignalSize = this.SIZE;
  this.count = 0;
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
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) {
    this.storage[hash][key] = value;
  } else {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }
  this.count++;
  //checking if its greater than 75%
  if (this.count / this.SIZE >= 0.75) {
    //double the size
    this.SIZE *= 2;
    //reset the count
    this.count = 0;
    //hold the previous storage
    let temp = Object.assign(this.storage);
    this.storage = new Array(this.SIZE);
    temp.forEach((current) => {
      for (let key in current) {
        this.set(key, current[key]);
      }
    });
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
  return this.storage[hash][key];
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
  const removeItem = this.storage[hash][key];
  delete this.storage[hash][key];
  this.count--;
  if (this.count / this.SIZE <= 0.25 && this.SIZE > this.orignalSize) {
    this.SIZE /= 2;
    this.count = 0;
    let temp = Object.assign(this.storage);
    this.storage = new Array(this.size);
    temp.forEach((current) => {
      for (let key in current) {
        this.set(key, current[key]);
      }
    });
  }

  return removeItem;
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
//tersting case
let hashStuff = new HashTable();
hashStuff.set("wilmer", 1);
hashStuff.set("MIchael", 2);
hashStuff.set("tacos", 3);
hashStuff.set("wilmer", 4);
hashStuff.set("MIchael", 5);
hashStuff.set("tacos", 6);
hashStuff.set("wilmer", 7);
hashStuff.set("MIchael", 8);
hashStuff.set("tacos", 9);
hashStuff.set("wilmer", 10);
hashStuff.set("MIchael", 11);
hashStuff.set("tacos", 12);
hashStuff.set("wilmer", 13);
hashStuff.set("MIchael", 14);
hashStuff.set("pary", 14);
// hashStuff.set("tacos", 3);

console.log(hashStuff);
// hashStuff.remove("tacos");

console.log(hashStuff);
// Do not remove!!
module.exports = HashTable;

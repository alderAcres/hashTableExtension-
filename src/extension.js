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
  this.SIZE = 2;
  this.capacity = 0;
  this.storage = new Array(this.SIZE);
}
HashTable.prototype.shouldResize =function() {
  this.SIZE = this.SIZE * 2;
  this.capacity = 0;
  console.log(this.SIZE);
  let temp = new Array(this.SIZE);
  this.storage.forEach((el) => {
    let obj = el;
    for (const key in el) {
      let hash = hashCode(key,this.SIZE);
      if (temp[hash] === undefined) {
        this.capacity++;
        temp[hash] = {};
      }
      let val = el[key];
      temp[hash][key] = val;
    }
  });
  this.storage = temp;
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
  let hash = hashCode(key,this.SIZE);

  if (!this.storage[hash]) {
    this.capacity++;
    this.storage[hash] = {};
    if ((this.capacity / this.SIZE) * 100 >= 75) {
      // this.shouldResize();
    }
  }
  console.log(this.storage,value)
  this.storage[hash][key] = value;
  return value;
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
  //generate the hash
  let hash = hashCode(key,this.SIZE);
  //returns value of this.storage at index hash and key of key | undefined if element dne
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
  let hash = hashCode(key,this.SIZE);
  //check if there is even anything to remove
  if (this.storage[hash] != undefined) {
    return undefined;
  }
  //remove value of this.storage at index hash and key of key | undefined if element dne
  const deletedVal = this.storage[hash][key];
  delete this.storage[hash][key];
  return deletedVal;
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

const hh = new HashTable();
hh.set("key", "value");
console.log(hh.storage);
hh.set("key1", "value1");
console.log(hh.storage);
hh.set("key2", "value2");

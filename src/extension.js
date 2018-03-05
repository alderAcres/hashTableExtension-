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
  const index = hashCode(key, this.SIZE);
   //if it exists, place in object
  if (this.storage[index]) {
    this.storage[index][key] = value;
  } else { // create object and put inside
    this.storage[index] = {}
    this.storage[index][key] = value;
    this.length++;
  }

  // if it makes hashtable more than 75% of it's current size, double size
  if (this.length > 0.2 * this.SIZE) {
    // double the size
    this.SIZE *= 2;
    // re-hash
    let newStorage = new Array(this.SIZE);
    for (let i = 0; i < this.SIZE / 2; i++) {
      if (this.storage[i]) {
        for (let newKey in this.storage[i]) {
          const newIndex = hashCode(newKey, this.SIZE);
          newStorage[newIndex][newKey] = this.storage[i][newKey];
        }
      }
    }
    console.log("newHT", this.storage)
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
  const index = hashCode(key, this.SIZE);
  if (this.storage[index][key]) return this.storage[index][key];
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
  let index = hashCode(key, this.SIZE);
  if (!this.storage[index]) return;
  // else -- find and remove value
  let removed = this.storage[index][key];
  delete this.storage[index][key];
  return removed;
};

let ht = new HashTable();

ht.set("a", 1)
ht.set("lk", 2)
ht.set("c", 3)
ht.set("adf", 4)
ht.set("we", 5)
ht.set("z", 6)
ht.set("bb", 6)

console.log(ht.get("lk"))
console.log(ht.get("c"))
console.log(ht.remove("asdf"))
console.log(ht.remove("c"))





// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

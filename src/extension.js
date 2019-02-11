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
  this.items = 0;
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

HashTable.prototype.rehash = function(newSize) {
  newSize = Math.round(newSize);
  const newStorage = new Array(newSize);
  // need to rehash everything in the old storage
  this.storage.forEach(el => {
    //if it's not null
    if (el) {
      // iterate through the object and rehash everything
      for (const [k, v] of Object.entries(el)) {
        const newCode = hashCode(k, newSize);
        if (!newStorage[newCode]) {
          newStorage[newCode] = { [k]: v };
        } else {
          newStorage[newCode][k] = v;
        }
      }
    }
    // if its null, no need to do anything
  });
  // set the new size and storage
  this.SIZE = newSize;
  this.storage = newStorage;
};

HashTable.prototype.findActiveNumberOfElements = function() {
  // gets an object of keys
  const values = Object.values(this.storage);
  // need to loop through all the values and find the objects that don't have length 0
  return values.reduce((acc, curr) => {
    if (Object.keys(curr).length !== 0) return acc + 1;
    return acc;
  }, 0);
};

HashTable.prototype.set = function(key, value) {
  // check if adding 1 more will push it over the edge
  if ((this.items + 1) / this.SIZE >= 0.75) {
    // need to resize
    this.rehash(this.SIZE * 2);
  }

  const code = hashCode(key, this.SIZE);
  if (!this.storage[code]) {
    this.storage[code] = { [key]: value };
    this.items += 1;
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
  // check if removing value will cause the active keys to be below 25%
  // console.log((this.findActiveNumberOfElements() - 1) / this.SIZE);
  if ((this.items - 1) / this.SIZE <= 0.25) {
    this.rehash(this.SIZE / 2);
  }

  const code = hashCode(key, this.SIZE);
  // check if the key exists in the array
  if (!this.storage[code]) return false;
  // if it does exist, check the object to see if it exists
  if (!this.storage[code].hasOwnProperty(key)) return false;
  // delete the key value pair
  const deletedValue = this.storage[code][key];
  delete this.storage[code][key];
  this.items -= 1;

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

// YOUR CODE ABOVE

const ht = new HashTable();
let str =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis";
str = str.split(" ");
let counter = 1;
for (word of str) {
  ht.set(word, counter);
  // console.log(ht.get("Lorem"), ht.SIZE);
  counter += 1;
}
console.log(ht.get("aliquip"));
console.log(ht.get("Lorem"));
console.log("removing...");
let removestr =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco";
removestr = removestr.split(" ");
for (word of removestr) {
  // console.log(ht.remove(word), ht.SIZE);
  ht.remove(word);
}
console.log(ht.get("aliquip"));
// console.log(ht.storage, ht.storage.length);
// console.log(ht.SIZE);
// console.log(ht.storage);

// Do not remove!!
module.exports = HashTable;

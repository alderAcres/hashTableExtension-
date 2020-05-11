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

/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.numItems = 0;
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
// 1. set:
// - If adding the new item will push the number of stored items to over 75% of
//   the hash table's SIZE, then double the hash table's SIZE and rehash everything
HashTable.prototype.set = function (key, value) {
  if (!key) return "Please supply a key.";
  // if numItems + 1 is greater than .75 * SIZE
  if (this.numItems + 1 > 0.75 * this.SIZE) {
    // create SIZE equal to size * 2
    this.SIZE = this.SIZE * 2;
    // save the old array
    const oldArray = this.storage;
    // set this.storage to be an empty array with new SIZE
    this.storage = new Array(this.SIZE);
    // loop through each object in the old array and
    for (let i = 0; i < this.storage.length; i++) {
      // assign each key value pair to a slot in the new array
      // recursively call set to do so
    }
  }

  const hash = hashCode(key, this.SIZE);
  // create an object at position obtained from hash (if it doesn't exist)
  if (!this.storage[hash]) this.storage[hash] = {};
  // place a key,value pair into the object
  this.storage[hash][key] = value;
  // return incremented index
  return ++this.numItems;
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
  if (!this.storage[hash]) return "Item is not in hash table.";
  // return the value stored with key in the hash object
  return this.storage[hash][key];
};

// const hashTable = new HashTable();

// hashTable.set(" a", 3);
// console.log(hashTable.get(" a"));
// console.log(hashTable.get("a"));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
// 2. remove:
// - If the hash table's SIZE is greater than 16 and the result of removing the
//   item drops the number of stored items to be less than 25% of the hash table's SIZE
//   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
HashTable.prototype.remove = function (key) {
  const hash = hashCode(key, this.SIZE);
  // if key or hash values don't exist, return undefined
  if (!this.storage[hash]) return;

  if (this.storage[hash][key]) {
    // save item to be deleted to a new variable and then delete it
    const removedItem = this.storage[hash][key];
    delete this.storage[hash][key];
    // decrement size
    this.numItems--;
    // should we delete empty hash objects?
    return removedItem;
  }
};

// hashTable.set(" a", 3);
// hashTable.get(" a");
// console.log(hashTable.remove(" a"));
// console.log(hashTable);

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

const hashTable = new HashTable();

console.log(hashTable.storage[hashCode("a", hashTable.SIZE)]);

console.log(hashTable.set(" a", 3));
console.log(hashTable.remove(" a"));
console.log(hashTable);

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

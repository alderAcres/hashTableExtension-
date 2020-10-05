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
  this.counter = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  x;
  // pass key and array size to hashCode and assign unique index to index variable
  const index = hashCode(key, this.SIZE);
  // check if that unique index doesn't exist
  // create an empty object at that index
  this.counter++;
  /* 
    Need to keep track how many key/value pairs will be inserted 
    check if next amount is more than 75%
      if so, then divide hashtable in half and reassign everything and reindex everything
  */
  if (counter > this.SIZE * 0.75) {
    this.SIZE = this.SIZE / 2;
    const index = hashCode(key, this.SIZE); // need to figure out how to reindex existing key/value pairs with new array size
  }
  if (!this.storage[index]) {
    this.storage[index] = {};
  }
  // put key/value pair to that specified index | values will overwrite if have same key
  this.storage[index][key] = value;
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
  // pass key and array size to hashCode and assign unique index to index variable
  const index = hashCode(key, this.SIZE);
  // return the index location of array at key for value
  return this.storage[index][key];
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
  let removed;
  // pass key and array size to hashCode and assign unique index to index variable
  const index = hashCode(key, this.SIZE);
  // check if index key/value pair doesn't exists
  // return undefined
  if (!this.storage[index][key]) {
    return undefined;
  }
  // else
  // save target key/value pair to remove from array index
  // delete the target key/value pair
  // return removed key/value pair
  removed = this.storage[index][key];
  delete this.storage[index][key];
  return removed;
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

const hash = new HashTable();
hash.set("Key-One", "Value-One");
hash.set("Key-Two", "Value-Two");
hash.set("Key-Three", "Value-Three");
hash.set("Key-Four", "Value-Four");
hash.set("Key-Five", "Value-Five");
hash.set("Key-Six", "Value-Six");
hash.set("Key-Seven", "Value-Seven");
hash.set("Key-One", "Value-One");
// console.log(hash.get("Key-Four"));
// console.log(hash);
// console.log(hash.remove("Key-Four"));
console.log(hash);
console.log(hash.counter);

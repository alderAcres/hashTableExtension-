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
  // When the function is called a new array is created as this.storage
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
HashTable.prototype.set = function(key, value) {
  // Check number of indexes that that are currently filled and compare that to the length of the hash table
  let filled = 0;

  this.storage.forEach(object => {
    if (object instanceof Object) {
      Object.keys(object).forEach(x => {
        filled++;
      });
    }
  });

  console.log(filled);

  if (filled + 1 > this.SIZE * 0.75) {
    // Double size and rehash
    let oldHashSize = this.SIZE;

    this.storage.length = Math.ceil(this.storage.length * 2);

    this.SIZE *= 2;

    // Map over all items in the hash table, give them a new position and remove the old one
    this.storage.forEach(object => {
      if (object instanceof Object) {
        Object.keys(object).forEach(oldKey => {
          // Delete what existed before
          let oldIndex = hashCode(oldKey, oldHashSize);
          let oldValue = this.storage[oldIndex][oldKey];
          delete this.storage[oldIndex][oldKey];

          // NEW
          let index = hashCode(oldKey, this.SIZE);
          if (!(this.storage[index] instanceof Object)) {
            this.storage[index] = {};
          }
          this.storage[index][oldKey] = oldValue;
        });
      }
    });
  }

  let index = hashCode(key, this.SIZE); // Confirm this.SIZE

  if (!(this.storage[index] instanceof Object)) {
    this.storage[index] = {};
  }

  this.storage[index][key] = value;

  let count = 0;

  this.storage.forEach(object => {
    if (object instanceof Object) {
      Object.keys(object).forEach(x => {
        count++;
      });
    }
  });

  return count;
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
  let index = hashCode(key, this.SIZE);

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
HashTable.prototype.remove = function(key) {
  // Check number of indexes that that are currently filled and compare that to the length of the hash table

  // - If the hash table's SIZE is greater than 16 and the result of removing the
  // item drops the number of stored items to be less than 25% of the hash table's SIZE
  // (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

  console.log(this.SIZE);

  console.log(this.storage.length);
  let filled = 0;

  this.storage.forEach(object => {
    if (object instanceof Object) {
      Object.keys(object).forEach(x => {
        filled++;
      });
    }
  });

  console.log(filled);

  if (filled - 1 < this.SIZE * 0.25 && this.SIZE > 16) {
    // Double size and rehash
    let oldHashSize = this.SIZE;

    this.storage.length = Math.ceil(this.storage.length / 2);

    this.SIZE /= 2;

    // Map over all items in the hash table, give them a new position and remove the old one
    this.storage.forEach(object => {
      if (object instanceof Object) {
        Object.keys(object).forEach(oldKey => {
          // Delete what existed before
          let oldIndex = hashCode(oldKey, oldHashSize);
          let oldValue = this.storage[oldIndex][oldKey];
          delete this.storage[oldIndex][oldKey];

          // NEW
          let index = hashCode(oldKey, this.SIZE);
          if (!(this.storage[index] instanceof Object)) {
            this.storage[index] = {};
          }
          this.storage[index][oldKey] = oldValue;
        });
      }
    });
  }

  let index = hashCode(key, this.SIZE);

  let removed = this.storage[index][key];

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

let hash = new HashTable();

console.log(hash.set("jim", "hi"));
console.log(hash.set("jimm2", "hi"));
console.log(hash.set("jimm3", "hi"));
console.log(hash.set("jimm4", "hi"));
console.log(hash.set("jimm5", "hi"));
console.log(hash.set("jimm6", "hi"));
console.log(hash.set("jimm7", "hi"));
console.log(hash.set("jimm8", "hi"));
console.log(hash.set("jimm9", "hi"));
console.log(hash.set("jimm0", "hi"));
console.log(hash.set("jimm-", "hi"));
console.log(hash.storage);

console.log(hash.set("jimm=", "hi"));
console.log(hash.set("jimm43g43", "hi"));

console.log(hash.storage);

console.log(hash.remove("jimm2", "hi"));
console.log(hash.remove("jimm3", "hi"));
console.log(hash.remove("jimm4", "hi"));
console.log(hash.remove("jimm5", "hi"));
console.log(hash.remove("jimm6", "hi"));
console.log(hash.remove("jimm8", "hi"));
console.log(hash.remove("jimm9", "hi"));
console.log(hash.remove("jimm0", "hi"));
console.log(hash.remove("jimm-", "hi"));

console.log(hash.storage);

console.log(hash.get("jim"));

console.log(hash.remove("jim"));

console.log(hash.get("jim"));

console.log(hash.storage);

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

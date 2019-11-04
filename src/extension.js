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
  if (!this.storage[hashCode(key, this.SIZE)]) {
    this.storage[hashCode(key, this.SIZE)] = {};
  }
  this.storage[hashCode(key, this.SIZE)][key] = value;
  this.length += 1;

  if (this.length >= Math.floor(this.SIZE * 0.75)) {
    const oldStorage = this.storage;
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);

    oldStorage.forEach((hashBucket) => {
      if (hashBucket) {
        for (const [oldKey, oldValue] of Object.entries(hashBucket)) {
          if (!this.storage[hashCode(oldKey, this.SIZE)]) {
            this.storage[hashCode(oldKey, this.SIZE)] = {};
          }
          this.storage[hashCode(oldKey, this.SIZE)][oldKey] = oldValue;
        }
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
  if (!this.storage[hashCode(key, this.SIZE)][key]) return 'No such key';
  return this.storage[hashCode(key, this.SIZE)][key];
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
  if (!this.storage[hashCode(key, this.SIZE)][key]) return undefined;
  const deletedVal = this.storage[hashCode(key, this.SIZE)][key];
  delete this.storage[hashCode(key, this.SIZE)][key];
  this.length -= 1;

  if (this.SIZE > 16 && this.length < Math.floor(this.SIZE * 0.25)) {
    const oldStorage = this.storage;
    this.SIZE /= 2;
    this.storage = new Array(this.SIZE);

    oldStorage.forEach((hashBucket) => {
      if (hashBucket) {
        for (const [oldKey, oldValue] of Object.entries(hashBucket)) {
          if (!this.storage[hashCode(oldKey, this.SIZE)]) {
            this.storage[hashCode(oldKey, this.SIZE)] = {};
          }
          this.storage[hashCode(oldKey, this.SIZE)][oldKey] = oldValue;
        }
      }
    });
  }
  return deletedVal;
};

// const hashTable = new HashTable();
// console.log(hashTable);
// hashTable.set('peanuts', 'butter');
// console.log(hashTable);
// hashTable.set('popcorn', 'brittle');
// console.log(hashTable);
// console.log(hashTable.get('popcorn'));
// console.log(hashTable.remove('popcorn'));
// console.log(hashTable);

// const hashKeys = [
//   'bento',
//   'cheese',
//   'charizard',
//   'angelfish',
//   'manga',
//   'oldtownroad',
//   'seven',
//   'lice',
//   'twentyrivers',
//   'eleventybillion',
//   'cheddar',
//   'eagles',
//   'pidgeons',
//   'food',
//   'farce',
//   'finnickey',
// ];
// for (let i = 0; i < hashKeys.length; i++) {
//   hashTable.set(hashKeys[i], 'nuts');
//   console.log(hashTable);
// }

// for (let i = 0; i < hashKeys.length; i++) {
//   hashTable.remove(hashKeys[i]);
//   console.log(hashTable);
// }

// YOUR CODE ABOVE

function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// const hashTable = new HashTable();

// for (let i = 0; i <= 16; i++) {
//   hashTable.set(i, 'nuts');
//   console.log(hashTable);
// }
// hashTable.set;

// Do not remove!!
module.exports = HashTable;

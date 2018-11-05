/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the
challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.numberOfItems = 0;
}

// .SIZE --> 16
//.storage --> 16 empty items
/**
* set - Adds given value to the hash table with specified key.
* - If the provided key has already been used to store another value,
simply overwrite the existing value with the new value.
* - If the hashed address already contains another key/value pair,
you must handle the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  // check if key does not currently exist on hash table
  // if not, set key:value pair on this.storage
  let i = 0;
  this.storage.forEach((pair) => {
    // console.log(pair[0]);
    if (pair) {
      if (pair[0] === key) {
        pair[0] = [key, value];
        // pair.key = value;
        i += 1;
      }
    }
  });
  if (i === 0) {
    for (let x = 0; x < 16; x += 1) {
      if (!this.storage[x]) {
        this.storage[x] = [];
        this.storage[x].push(key, value);
        break;
      }
    }
  }
  // increment this.numberOfItems to reflect that item has been added
  this.numberOfItems += 1;
  return this.numberOfItems;
};

const hash = new HashTable();
hash.set('a', 'hello');
hash.set('b', 'hii');
hash.set('c', 'cat');
console.log(hash.set('b', 'yooo'));
console.log(hash.storage);

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
  this.storage.forEach(el => {
    if this.storage.key[0]
  });

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

};

// Do not modify
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

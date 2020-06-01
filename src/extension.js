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
* - If adding the new item will push the number of stored items to over 75% of
*        the hash table's SIZE, then double the hash table's SIZE and rehash everything
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function (key, value) {
  const hashedAddress = hashCode(key, this.SIZE);
  if (this.storage[hashedAddress] === undefined) this.storage[hashedAddress] = {};
  if (this.storage[hashedAddress][key] === undefined) this.numItems += 1;
  this.storage[hashedAddress][key] = value;

  if (this.numItems / this.SIZE >= 0.75) {
    const copyOfHash = this.storage.slice();
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);
    this.numItems = 0;
    for (let i = 0; i < copyOfHash.length; i += 1) {
      if (copyOfHash[i] !== undefined) {
        const objKeys = Object.keys(copyOfHash[i]);
        for (let j = 0; j < objKeys.length; j += 1) {
          this.set(objKeys[j], copyOfHash[i][objKeys[j]]);
        }
      }
    }
  }

  return this.numItems;
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
  const hashedAddress = hashCode(key, this.SIZE);
  return this.storage[hashedAddress][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
* - If the hash table's SIZE is greater than 16 and the result of removing the
*        item drops the number of stored items to be less than 25% of the hash table's SIZE
*        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  // DID NOT COMPLETE IMPLEMENTATION OF RESIZING
  const hashedAddress = hashCode(key, this.SIZE);
  if (this.storage[hashedAddress] === undefined) return undefined;
  this.numItems -= 1;
  const removedItem = this.storage[hashedAddress][key];
  delete this.storage[hashedAddress][key];

  if (this.SIZE > 16 && this.numItems / this.SIZE < 0.25) {
    // make a copy of current this.storage array
    // reassign this.SIZE
    // reassign this.storage to a new array of size this.SIZE
    // iterate over copy of storage
    // iterage over each object in each index
    // use set method to update new hash table
  }
  return removedItem;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

// const hash = new HashTable();
// console.log(hash.storage);
// console.log(hash.set('a', 'blah'));
// console.log(hash.set('b', 'why'));
// console.log(hash.set('c', 'blah'));
// console.log(hash.set('d', 'blah'));
// console.log(hash.set('e', 'blah'));
// console.log(hash.set('f', 'blah'));
// console.log(hash.set('g', 'blah'));
// console.log(hash.set('h', 'blah'));
// console.log(hash.set('i', 'blah'));
// console.log(hash.set('j', 'blah'));
// console.log(hash.set('k', 'blah'));
// console.log(hash.storage);
// console.log(hash.set('l', 'blah'));
// console.log(hash.storage);
// console.log(hash.numItems);

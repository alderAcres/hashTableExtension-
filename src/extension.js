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

function HashTable(size = 16) {
  this.SIZE = size;
  this.items = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const hashIndex = hashCode(key, this.SIZE);
  if (this.storage[hashIndex] === undefined) {
    this.storage[hashIndex] = {};
    this.storage[hashIndex][key] = value;
    this.items++;
  } else {
    if (this.storage[hashIndex][key] === undefined) this.items++;
    this.storage[hashIndex][key] = value;
  }

  // if items are more than 75%, we create a new HT, add everything to it
  // and set the current hash table to be equal to it
  if (this.items / this.SIZE > 0.75) {
    const newHT = getNewHashTable(this.storage, this.SIZE * 2);

    this.SIZE = newHT.SIZE;
    this.storage = newHT.storage;
    this.items = newHT.items;
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
HashTable.prototype.get = function(key) {
  const hashIndex = hashCode(key, this.SIZE);
  const keyValueObj = this.storage[hashIndex];
  if (!keyValueObj) return undefined;
  return keyValueObj[key];
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
  const hashIndex = hashCode(key, this.SIZE);
  const keyValueObj = this.storage[hashIndex];
  
  if (!keyValueObj || keyValueObj[key] === undefined) return undefined;

  this.items--;
  const deletedValue = keyValueObj[key];
  delete keyValueObj[key];

  if (this.items < Math.floor(0.25 * this.SIZE) && this.SIZE > 16) {
    const newHT = getNewHashTable(this.storage, Math.ceil(this.SIZE / 2));

    this.SIZE = newHT.SIZE;
    this.storage = newHT.storage;
    this.items = newHT.items;
  }

  return deletedValue;
};

function getNewHashTable(storage, size) {
  const newHT = new HashTable(size);
  for (let keyValueObj of storage) {
    if (!keyValueObj) continue;

    for (let key in keyValueObj) {
      newHT.set(key, keyValueObj[key]);
    }
  }

  return newHT;
}
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
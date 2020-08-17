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
  this.storage = new Array(this.SIZE);
  this.items = 0; //Includes all items even if they are all in one hashTable index
  this.capacity = 0 //Keeps track of spots being filled in the hashTable
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
  const hashNum = hashCode(key, this.SIZE) //Returns an index within the HashTable Size
  if (!this.storage[hashNum]) {
    this.storage[hashNum] = {}
    this.capacity += 1
  }
  this.storage[hashNum][key] = value;

  if (this.capacity / this.SIZE > 0.75) {
    this.SIZE *= 2
    //returns a brand new hashTable
    this.storage = this.reHash()
  }

  this.items += 1;
  return this.items
};

//reHash function will reHash when the size is doubled
//it will return a brand new hashTable containing existing items of the original hash table
HashTable.prototype.reHash = function () {
  const newHash = new HashTable();

  //iterate through existing hash table and put the items into new Hash

  this.storage.forEach((obj) => {
    if (obj) {
      for (let key in obj) {
        newHash.set(key, this.SIZE)
      }
    }
  })
  this.capacity = newHash.capacity;

  //return the newHash
  return newHash.storage
}


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
  const hashNum = hashCode(key, this.SIZE);
  if (!this.storage[hashNum]) {
    return 'Specified number is not stored.'
  }
  return this.storage[hashNum][key];
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
  const hashNum = hashCode(key, this.SIZE);
  let returnValue = undefined
  if (this.storage[hashNum]) {
    returnValue = this.storage[hashNum][key]
    delete this.storage[hashNum][key]
    //decrease capacity by one if removing the key results in an empty object within the hashTable
    if (!this.storage[hashNum]) {
      this.capacity -= 1
      if (this.SIZE > 16 && Math.floor(100 * this.capacity / this.size) < 25) {
        //size 11 -> size 6 since we don't want a size of 5.5
        this.SIZE = Math.ceil(this.SIZE / 2);
        this.storage = this.reHash()
      }
    }
  }
  this.items -= 1
  return returnValue;
};


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

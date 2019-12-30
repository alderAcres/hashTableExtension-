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
  this.STORED = 0;
  
  this.storage = new Array(this.SIZE);
}

const alexTest = new HashTable;
console.log(alexTest);

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
  index = hashCode(key, this.SIZE);
  console.log(index);

  if (this.storage[index] === undefined) this.storage[index] = {};
  if (this.storage[index][key] === undefined) this.STORED += 1;

  this.storage[index][key] = value;

  // console.log(this.STORED)
  // console.log(this.SIZE * .75)

  // double size if rehash if more items than 75% of size are store
  if (this.STORED > this.SIZE * .75) {
    // store the old hash table to populate new hash table
    oldStorage = this.storage;
    // console.log(oldStorage)
    // double hash table size
    this.SIZE *= 2;
    // console.log(this.SIZE);

    this.storage = new Array(this.SIZE); 
    // console.log(oldStorage);
    // console.log(this.storage);

    // iterate across the old hash table addresses;
    oldStorage.forEach(el => {
      // console.log(el);
      // only rehash for address where items were store
      if (el) {
        // console.log(Object.keys(el));
        // iterate across keys at each hash table address
        Object.keys(el).forEach(key => {
          // set key value pair in new hash table
          this.set(key, el[key]);
          // offset for the fact that the item was already accounted for in the old table
          this.STORED -= 1;
        });
      }
    });
  }
  
  return this.STORED;
};

console.log(alexTest);
alexTest.set ('z', 123);
alexTest.set ('a', 123);
alexTest.set ('b', 123);
alexTest.set ('c', 123);
alexTest.set ('d', 123);
alexTest.set ('e', 123);
alexTest.set ('f', 123);
alexTest.set ('g', 123);
alexTest.set ('h', 123);
alexTest.set ('i', 123);
alexTest.set ('j', 123);
console.log(alexTest.set ('k', 123));
console.log(alexTest.set ('alex', 123));
console.log(alexTest.set ('alex', 789));
console.log(alexTest.set ('jzq', 456));
console.log(alexTest);

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
  index = hashCode(key, this.SIZE);
  console.log(index);

  return this.storage[index][key];
};

console.log(alexTest);
console.log(alexTest.get('alex'));
console.log(alexTest.get('jzq'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  index = hashCode(key, this.SIZE);
  console.log(index);

  if (this.storage[index] === undefined) return undefined;
  const removedValue =  this.storage[index][key];
  if (removedValue === undefined) return undefined;

  delete this.storage[index][key];
  if (Object.keys(this.storage[index]).length === 0) delete this.storage[index];

  this.STORED -= 1;

  // half the size of the table if the num items is less than 25% of it's size and the size is greater than 16
  if (this.STORED < this.SIZE * .25 && this.SIZE > 16) {
    // store the old hash table to populate new hash table
    oldStorage = this.storage;
    // console.log(oldStorage)
    // half hash table size
    this.SIZE /= 2;
    // console.log(this.SIZE);

    this.storage = new Array(this.SIZE); 
    // console.log(oldStorage);
    // console.log(this.storage);

    // iterate across the old hash table addresses;
    oldStorage.forEach(el => {
      // console.log(el);
      // only rehash for address where items were store
      if (el) {
        // console.log(Object.keys(el));
        // iterate across keys at each hash table address
        Object.keys(el).forEach(key => {
          // set key value pair in new hash table
          this.set(key, el[key]);
          // offset for the fact that the item was already accounted for in the old table
          this.STORED -= 1;
        });
      }
    });
  }

  return removedValue;
};


console.log(alexTest);
console.log(alexTest.remove('alex'));
console.log(alexTest);
console.log(alexTest.remove('jzq'));
console.log(alexTest);
console.log(alexTest.remove('jzq'));
alexTest.remove ('z');
alexTest.remove ('a');
alexTest.remove ('b');
console.log(alexTest);
alexTest.remove ('c');
console.log(alexTest);
alexTest.remove ('d');
console.log(alexTest);
alexTest.remove ('e');
alexTest.remove ('f');
console.log(alexTest);


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

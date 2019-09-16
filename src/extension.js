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

// YOUR CODE ABOVE
/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.occupied = 0;
  this.storage = new Array(this.SIZE);
}

const testHT = new HashTable();

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
  //declare hash index
  const hashIdx = hashCode(key, this.SIZE);

  //create object at hash index of hashtable
  this.storage[hashIdx] = {};

  // set key as key arguemnt and value as value argument
  this.storage[hashIdx][key] = value;

  // incriment occupied
  this.occupied++;

  // if occupied is 75% of length, double length
  if (this.occupied >= this.SIZE * 0.75) {
    this.SIZE *= 2;
    // iterate over entire table
    for (let i = 0; i < this.SIZE; i++) {
      // rehash entire table based on first key of object at a give index
      const indexObject = this.storage[i];
      console.log(indexObject);
      if (indexObject !== undefined) {
        console.log(Object.keys(indexObject)[0]);
        const newHashIdx = hashCode(Object.keys(indexObject)[0], this.SIZE);
        this.storage[newHashIdx] = indexObject;
      }
    }
  }
};

testHT.set('key1', 1);
testHT.set('boo', 1);
testHT.set('tom', 1);
testHT.set('hi', 1);
testHT.set('yes', 1);
testHT.set('geer', 1);
testHT.set('go', 1);
testHT.set('apple', 1);
testHT.set('buttz', 1);
testHT.set('sky', 1);
testHT.set('mac', 1);
testHT.set('what', 1);
console.log(testHT.SIZE);

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
  // find hash index
  const hashIdx = hashCode(key, this.SIZE);

  // search object at hash index for a key matching key input
  return this.storage[hashIdx][key];
};

console.log(testHT.get('key1'));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
  // find hash index
  const hashIdx = hashCode(key, this.SIZE);

  // delete value or return undefined if undefined
  if (this.storage[hashIdx][key] === undefined) return undefined;
  else delete this.storage[hashIdx][key];

  // reduce size
  this.occupied--;

  //If the hash table's SIZE is greater than 16 and the result of removing the item drops the number of stored items to be less than 25% of the hash table's SIZ.
  if (this.SIZE > 16 && this.occupied < Math.floor(this.SIZE * 0.25)) {
    // reduce the hash table's SIZE by 1/2 and rehash everything
    this.SIZE /= 2;
    for (let i = 0; i < this.SIZE; i++) {
      // rehash entire table based on first key of object at a give index
      const indexObject = this.storage[i];
      console.log(indexObject);
      if (indexObject !== undefined) {
        const newHashIdx = hashCode(Object.keys(indexObject)[0], this.SIZE);
        this.storage[newHashIdx] = indexObject;
      }
    }
  }
};

// *** Move delete call to the bottom

testHT.remove('key1', 1);
testHT.remove('boo', 1);
testHT.remove('tom', 1);
testHT.remove('hi', 1);
testHT.remove('yes', 1);
testHT.remove('geer', 1);
testHT.remove('go', 1);
testHT.remove('apple', 1);
testHT.remove('buttz', 1);
testHT.remove('sky', 1);
testHT.set('mac', 1);
testHT.set('what', 1);
console.log(testHT.SIZE);

function hashCode(string, size) {
  'use strict';

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

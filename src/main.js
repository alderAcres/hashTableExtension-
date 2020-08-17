// const { delete } = require('request');

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
  // get the hash index with the hashcode fn
  const hashIndex = hashCode(key, this.SIZE);
  // create an object with the key/value pair
  const obj = { [key]: value };
  // place key/value pair obj in the storage array with the appropriate index
  // first check whether there is something in there
  if (this.storage[hashIndex] === undefined) {
    // IF SO - place the obj in that index
    this.storage[hashIndex] = obj;
  } else {
    // IF NOT - access the obj that is in there and add the new key/value pair
    this.storage[hashIndex][key] = value;
  }
  // the obj in that index should handle collisions by simply adding to itself without overwriting
  console.log(this.storage);
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
  // create and store hash code in a variable
  const hashIndex = hashCode(key, this.SIZE);
  // access that index in the storage array
  // check if there is something in that index
  if (this.storage[hashIndex] !== undefined) {
    // IF SO - retrieve the value
    console.log(this.storage[hashIndex][key]);
    return this.storage[hashIndex][key];
  }
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
  // create and store the hash index
  const hashIndex = hashCode(key, this.SIZE);
  // check whether there is anything in that index
  if (!this.storage[hashIndex]) return undefined;

  // check whether that key exists in that obj
  if (this.storage[hashIndex][key]) {
    // IF SO - delete that key value pair
    delete this.storage[hashIndex][key];
    // exit the fn
    return;
  } else {
    // IF NOT - return undefined
    return undefined;
  }
};

// Do not modify
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

/* --------------------------------- testing -------------------------------- */
let hashTest = new HashTable();
hashTest.set('testKey', 123);
hashTest.set('tester', 12345);
hashTest.set('hello', 33123);
hashTest.set('collide', 12233);
hashTest.set('whay', 127673);
hashTest.set('juice', 23);
hashTest.set('beer', 1);

hashTest.get('juice');
hashTest.get('hello');
hashTest.get('bubble');

hashTest.remove('hello');
hashTest.remove('juice');
hashTest.remove('cat');

// Do not remove!!
module.exports = HashTable;

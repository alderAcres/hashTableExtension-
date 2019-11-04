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
  this.storage.total = 0;
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
  // our input is a key and its associated value
  // we want our function to run the key through the hash function in order to get an address
  // that address is an index in our storage array and it's at that index, in an object, that we store
  // our key-value pair

  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket]) {
    this.storage[bucket] = {};
  }
  if (this.storage.total + 1 > 0.75 * this.SIZE) {
    // double the hash table's size and rehash everything
    this.SIZE *= 2;
    const resizedTable = this.storage.map(function (element) {
      const keysInBucket = Object.keys(element);
      for (let i = 0; i < keysInBucket.length; i += 1) {
        const keyToRehash = keysInBucket[i];
        const valueToRehash = this.storage[index][keyToRehash];
        this.remove(this.storage[index][keyToRehash])
        this.set(keyToRehash, valueToRehash);
      }
    }, index)
  }
  this.storage[bucket][key] = value;
  this.storage.total += 1;
  return this.storage.total;
}

const baseball = new HashTable;
console.log(baseball.set('Arizona', 'Diamondbacks'));
console.log(baseball.set('Florida', 'Marlins'));
baseball.set('Los Angeles', 'Dodgers');
baseball.set('San Francisco', 'Giants');
baseball.set('San Diego', 'Padres');
baseball.set('Chicago', 'Cubs');
baseball.set('St. Louis', 'Cardinals');
console.log(baseball);

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
  // our input is a key and our output is its associated value stored in the hash table
  // run the input key through our hash function in order to get a bucket address
  // return the value stored in that bucket object at the associated key

  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket] || !this.storage[bucket][key]) {
    return;
  }
  return this.storage[bucket][key];
};

// console.log(baseball.get('Atlanta'));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // our input is a key and our output is its associated value
  // run the input key through our hash function in order to get a bucket address
  // save the value stored in that bucket object at the associated key
  // delete the key-value pair
  // return the saved value

  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket] || !this.storage[bucket][key]) {
    return;
  }
  const removedValue = this.storage[bucket][key];
  delete this.storage[bucket][key];
  this.storage.total -= 1;
  return removedValue;
};

// console.log(baseball.remove('Boston'));
// console.log(baseball);

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

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
  this.SIZE = 4;
  this.numItems = 0; // keeps track of number of items in hash table (incl. within objects)
  this.numLocs = 0; // keeps track of number of objects in hash table (i.e., num occupied locations)
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
HashTable.prototype.set = function(key, value) {
  // pass key to hashing function
  const hashLocation = hashCode(key, this.SIZE);
  // check whether hash table has a value at that location
    // if not, add an object there
  if (!this.storage[hashLocation]) {
    this.storage[hashLocation] = {};
    // increment numLocs property
    this.numLocs += 1;
  }
  // check if key already exists - if not, increment numItems property
  if (!this.storage[hashLocation][key]) this.numItems += 1;
  // add the same key-value pair to the existing location (will overwrite if existing key)
  this.storage[hashLocation][key] = value;
  // return number of items in hash table
  // check whether numLocs is greater than 75% of size
  if (this.numLocs > this.SIZE * .75) {
    // if so, double size of hash table
    this.SIZE *= 2;
    const newStorage = new Array(this.SIZE);
    // then rehash all values in table
      // filter storage property so it contains only objects
    const occupiedLocs = this.storage.filter((el) => typeof el === 'object');
      // loop over filtered array
    occupiedLocs.forEach((obj) => {
      // pass a key in each object to hashing function
      const newLoc = hashCode(Object.keys(obj)[0], this.SIZE);
      // put object at that location in new hash table
      newStorage[newLoc] = obj;
    });
    this.storage = newStorage;
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
HashTable.prototype.get = function(key) {
  // get location of input key using hashing function
  const hashLocation = hashCode(key, this.SIZE);
  // check whether the input key exists at that location
    // if so, return it
  if (this.storage[hashLocation][key]) return this.storage[hashLocation][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

// NOT QUITE WORKING BUT CLOSE - OUT OF TIME
HashTable.prototype.remove = function(key) {
  // get location of input key using hashing function
  const hashLocation = hashCode(key, this.SIZE);
  // first, check if location exists in hash table
  if (this.storage[hashLocation]) {
    // if input key exists at that location, save it in a variable and delete key-value pair
    if (this.storage[hashLocation][key]) {
      const value = this.storage[hashLocation][key];
      delete this.storage[hashLocation][key];
      // decrement numItems property
      this.numItems -= 1;
      // check whether object from which key was removed is empty
      if (Object.keys(this.storage[hashLocation].length < 1)) {
        // delete the object and decrement thisLocs
        this.storage[hashLocation] = null;
        this.numLocs -= 1;
        // check whether numLocs is less than 25% of size
        if (this.numLocs < .25 * this.SIZE) {
          // if so, reduce size by half and rehash all items
          this.SIZE /= 2;
          const newStorage = new Array(this.SIZE);
          // then rehash all values in table
            // filter storage property so it contains only objects
          const occupiedLocs = this.storage.filter((el) => typeof el === 'object');
            // loop over filtered array
          occupiedLocs.forEach((obj) => {
            // pass a key in each object to hashing function
            const newLoc = hashCode(Object.keys(obj)[0], this.SIZE);
            // put object at that location in new hash table
            newStorage[newLoc] = obj;
          });
          this.storage = newStorage;
        }
      }
      return value;
    }
  }
  // otherwise, return undefined
  return undefined;
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


const hash = new HashTable();
hash.set('i', true);
hash.set('j', true);
// hash.set('k', true);
// hash.set('l', true);
hash.remove('i');
hash.remove('j')
console.log(hash)
// console.log(hash);
// console.log(hash.get('blue'));
// console.log(hash)
// console.log(hash.remove('blue'));
// // console.log(hash.remove('green'));
// console.log(hash.set('three'))

// console.log(hash.storage.filter(el => typeof el === 'object'));
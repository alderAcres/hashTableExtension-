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
  // fill array with empty object literals that will handle collisions
  for (let i = 0; i < this.SIZE; i += 1) {
    const newObj = {};
    this.storage[i] = newObj;
  }
  // initialize count of stored items
  this.itemsStored = 0;
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
  // get bucket in which to store value
  let hashAddress = hashCode(key, this.SIZE);
  
  // check if it is the first time using this key
  const keyIsUnique = this.storage[hashAddress][key] === undefined;

  // Manage size if this key is unique and if size will pass threshhold
  if (this.itemsStored + 1 > (0.75 * this.SIZE) && keyIsUnique) {
    // make a copy of storage in temp variable
    const temp = this.storage.slice();

    // re-initialize this hash table with 2*this.SIZE buckets
    this.SIZE = this.SIZE * 2;
    this.storage = new Array(this.SIZE);
    for (let i = 0; i < this.SIZE; i += 1) {
      const newObj = {};
      this.storage[i] = newObj;
    }
    this.itemsStored = 0;

    // set all the stored key,value pairs in this updated hash table
    temp.forEach((obj) => {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i += 1) {
        this.set(keys[i], obj[keys[i]]);
      }
    });
  }
  
  // get hashAddress for new key again, in case we just changed the SIZE
  hashAddress = hashCode(key, this.SIZE);

  // store the key, value pair inside the object literal at hashAddress
  // this will overwrite any previous values stored with the same key
  this.storage[hashAddress][key] = value;
  
  // increment number of items stored, only if key was unique
  if (keyIsUnique) this.itemsStored += 1;

  // return number of items stored
  return this.itemsStored;
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
  // get hashAddress
  const hashAddress = hashCode(key, this.SIZE);

  // lookup and return key's value in the correct nested object literal of the hashtable
  return this.storage[hashAddress][key]; // returns undefined if key does not exist
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
  // get hashAddress
  const hashAddress = hashCode(key, this.SIZE);

  // store the deleted value before deleting it
  const deletedVal = this.storage[hashAddress][key];

  // delete the key,value pair
  delete this.storage[hashAddress][key];

  // decrement items stored, only if we deleted something (value was not undefined)
  if (deletedVal !== undefined) this.itemsStored -= 1;

  // if we deleted something and fell below size threshold
  if (this.SIZE > 16 && (this.itemsStored < (0.25 * this.SIZE))) {
  // manage the size of the hashtable
    // make a copy of storage
    const temp = this.storage.slice();

    // re-initialize the hash table with new size
    this.SIZE = this.SIZE / 2;
    this.storage = new Array(this.SIZE);
    for (let i = 0; i < this.SIZE; i += 1) {
      const newObj = {};
      this.storage[i] = newObj;
    }
    this.itemsStored = 0;

    // set all key,value pairs in updated hash table
    temp.forEach((obj) => {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i += 1) {
        this.set(keys[i], obj[keys[i]]);
      }
    });
  }

  // return stored value (this is undefined if key never existed in hash table)
  return deletedVal;
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

/* Test Suite */

// const myHT = new HashTable();
// myHT.set('abaas', 123);
// myHT.set('abaas1', 123);
// myHT.set('abaas2', 123);
// myHT.set('abaas3', 123);
// myHT.set('abaas4', 123);
// myHT.set('abaas5', 1233);
// myHT.set('abaas6', 123);
// myHT.set('abaas7', 123);
// myHT.set('abaas8', 123);
// myHT.set('abaas9', 123);
// myHT.set('abaas10', 123);
// myHT.set('abaas11', 123);
// console.log(myHT.SIZE);
// console.log(myHT.storage);
// myHT.set('abaas12', 123);
// console.log(myHT.SIZE);
// console.log(myHT.itemsStored);
// console.log(myHT.storage);

// myHT.remove('abaas12');
// myHT.remove('abaas11');
// myHT.remove('abaas10');
// myHT.remove('abaas9');
// myHT.remove('abaas8');
// console.log(myHT.SIZE);
// myHT.remove('abaas7');
// console.log(myHT.SIZE);
// console.log(myHT.itemsStored);
// console.log(myHT.storage);


// myHT.set('abaas', 456);
// myHT.set('b', 456);
// console.log(myHT.storage);
// console.log(myHT.itemsStored);

// console.log(myHT.get('abaas5'));

// myHT.remove('abaas');
// console.log(myHT);
// console.log(myHT.itemsStored);

// myHT.remove('notAKey');
// console.log(myHT);

/* eslint-disable no-plusplus */
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
  this.amount = 0;
}

/**
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function (key, value) {
  if (key === undefined || value === undefined) throw Error('Usage: <hashtablename>.set(key, value)');

  // increment amount by one
  this.amount++;
  // if greater adding key will increase the hashtable to greater than it's current size

  if (this.amount / this.SIZE > 3 / 4) {
    // store hashed key, value pairs in an array
    const hashKeyValues = [];
    this.storage.forEach((currentObject) => {
      if (currentObject !== undefined) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [prop, val] of Object.entries(currentObject)) {
          hashKeyValues.push([prop, val]);
        }
      }
    });
    // reset size to double itself
    this.SIZE *= 2;
    // reset storage to an array of size SIZE
    this.storage = new Array(this.SIZE);
    // loop through stored key, value pairs adding them back into hashtable
    // eslint-disable-next-line no-restricted-syntax
    for (const [prop, val] of hashKeyValues) {
      // set a const eqaul to hash value of key
      const hash = hashCode(prop, this.SIZE);
      // if hashtable location of key isn't intitialized, set equal to object
      if (!this.storage[hash]) this.storage[hash] = {};
      // set a KEY, VALUE pair of object at location HASH in hashtable
      this.storage[hash][prop] = val;
    }
  }

  // set a const eqaul to hash value of key
  const hash = hashCode(key, this.SIZE);
  // if hashtable location of key isn't intitialized, set equal to object
  if (!this.storage[hash]) this.storage[hash] = {};
  // set a KEY, VALUE pair of object at location HASH in hashtable
  this.storage[hash][key] = value;
  // return amount of items stored in hashtable
  return this.amount;
};

const hasher = new HashTable();
for (let i = 0; i < 16; i++) {
  hasher.set(i, i);
}
console.log(hasher);
console.log(hasher.SIZE);

/**
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function (key) {
  if (key === undefined) throw Error('Usage: <hashtablename>.get(<yourkey>)');
  // set a const eqaul to hash value of key
  const hash = hashCode(key, this.SIZE);
  // check to see if value with entered key exists in hashtable
  if (!this.storage[hash] || !this.storage[hash].hasOwnProperty(key)) return `No value with KEY: '${key}' exists in hashtable.`;
  // return the value located at the hashtable position of HASH with KEY as the property
  return this.storage[hash][key];
};

// console.log(hasher.get('hi'));
// console.log(hasher.get(0));

/**
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  if (key === undefined) throw Error('Usage: <hashtablename>.remove(<yourkey>)');
  // set a const eqaul to hash value of key

  // decrement amount by one
  this.amount--;

  // if amount SIZE is greater than 16 and amount is less than 25% of SIZE
  if (this.SIZE > 16 && this.amount / this.SIZE < 1 / 4) {
    // store hashed key, value pairs in an array
    const hashKeyValues = [];
    this.storage.forEach((currentObject) => {
      if (currentObject !== undefined) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [prop, val] of Object.entries(currentObject)) {
          hashKeyValues.push([prop, val]);
        }
      }
    });
    // reset size to half itself
    this.SIZE /= 2;
    // reset storage to an array of size SIZE
    this.storage = new Array(this.SIZE);
    // loop through stored key, value pairs adding them back into hashtable
    // eslint-disable-next-line no-restricted-syntax
    for (const [prop, val] of hashKeyValues) {
      // set a const eqaul to hash value of key
      const hash = hashCode(prop, this.SIZE);
      // if hashtable location of key isn't intitialized, set equal to object
      if (!this.storage[hash]) this.storage[hash] = {};
      // set a KEY, VALUE pair of object at location HASH in hashtable
      this.storage[hash][prop] = val;
    }
  }

  const hash = hashCode(key, this.SIZE);
  // check to see if value with entered key exists in hashtable
  if (!this.storage[hash] || !this.storage[hash].hasOwnProperty(key)) return undefined;
  // store value of key, value pair to be removed
  const deleted = this.storage[hash][key];
  // delete the key, value pair at the location of KEY hashed in hashtable
  delete this.storage[hash][key];
  this.amount--;
  if (Object.keys(this.storage[hash]).length === 0) this.storage[hash] = undefined;
  // return DELETED
  return deleted;
};


for (let i = 0; i < 10; i++) {
  hasher.remove(i, i);
}
console.log(hasher);
console.log(hasher.SIZE);


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

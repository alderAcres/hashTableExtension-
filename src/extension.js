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
  // add numStored property to HashTable in order to keep track of the number of items stored in table
  this.numStored = 0;
}

HashTable.prototype.set = function(key, value) {
  // use if statement to check if key is a string and value is not null or undefined
  if (typeof key !== 'string' || value === null || value === undefined) return undefined;
  // declare a variable and set it to the value of the invoked hashCode function
  const hashKey = hashCode(key, this.SIZE);

  // use if statement to check if this.numStored + 1 > this.SIZE * 0.75
  if (this.numStored + 1 > this.SIZE * 0.75) {
    // if so, declare variable oldHashSize and set it to this.SIZE
    const oldHashSize = this.SIZE;
    // set this.SIZE to this.SIZE * 2
    this.SIZE *= 2;
    // iterate through hashtable 
      // if hashtable at current index exists, iterate through keys
        // for each key, create a new hash code based on this.SIZE as well as the old hash code based on oldHashSize
        // move the key value pair to the new hash based on this.SIZE
        // delete key value pair at the old hash code

    // alternatively, iterate through hash table and move all the objects into one giant object
    // iterate through that object and rehash every key value pair using this.SIZE
    // delete every key value pair at the old hash code
  }

  // use an if statement to check if the storage array at the hashKey index already has an object
    // if not, create an empty object
  if (this.storage[hashKey] === undefined) this.storage[hashKey] = {};
  // use if statement to check if the key is already in this.storage
    // if not, then increment this.numStored
  if (!this.storage[hashKey][key]) this.numStored++;
  // add the key value pair
  this.storage[hashKey][key] = value;
  // return this.numStored
  return this.numStored;
};

// const Test = new HashTable();
// console.log(Test.set('name', 'Brian'));
// console.log(Test.set('name', 'Jack'));
// console.log(Test.set('Name', 'Terry'));
// console.log(Test.set('age', 28));
// console.log(Test.set('boolean', true));
// console.log(Test.set(true, 'key is not a string'));
// console.log(Test.set('undefined', undefined));
// console.log(Test.set('null', null));
// console.log(Test);


HashTable.prototype.get = function(key) {
  // use if statement to check if key is a string
  if (typeof key !== 'string') return undefined;
  // declare a variable and set it to the value of the invoked hashCode function
  const hashKey = hashCode(key, this.SIZE);
  // use if statement to check if hashKey or key exists in this.storage
    // if not, then return undefined
  if (!this.storage[hashKey] || !this.storage[hashKey][key]) return undefined;
  // return this.storage at index hashKey and property key
  return this.storage[hashKey][key];
};

// console.log(Test.get('name'));
// console.log(Test.get(undefined));
// console.log(Test.get(23));
// console.log(Test.get('location'));

HashTable.prototype.remove = function(key) {
  // use if statement to check if key is a string
  if (typeof key !== 'string') return undefined;
  // declare a variable and set it to the value of the invoked hashCode function
  const hashKey = hashCode(key, this.SIZE);
  // use if statement to check if hashKey or key exists in this.storage
  // if not, then return undefined
  if (!this.storage[hashKey] || !this.storage[hashKey][key]) return undefined;
  // declare a variable 'value' to store the value of key in this.storage
  const value = this.storage[hashKey][key];
  // delete key from this.storage
  delete this.storage[hashKey][key];
  // decrement this.numStored
  this.numStored--;
  // return value variable
  return value;
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

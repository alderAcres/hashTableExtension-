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
  this.filled = 0;  // new property that will track number of items 
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

  // when adding items in hashtable, we have to check if 75% of space is taken
  // if so, we double the hashtable space and reassign the addresses 
  if (this.filled / this.SIZE * 100 >= 75) this.resize(2);

  // where key, value pair is stored through hashcode address
  const location = hashCode(key, this.SIZE);

  // if there is already an object at address, then add key, value pair 
  // into object 
  if (typeof this.storage[location] === 'object') {
    this.storage[location][key] = value;
  }

  // otherwise, create an object to add the key, value pair into 
  else {
    const obj = {};
    this.storage[location] = obj;
    obj[key] = value;
  }

  this.filled += 1;   // number of items increases
  return this.filled;

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

  // where key, value pair is stored through hashcode address
  const location = hashCode(key, this.SIZE);

  // at that address, there is either an object or nothing stored 
  if (typeof this.storage[location] === 'object') {
    // if object, find the key, value in the object 
    return this.storage[location][key];
  }
  // else return 'nothing' (either '' or undefined)
  return this.storage[location];

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

  // when removing items in hashtable, we check if 25% of space is reached
  // if so, we halve the hashtable space and reassign the addresses 
  if (Math.floor(this.filled / this.SIZE * 100) <= 25) this.resize(0.5);

  // where key, value pair is stored through hashcode address
  const location = hashCode(key, this.SIZE);

  // store value before deleting from hash table 
  let temp = this.get(key);
  
  // temp is either undefined (because no key, value exists) or a value 
  if (temp !== undefined) {
    // if key, value exists, then delete it
    delete this.storage[location][key];
    this.filled -=1;  // one less item is in hashtable 
  }
  return temp;      // return value deleted 

};

// new function to resize whenever too many or too few items are in hashtable
HashTable.prototype.resize = function(multiplier) {

  // don't halve if hashtable is size 16 
  if (this.SIZE <= 16 && multiplier === 0.5) return;

  // otherwise, make a new array for storage
  this.SIZE = this.SIZE *= multiplier;
  let temp = this.storage;
  this.storage = new Array(this.SIZE);
  // redistribute the key, value pairs with new hashcode addresses into storage
  for (let i = 0; i < temp.length; i++) {
    if (typeof temp[i] === 'object') {
      Object.keys(temp[i]).forEach(key => {
        this.set(key, temp[i][key]);
        this.filled -= 1; // BAD CODE. Quick fix to maintain correct number 
                          // of items because this.set automatically 
                          // increments this.filled
      });
    }
  }

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

// FOR TESTING 
console.log(12/16 * 100);
console.log(Math.floor(8/32 * 100));

hte = new HashTable();
for (let i = 0; i < 12; i++) {
  const key = 'key ' + i;
  const value = 'value ' + i;
  hte.set(key, value);
}
console.log(hte.storage);

console.log(hte.filled);
console.log(hte.SIZE);
console.log(hte.set('key 12', 'value 12'));
console.log(hte.filled);
console.log(hte.SIZE);
console.log(hte.storage);

for (let i = 0; i < 5; i++) {
  const key = 'key ' + i;
  hte.remove(key);
  console.log(hte.filled);
}
console.log(hte.storage);
console.log(hte.remove('key 5'));
console.log(hte.storage);

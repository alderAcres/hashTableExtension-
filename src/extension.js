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
  this.items = 0;
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
  //test to see if adding one more item will push the item count to over 75% of the total size of the table;
  if (this.items + 1 > this.SIZE * .75) {
    this.SIZE = this.SIZE * 2;
    let newStorage = new Array(this.SIZE);
    //iterate over each hash object in the storage array
    this.storage.forEach((element) => {
    // if the item is not undefined. iterate over the objects keys incase of multiple items in the hash container
      if (element !== undefined) {
        let keys = Object.keys(element);
        keys.forEach((property)=> {
    //create a new hashcode with the key and size of new hashtable
          let hash = hashCode(property, this.SIZE)
    // set the new storage array at the hash to be an object with the old key and value from the original hashtable
          newStorage[hash] = { [property]: element[property] };
        });
      }
    })
    // after this nested for each completes, our existing hash table should be rehashed, then we use the same code to add a new value after updating this.SIZE, and this.storage
    this.storage = newStorage;
  }
  const hash = hashCode(key, this.SIZE)
  if (this.storage[hash] === undefined) {
    this.storage[hash] = { [key]: value}
    this.items+=1;
  } else {
    this.storage[hash][key] = value;
    this.items+=1;
  }
  return 
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
  const hash = hashCode(key, this.SIZE)
  return this.storage[hash][key];
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
  // check to see if removing an item will leave the item count to less than 25% of the hashtables size, if so, then cut this.SIZE in half and rehash table
  if (this.items - 1 < this.SIZE * .25) {
    this.SIZE = this.SIZE / 2;
    let newStorage = new Array(this.SIZE);
    //iterate over each hash object in the storage array
    this.storage.forEach((element) => {
    // if the item is not undefined. iterate over the objects keys incase of multiple items in the hash container
      if (element !== undefined) {
        let keys = Object.keys(element);
        keys.forEach((property)=> {
    //create a new hashcode with the key and size of new hashtable
          let hash = hashCode(property, this.SIZE)
    // set the new storage array at the hash to be an object with the old key and value from the original hashtable
          newStorage[hash] = { [property]: element[property] };
        });
      }
    })
    // after this nested for each completes, our existing hash table should be rehashed, then we use the same code to add a new value after updating this.SIZE, and this.storage
    this.storage = newStorage;
  }
 let hash = hashCode(key, this.SIZE);
 if (this.storage[hash] === undefined) {
   return undefined;
 } else {
   const removed = this.storage[hash][key];
   delete this.storage[hash][key];
   this.items-=1; 
   return removed;
 }
 
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


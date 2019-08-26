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
  this.SIZE = 4;
  this.numItems = 0;
  this.storage = new Array(this.SIZE);
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
**
  - If adding the new item will push the number of stored items to over 75% of
    the hash table's SIZE, then double the hash table's SIZE and rehash everything
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  this.numItems++;
  if (this.numItems > this.SIZE * 0.75) {
    this.storage = this.resize(this.SIZE * 2);
    this.SIZE *= 2;
  } 
  let hashedKey = hashCode(key, this.SIZE);
  if (!this.storage[hashedKey]) {
    const newBucket = {};
    newBucket[key] = value;
    this.storage[hashedKey] = newBucket;
  } else {
    this.storage[hashedKey][key] = value;
  }
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
  let hashedKey = hashCode(key, this.SIZE);
  if (this.storage[hashedKey] === undefined) {
    return undefined;
  }
  return this.storage[hashedKey][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
  - If the hash table's SIZE is greater than 16 and the result of removing the
    item drops the number of stored items to be less than 25% of the hash table's SIZE
    (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  this.numItems--;
  if (this.SIZE > 16 && this.numItems < Math.floor(this.SIZE * 0.25)) {
    const newSize = Math.ceil(this.SIZE * 0.5);
    this.storage = this.resize(newSize);
    this.SIZE *= 0.5;
  }
  let hashedKey = hashCode(key, this.SIZE);
  let targetVal = this.storage[hashedKey][key];
  if (targetVal === undefined) {
    return undefined;
  }
  delete this.storage[hashedKey][key];
  if (Object.keys(this.storage[hashedKey]).length === 0) {
    this.storage[hashedKey] = undefined;
  }
};

HashTable.prototype.resize = function(newSize) {
  const newStorage = new Array(newSize);
  this.storage.forEach( bucket => {
    if (bucket) {
      Object.keys(bucket).forEach( key => {
        let oldHashedKey = hashCode(key, this.SIZE);
        let resizedHashedKey = hashCode(key, newSize);
        if (!newStorage[resizedHashedKey]) {
          const newBucket = {};
          newBucket[key] = this.storage[oldHashedKey];
          newStorage[resizedHashedKey] = newBucket;
        } else {
          newStorage[resizedHashedKey][key] = this.storage[oldHashedKey];
        }
      })
    }
  });
  return newStorage;
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

// const myHashTable = new HashTable();
// myHashTable.set("hiik", "doo"); 
// myHashTable.set("hihj", "foo"); // collision with prev
// myHashTable.set("foo", "bar");
// myHashTable.set("doo", "bie");
// console.log(myHashTable.SIZE);
// // console.log(myHashTable.storage);
// console.log(myHashTable.get("hiik")); // prints doo
// console.log(myHashTable.get("hihj")); // prints foo
// console.log(myHashTable.get("foo"));
// console.log(myHashTable.get("doo"));
// myHashTable.remove("foo");
// myHashTable.remove("hihj");
// myHashTable.remove("hihj");
// console.log(myHashTable.get("foo"));
// console.log(myHashTable.SIZE, myHashTable.numItems);

// Do not remove!!
module.exports = HashTable;



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
  this.storedKeys = 0;
  this.upperThreshold = 0.75;
  this.lowerThreshold = 0.25;
}

HashTable.prototype.reHash = function () {
  const allKeys = this.storage.reduce((keys, bucket) => bucket ? {...keys, ...bucket} : keys, {})
  this.storage = new Array(this.SIZE); // reset storage
  this.storedKeys = 0;
  Object.entries(allKeys).forEach(([key, value])=> this.set(key, value)) // rehash and store keys
}


HashTable.prototype.increaseSize = function() {
  this.SIZE = this.SIZE * 2;
  this.reHash();
}

HashTable.prototype.decreaseSize = function() {
  this.SIZE = this.SIZE / 2;
  this.reHash();
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
  const hashIndex = hashCode(key,this.SIZE);
  // since duplicate keys can be overwritten, we can use an object instead of a list as our storage.
  if (!this.storage[hashIndex]) this.storage[hashIndex] = {}; // create empty object in bucket if not initialized
  if (!this.storage[hashIndex][key]) this.storedKeys++ // increase storage
  this.storage[hashIndex][key] = value;
  // check if new key pushes storedKeys over max threshold
  if (this.storedKeys / this.SIZE > this.upperThreshold) this.increaseSize()
  return this.storedKeys;
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
  const hashIndex = hashCode(key, this.SIZE);
  return this.storage[hashIndex]?.[key]
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
  const hashIndex = hashCode(key, this.SIZE);
  const storedVal  = this.storage[hashIndex]?.[key];
  if (this.storage[hashIndex]?.[key]) this.storedKeys--; // decrement storedKeys counter if key exists
  delete this.storage[hashIndex]?.[key];
  if (this.SIZE > 16 && this.storedKeys / this.SIZE < this.lowerThreshold) this.decreaseSize()
  return storedVal;
};


// Do not modify
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


// tests

const changingTable = new HashTable();
for (let i = 0; i < 13; i++) {
  const key = `key${i}`;
  const value = i;
  changingTable.set(key, value);
}

console.log(changingTable.SIZE)
console.log(changingTable.get('key5'))

for (let i = 6; i > 0; i--) {
  const key = `key${i}`;
  changingTable.remove(key);
}

console.log(changingTable.SIZE)
console.log(changingTable.get('key0'))
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
* HashTable constructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable(size = 16, minSize = 16) {
  this.SIZE = size;
  this.MIN_SIZE = minSize;
  
  this.storage = new Array(this.SIZE);
  this.noStored = 0;
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
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) this.storage[hash][key] = value;
  else {
    const obj = {};
    obj[key] = value;
    this.storage[hash] = obj;
  }
  this.noStored++;
  if (this.aboveCapacity()) this.doubleSize();
};

HashTable.prototype.aboveCapacity = function() { return this.noStored / this.SIZE >= 0.75; }

HashTable.prototype.doubleSize = function() {
  this.SIZE = this.SIZE * 2;
  this.rehash();
}

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specified key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash]) return this.storage[hash][key];
  return undefined;
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
  const hash = hashCode(key, this.SIZE);
  const cache = this.storage[hash][key];
  delete this.storage[hash][key];
  this.noStored--;
  if (this.belowCapacity()) this.halveSize();
  return cache;
};

HashTable.prototype.belowCapacity = function() { return this.noStored / this.SIZE <= 0.25 && this.SIZE > this.MIN_SIZE }

HashTable.prototype.halveSize = function() {
  this.SIZE = Math.round(this.SIZE / 2);
  this.rehash();
}

HashTable.prototype.rehash = function() {
  const rehash = new HashTable(this.SIZE);
  for (hash in this.storage) for (const [k, v] of Object.entries(this.storage[hash])) rehash.set(k, v);
  this.storage = rehash.storage;
}

// MY TESTS
const hashTable = new HashTable();
for (let i = 0; i < 32; i++) {
  hashTable.set('k' + i, 'v' + i);
}
console.log('hashTable with new values', hashTable);


for (let i = 0; i < 32; i++) {
  console.log(`get: k${i}, v${i}`, hashTable.get('k' + i, 'v' + i));
}
console.log("hashTable.get('asdf')", hashTable.get('asdf'));

for (let i = 0; i < 32; i++) {
  console.log(`remove: k${i}`, hashTable.remove('k' + i));
}

console.log('hashTable', hashTable);
// -- END OF TESTS --

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

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
  let percentFilled = this.storage.filter(el => el !== undefined).length/this.SIZE * 100;
  console.log(percentFilled);
  
  if (percentFilled > 75) {
    this.SIZE *= 2;
    // loop over all the existing keys and re-hash
    let arrayOfAllKeys = [];
    this.storage.forEach(bucket => arrayOfAllEntries = [...Object.entries(bucket)]);
    // iterate over all of the key-value pairs, and use the helper hasher function to re-bucket everything
    
  } else {
    helperHasher(key, value);
  };

  function helperHasher(key, value) {
      if (!this.storage[hashIndex]) {
        const hashIndex = hashCode(key, this.SIZE);
        this.storage[hashIndex] = {[key]: value};
      } else {
        this.storage[hashIndex][key] = value;
      }
    };
  }

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
  // use hash function to get the index from which to retrieve the provided value
  const hashIndex = hashCode(key, this.SIZE);
  // access the value from the hashTable using bracket notation
  return this.storage[hashIndex][key];
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
  // use hash function to get the index from which to delete the provided key-value pair
  const hashIndex = hashCode(key, this.SIZE);
  // grab the value to return later; if it does not exit, removedVal will be undefined
  const removedVal = this.storage[hashIndex][key];
  delete this.storage[hashIndex][key];
  return removedVal;
};

const myTable = new HashTable();
console.log(myTable);
myTable.set('a','1');
myTable.set('b','1');
myTable.set('c','1');
myTable.set('d','1');
myTable.set('e','1');
myTable.set('f','1');
myTable.set('g','1');
myTable.set('h','1');
myTable.set('i','1');
myTable.set('j','1');
myTable.set('k','1');
myTable.set('l','1');
myTable.set('m','1');
myTable.set('n','1');
console.log(myTable);
myTable.set('o','1');
myTable.set('p', '2')
console.log(myTable.SIZE);


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

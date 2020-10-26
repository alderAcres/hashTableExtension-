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
  // Get the index of the HashTable that the key will go into from the hashCode function.
  const hashIndex = hashCode(key, this.SIZE);
  // If the index hashIndex in this.storage is undefined, create a new object in the location.
  if (!this.storage[hashIndex]) {
    this.storage[hashIndex] = {};
  }
  // If the key doesn't already exist in the object at hashIndex, increment the number of stored items
  if (!this.storage[hashIndex][key]) {
    this.items ++;
    if (this.items > (this.SIZE * 0.75)) {
      this.SIZE = this.SIZE * 2;
      for (let el of this.storage) {
        console.log(el);
        for (let key in el) {
          console.log(key);
          let k = key;
          let v = el[k];
          // Breaks here
          this.remove(key);
          this.set(k, v);
        }
      }
    }
  }
  // Store the key value pairs within the object in hashIndex location in this.storage
  // If key already exists, it will overwrite. If not, it will add a new key value pair.
  this.storage[hashIndex][key] = value;
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
  // Get the index of the HashTable that the key would have been stored into in this.storage
  const hashIndex = hashCode(key, this.SIZE);
  // Look into the hashIndex location. If the key does not exist, return undefined
  if (!this.storage[hashIndex]) {
    return undefined;
  }
  // Else, return the value of the correct key within the object at hashIndex
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
  // Get the index of the HashTable that the key would have been stored into in this.storage
  const hashIndex = hashCode(key, this.SIZE);
  // Look into the hashIndex location. If the key does not exist, return undefined
  if (!this.storage[hashIndex][key]) {
    return undefined;
  }
  // Else, find the value of the correctt key within the object at hashIndex
  const value = this.storage[hashIndex][key];
  // Delete the key value pair from this.storage
  delete this.storage[hashIndex][key];
  // Decrement number of items;
  this.items--;
  // Return the value found earlier
  return value;
};


// // T E S T I N G!!!

// Create an array hashTab with __proto__ bond to prototype methods
const hashTab = new HashTable;
// Add key value pairs 'one':'a' and 'two':'b' to array
hashTab.set('one', 'a');
hashTab.set('two', 'b');
console.log(hashTab.storage); // [ , , , , , , , , , , , , , , , , NaN: { one: 'a', two: 'b' } ] 
console.log(hashTab.items); // 2
// Overwrite value of key 'one' with 'c'. Number of items should remain the same.
hashTab.set('one', 'c');
console.log(hashTab.storage); // [ , , , , , , , , , , , , , , , , NaN: { one: 'c', two: 'b' } ]
console.log(hashTab.items); // 2
// "get" the value of key 'two'
console.log(hashTab.get('two')); // b
// "get" the value of a key that doesn't exist
console.log(hashTab.get('three')); // undefined
// "remove" the key value pair 'one' and return the value of key 'one'
console.log(hashTab.remove('one')); // c
console.log(hashTab.storage); // [ , , , , , , , , , , , , , , , , NaN: { two: 'b' } ]

hashTab.set('one', 'a');
hashTab.set('three', 'c');
hashTab.set('four', 'd');
hashTab.set('five', 'e');
hashTab.set('six', 'f');
hashTab.set('seven', 'g');
hashTab.set('eight', 'h');
hashTab.set('nine', 'i');
hashTab.set('ten', 'j');
hashTab.set('eleven', 'k');
hashTab.set('twelve', 'l');
hashTab.set('thirteen', 'k');
console.log(hashTab.items);
console.log(hashTab.set('fourteen', 'get'))
console.log(hashTab.SIZE);
console.log(this.storage);


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

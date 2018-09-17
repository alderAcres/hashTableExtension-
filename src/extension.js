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
  // Add parameter to track storage size
  this.storageSize = 0;
  // Add parameter to track if Hash Table is currently resizing
  this.resizing = false;
  // Add an array to track all keys and an array to track all values
  this.storedKeys = [];
  this.storedValues = [];
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function set(key, value) {
  // Run key through hashCode to retrieve hash table storage placement
  const index = hashCode(key, this.SIZE);
  // Check if object already exists at hash table at index storage
  if (!this.storage[index]) {
    // If not, declare an object at that location
    this.storage[index] = {};
  } 
  // Add the key/value pair to the object at storage[index]
  this.storage[index][key] = value;
  // If not currently resizing, add the key and value to key/value arrays and increment storageSize
  if (!this.resizing) {
    this.storedKeys.push(key);
    this.storedValues.push(value);
    this.storageSize += 1;
    this.resizeUp();
  }
  // Check whether the table needs to be resized up
  // Return storageSize
  return this.storageSize;
};

HashTable.prototype.get = function get(key) {
  // Run key through hashCode to retrieve hash table storage placement
  const index = hashCode(key, this.SIZE);
  // Go to that index in hash table storage, retrieve the value associated with the key
  return this.storage[index] ? this.storage[index][key] : undefined;
};

HashTable.prototype.remove = function remove(key) {
  // Run key through hashCode to retrieve hash table storage placement
  const index = hashCode(key, this.SIZE);
  // Retrieve and cache the value associated with the key at that index in hash table storage
  const cache = this.storage[index] ? this.storage[index][key] : undefined;
  // Set the value associated with the key at that index in hash table storage to 'undefined'
  if (this.storage[index]) {
    this.storage[index][key] = undefined;
    // If not resizing, remove key/value from Key/Value arrays and decrement value of storageSize
    if (!this.resizing) {
      this.storedValues.splice(this.storedKeys.indexOf(key), 1);
      this.storedKeys.splice(this.storedKeys.indexOf(key), 1);
      this.storageSize -= 1;
      // Check whether the table needs to be resized up
      this.resizeDown();
    }
  }
  // Return the cached value
  return cache;
};

// New method: resizeUp
// If adding the new item will push the number of stored items to over 75% of
// the hash table's SIZE, then double the hash table's SIZE and rehash everything
HashTable.prototype.resizeUp = function resizeUp() {
  // Check if conditions for resizing up have been met
  if (this.storageSize > (this.SIZE * 3 / 4)) {
    // Set resizing flag to on
    this.resizing = true;
    // Remove every key/value from the hash table
    this.storedKeys.forEach(key => this.remove(key));
    // Double hash table size
    this.SIZE *= 2;
    // Rehash all key/value pairs
    this.storedKeys.forEach((key, index) => this.set(key, this.storedValues[index]));
    // Set resizing flag to off
    this.resizing = false;
  }
};

// New method: resizeDown
// If the hash table's SIZE is greater than 16 and the result of removing the
// item drops the number of stored items to be less than 25% of the hash table's SIZE
// (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
HashTable.prototype.resizeDown = function resizeDown() {
  // Check if conditions for resizing down have been met
  if (this.SIZE > 16 && this.storageSize < (this.SIZE * 1 / 4)) {
    // Set resizing flag to on
    this.resizing = true;
    // Remove every key/value from the hash table
    this.storedKeys.forEach(key => this.remove(key));
    // Halve hash table size
    this.SIZE /= 2;
    // Rehash all key/value pairs
    this.storedKeys.forEach((key, index) => this.set(key, this.storedValues[index]));
    // Set resizing flag to off
    this.resizing = false;
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

// console.log('---TEST CASES---');
// console.log('Step 1: Declare a Hash Table with "const hashTable = new HashTable()"')
// const hashTable = new HashTable()
// console.log('\nStep 2: Add enough key/value pairs into hashTable to trigger resize');
// console.log('Use a for loop to create 14 key/value pairs resembling "k1" "v1" ... "k12" "v12"')
// for (let i = 0; i < 14; i += 1) {
//   const inKey = 'k' + i;
//   const inValue = 'v' + i;
//   hashTable.set(inKey, inValue);
// }
// console.log(`hashTable.resizing: expect -> 'false': actual -> ${hashTable.resizing}`);
// console.log(`hashTable.storageSize: expect -> '14': actual -> ${hashTable.storageSize}`);
// console.log(`hashTable.SIZE: expect -> '32': actual -> ${hashTable.SIZE}`);
// console.log(`hashTable.get('k1'): expect -> 'v1': actual -> ${hashTable.get('k1')}`);
// console.log(`hashTable.get('k12'): expect -> 'v12': actual -> ${hashTable.get('k12')}`);
// console.log('\nStep 3: Add enough key/value pairs into hashTable to trigger another resize');
// console.log('Use a for loop to create key/value pairs up to "k25" and "v25"')
// for (let i = 15; i < 26; i += 1) {
//   const inKey = `k + ${i}`;
//   const inValue = `v + ${i}`;
//   hashTable.set(inKey, inValue);
// }
// console.log(`hashTable.resizing: expect -> 'false': actual -> ${hashTable.resizing}`);
// console.log(`hashTable.storageSize: expect -> '25': actual -> ${hashTable.storageSize}`);
// console.log(`hashTable.SIZE: expect -> '64': actual -> ${hashTable.SIZE}`);
// console.log(`hashTable.get('k1'): expect -> 'v1': actual -> ${hashTable.get('k1')}`);
// console.log(`hashTable.get('k24'): expect -> 'v24': actual -> ${hashTable.get('k24')}`);

// console.log('\nStep 4: Use a loop to remove key/value pairs from hashTable to trigger resize');
// for (let i = 25; i > 14; i -= 1) {
//   const inKey = `k + ${i}`;
//   hashTable.remove(inKey);
// }
// console.log(`hashTable.resizing: expect -> 'false': actual -> ${hashTable.resizing}`);
// console.log(`hashTable.storageSize: expect -> '14': actual -> ${hashTable.storageSize}`);
// console.log(`hashTable.SIZE: expect -> '32': actual -> ${hashTable.SIZE}`);
// console.log(`hashTable.get('k1'): expect -> 'v1': actual -> ${hashTable.get('k1')}`);
// console.log(`hashTable.get('k12'): expect -> 'v12': actual -> ${hashTable.get('k12')}`);
// console.log(`hashTable.get('k24'): expect -> 'undefined': actual -> ${hashTable.get('k24')}`);

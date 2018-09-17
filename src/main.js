/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  // Add parameter to track storage size
  this.storageSize = 0;
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
  // Increment and return storageSize
  this.storageSize += 1;
  return this.storageSize;
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
HashTable.prototype.get = function get(key) {
  // Run key through hashCode to retrieve hash table storage placement
  const index = hashCode(key, this.SIZE);
  // Go to that index in hash table storage, retrieve the value associated with the key
  return this.storage[index] ? this.storage[index][key] : undefined;
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function remove(key) {
  // Run key through hashCode to retrieve hash table storage placement
  const index = hashCode(key, this.SIZE);
  // Retrieve and cache the value associated with the key at that index in hash table storage
  const cache = this.storage[index] ? this.storage[index][key] : undefined;
  // Set the value associated with the key at that index in hash table storage to 'undefined'
  if (this.storage[index]) {
    this.storage[index][key] = undefined;
    // Decrement value of storageSize
    this.storageSize -= 1;
  }
  // Return the cached value
  return cache;
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

// Do not remove!!
module.exports = HashTable;

// console.log('---TEST CASES---');
// console.log('Step 1: Declare a Hash Table with "const hashTable = new HashTable()"')
// const hashTable = new HashTable()
// console.log('\nStep 2: Add several key/value pairs into hashTable using "hashTable.set(key, value)');
// console.log(`hashTable.set('k1', 'apple'): expect -> 1: actual -> ${hashTable.set('k1', 'apple')}`);
// console.log(`hashTable.set('k2', 'banana'): expect -> 2: actual -> ${hashTable.set('k2', 'banana')}`);
// console.log(`hashTable.set('k3', 'grape'): expect -> 3: actual -> ${hashTable.set('k3', 'grape')}`);
// console.log(`hashTable.set('k4', 'orange'): expect -> 4: actual -> ${hashTable.set('k4', 'orange')}`);
// console.log(`hashTable.set('k5', 'pear'): expect -> 5: actual -> ${hashTable.set('k5', 'pear')}`);
// console.log(`hashTable.set('k6', 'tangerine'): expect -> 6: actual -> ${hashTable.set('k6', 'tangerine')}`);
// console.log('\nStep 3: Retrieve values using "hashtable.get(key)"');
// console.log(`hashTable.get('k1'): expect -> 'apple': actual -> ${hashTable.get('k1')}`);
// console.log(`hashTable.get('k2'): expect -> 'banana': actual -> ${hashTable.get('k2')}`);
// console.log(`hashTable.get('k3'): expect -> 'grape': actual -> ${hashTable.get('k3')}`);
// console.log(`hashTable.get('k4'): expect -> 'orange': actual -> ${hashTable.get('k4')}`);
// console.log(`hashTable.get('k5'): expect -> 'pear': actual -> ${hashTable.get('k5')}`);
// console.log(`hashTable.get('k6'): expect -> 'tangerine': actual -> ${hashTable.get('k6')}`);
// console.log(`hashTable.get('k1'): expect -> 'apple': actual -> ${hashTable.get('k1')}`);
// console.log('\nStep 4: Remove values using "hashTable.remove(key)"');
// console.log(`hashTable.remove('k1'): expect -> 'apple': actual -> ${hashTable.remove('k1')}`);
// console.log(`hashTable.get('k1'): expect -> 'undefined': actual -> ${hashTable.get('k1')}`);
// console.log(`hashTable.remove('k2'): expect -> 'banana': actual -> ${hashTable.remove('k2')}`);
// console.log(`hashTable.get('k2'): expect -> 'undefined': actual -> ${hashTable.get('k2')}`);
// console.log(`hashTable.remove('k3'): expect -> 'grape': actual -> ${hashTable.remove('k3')}`);
// console.log(`hashTable.get('k3'): expect -> 'undefined': actual -> ${hashTable.get('k3')}`);
// console.log(`hashTable.remove('k9'): expect -> 'undefined': actual -> ${hashTable.remove('k9')}`);
// console.log(`hashTable.get('k9'): expect -> 'undefined': actual -> ${hashTable.get('k9')}`);
// console.log(`hashTable.set('k9', 'dog'): expect -> 4: actual -> ${hashTable.set('k9', 'dog')}`);
// console.log(`hashTable.get('k9'): expect -> 'dog': actual -> ${hashTable.get('k9')}`);

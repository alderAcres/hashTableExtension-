/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
  this.numItems = 0; // This variable represents the number of items in the storage array
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
HashTable.prototype.set = function (key, value) {
  const idx = hashCode(key, this.SIZE); // Convert the key into an index in the range [0, this.SIZE - 1] *inclusive
  // If there is nothing at this idx...
  if (!this.storage[idx]) {
    this.storage[idx] = {}; // Create an object at this idx (it will be used to handle collisions)
    this.storage[idx][key] = value; // Add our key-value property to this object
    this.numItems += 1; // Increment numItems since we just added a new item
  }
  // Otherwise,
  else {
    if (!this.storage[idx][key]) this.numItems += 1; // If we are not going to overwrite a value, increment numItems
    this.storage[idx][key] = value; // Store our key-value pair in this object
  }
  return this.numItems; // Return numItems
};

ht = new HashTable();
console.log(ht.set('hey!', 12));
console.log(ht.set('ok', 5));
console.log(ht.set('ok', 3));
console.log(hashCode('hi', 16));
console.log(hashCode('a', 16));
console.log(ht.set('hi', 9));
console.log(ht.set('a', 18));

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
HashTable.prototype.get = function (key) {
  const idx = hashCode(key, this.SIZE); // Determine what idx our desired element is at by using the hashCode fxn
  return this.storage[idx][key]; // Go to the object stored at idx in our storage array, grab the value for our key, and return it
};

console.log(hashCode('ok', 16));
console.log(ht.storage[12]['ok']);

console.log(ht.get('hey!'));
console.log(ht.get('ok'));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  const idx = hashCode(key, this.SIZE); // Get the idx that corresponds with this key
  const returnValue = this.storage[idx][key]; // Store the value before we delete it
  delete this.storage[idx][key]; // Delete our key-value pair from the object at idx within storage
  this.numItems -= 1; // Decrement numItems since we deleted an item
  return returnValue; // Return the value we previously stored (which is also the value we deleted)
};

console.log(ht.storage[12]);
console.log(ht.remove('ok'));
console.log(hashCode('ok', 16));
console.log(ht.storage[12]);
console.log(ht.numItems);

// Do not modify
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

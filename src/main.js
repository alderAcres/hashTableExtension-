/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.itemsStored = 0;
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
HashTable.prototype.set = function (key, value) {
  // Storage is an array and I want to store an object in the appropriate locations in the array
  // This object will contain as many key value pairs as needs

  //The hashcode function tells us where in the storage array we should input our data
  let indexValue = hashCode(key, this.SIZE);
  // Check if something already exists in that location in the storage
  if (this.storage[indexValue]) {
    // If something exists add our inputted key value pair to that object
    this.storage[indexValue].key = value;
  } else {
    // If that index is undefined then create a new object and add our key value pair
    this.storage[indexValue] = { key: value };
  }
  ++this.itemsStored;
  return this.itemsStored;
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
HashTable.prototype.get = function (key) {
  // put the key in the hashcode function so we can find the index of the storage
  let indexValue = hashCode(key, this.SIZE);
  // Check if something exists at that index
  if (!this.storage[indexValue]) {
    // If nothing exists then return undefined
    return undefined;
  } else {
    // If something does exists (an object is present) then return the value of the key applied to that object
    return this.storage[indexValue].key;
  }
};

// Testing set and get
let myHash = new HashTable();
myHash.set('pass', 111);
console.log(myHash.get('pass'));
console.log(myHash.get('pass'));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  // Input key into cashcode function to get indexValue of storage
  let indexValue = hashCode(key, this.SIZE);
  if (!this.storage[indexValue]) {
    // If something does not exist then return undefined
    return undefined;
  } else {
    // If something exists then delete the appropriate key value pair of the object in that location
    // Store returned value
    let output = this.storage[indexValue].key;
    delete this.storage[indexValue].key;
    --this.itemsStored;
    return output;
  }
};

console.log(myHash.remove('pass'));

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

/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  //couldn't get my code to work :-(
  this.SIZE = 16;

  this.storage = new Array(this.SIZE); // I want my hashtable to be an array of objects, so that I can store multiple values at each index.
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
  codeValue = hashCode(key, HashTable.SIZE); // running the hashCode function to determine my key, storing to a variable

  if (
    HashTable.storage[codeValue] === 'null' ||
    HashTable.storage[codeValue] === 'undefined'
  ) {
    HashTable.storage[codeValue] = Object.create(value); // if there is an undefined or null at the hashcode index, creates an empty object literal.
  }

  if (HashTable.storage[codeValue[key]] !== value) {
    // checking to see if value at key already exists
    HashTable.storage[codeValue].push({ key: value }); // if the value is not present at that index, adds the key and value pair to that index
  } else if (HashTable.storage[codeValue[key]] === value) {
    HashTable.storage[codeValue[key]] = value; // if a value is already contained in that key, it should overwrite with new value
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
  codeValue = hashCode(key, HashTable.SIZE); // running the hashcode function to determine my key, storing it in a variable

  if (HashTable.storage[codeValue] === key) return HashTable.storage[codeValue];
  //lookup value at array[codeValue] and return it if it is present
  else return HashTable.storage[codeValue[key]]; //not sure why I need the if statement here, can I just return the specific key?
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
  codeValue = hashCode(key, HashTable.SIZE); // running the hashcode function to determine my key, storing it in a variable
  let deletedValue;

  if (HashTable.storage[codeValue] !== key) return undefined; //check if the key does not exist in the hashtable, IF TRUE return undefined
  if (HashTable.storage[codeValue] === key)
    deletedValue = HashTable.storage[codeValue[key]]; //should lookup array[codeValue] to see if it is present. If TRUE, store it to a variable (could I use .get ?)
  return deletedValue; //return the stored variable
};

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

// TESTING BELOW

// console.log(hashCode('hello', 4));
// HashTable.prototype.set(4, 'books');

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  console.log(this.SIZE);

  this.storage = new Array(this.SIZE);
}

// this.storage = [{ 'John': value, 'Lisa': value }, { 'Adam': value }]

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
  // declare variable hash to store evaluated result of invoke Hash function and passing in key
  const hash = hashCode(key, this.SIZE);

  // if there is a collision, then the value at this.storage[hash] already exists
  // in the case of a collision, assign passed-in key-value pair
  if (this.storage[hash]) {
    this.storage[hash][key] = value;
  }
  // else when we are inputting a value and there is no collision, then no value at this.storage[hash] exists
  // declare an empty object and assign it to this.storage[hash]
  // assign passed-in value to this.storage[hash][key]
  else {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  }

  // return number of items stored in hash table
  // declare variable to store number of items in hash table
  let sum = 0;
  // iterate thru each object in hash table
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i]) {
      // for each object, find the length of Object.keys()
      // add to sum variable
      sum += Object.keys(this.storage[i]).length
    }
  }
  return sum;
};

// Test Cases
// Instantiate new hash table
let hash1 = new HashTable()
// console.log(hash1);
hash1.set('Lisa', 900);
console.log(hash1.set('Adam', 1)); // should log 2


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
  // declare variable to store hash
  const hash = hashCode(key, this.SIZE)

  // look up value at this.storage[hash][key]
  return this.storage[hash][key]
};

// Test Cases
console.log(hash1.get('Lisa')); // should log 900

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  // declare variable to store hash
  const hash = hashCode(key, this.SIZE)

  // if this.storage[hash][key] exists, then delete
  if (this.storage[hash]) {
    let removed = this.storage[hash][key]
    delete this.storage[hash][key]
    return removed;
  }
  //else, return undefined
  else {
    return undefined
  }
};

console.log(hash1.remove('Lisa'));
console.log(hash1.remove('Bob'));




// Do not modify: generates random number between 0 and SIZE
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

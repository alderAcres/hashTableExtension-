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
  //store hashed index into variable
  const index = hashCode(key, this.SIZE);
  let output = 0;
  // store object into hash table if this.value === undefined
  if (!this.storage[index]) {
    this.storage[index] = {};
    this.storage[index][key] = value;
  } else this.storage[index][key] = value;
  //object at that index will contain the incoming param key as the key, incoming value as value
  //returns new number - how to determine? Iterate over array to see how many elements are objects? Time complexity???
  this.storage.forEach((el) => {
    if (el) {
      output += Object.keys(el).length;
    }
  });
  return output;
};

const test = new HashTable();
test.set('new', 'hello');
test.set('a', 'jello');
test.set('de', 'newtest');
console.log(test);

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
  //store hashed key in variable
  const index = hashCode(key, this.SIZE);
  //check if undefined - if so return what? undefined? false?
  if (!this.storage[index]) return undefined;
  //if an object, check object for the key and return it's property
  return this.storage[index][key];
};
console.log(test.get('a'));
/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  //store index
  const index = hashCode(key, this.SIZE);
  //check if storage at index is undefined, if so return undefined
  if (!this.storage[index]) return undefined;
  //if defined, create temp storage for output, set it equal to the property found at param key
  const output = this.storage[index][key];
  if (Object.keys(this.storage[index]).length === 1) delete this.storage[index];
  else delete this.storage[index][key];
  //delete -> check if you end up with an empty object?
  return output;
};

console.log(test.remove('a'));
console.log(test.remove('de'));
console.log(test);

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

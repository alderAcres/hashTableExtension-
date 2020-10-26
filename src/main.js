/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  // add a property that hold the number of items stored in the hashTable
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
HashTable.prototype.set = function (key, value) {
  // get the hash num where to put the value into the hashtable using the key and invoking the hashCode func
  const hash = hashCode(key, this.SIZE);
  // check if no object is already created in the array at that hash num if no object create one
  if (!this.storage[hash]) this.storage[hash] = {};
  // check if no existent key is in the object
  if (!this.storage[hash][key]) {
    // and set the value in the new object
    this.storage[hash][key] = value;
    // increment the number of items
    this.items++;
  }
  // if there is an existent key overwrite the old value with the new one and no need to increment the number of items
  this.storage[hash][key] = value;
  // return the number of items
  return this.items;
};
// initialize a new hashtable invoking the constructor function
const newHashTable = new HashTable();
console.log(newHashTable);
console.log(newHashTable.set('name', 'Mike')); // 1
console.log(newHashTable.set('name', 'Esma')); // 1
console.log(newHashTable.set('age', 28)); // 2
console.log(newHashTable.set('lastname', 'Sahraoui')); // 3
console.log(newHashTable);

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
HashTable.prototype.get = function (key) {
  // get the hash num from the key and the hastable size
  const hash = hashCode(key, this.SIZE);
  // return tha value corresponding to that hash num using the bracket notation with the key
  return this.storage[hash][key];
};
console.log(newHashTable.get('age')); // 28
console.log(newHashTable.get('name')); // Esma
console.log(newHashTable.get('lastname')); // Sahraoui
console.log(newHashTable.items); // 3

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  // identify the hash num of where is the element to delete
  const hash = hashCode(key, this.SIZE);
  // identify the element to delete and save it into a variable
  const toDelete = this.storage[hash][key];
  // remove the element
  delete this.storage[hash][key];
  // return the deleted element or undefined if not found
  if (!toDelete) return undefined;

  this.items--;
  return toDelete;
};
console.log(newHashTable.remove('name')); // Esma
console.log(newHashTable.remove('name')); // undefined
console.log(newHashTable.remove('age')); // 28
console.log(newHashTable.items); // 1
// Do not modify
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

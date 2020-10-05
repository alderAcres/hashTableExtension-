/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  // adding a counter to keep track of the number of items in the hash table
  this.counter = 0;
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
  //set a var to the evaluated result of the invocation of the hashcode  with the key and this.SIZE
  const index = hashCode(key, this.SIZE);
  //check if this.storage at the index is empty if yes, set it to an empty obj
  if (!this.storage[index]) {
    this.storage[index] = {};
  }
  //add the key value pair in the object at the specific index
  this.storage[index][key] = value;
  //increment the counter by 1
  this.counter++;
  return this.counter;
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
  //set a var to the evaluated result of the invocation of the hashcode  with the key and this.SIZE
  const index = hashCode(key, this.SIZE);
  //check if this.storage at the index is empty if yes, return undefined
  if (!this.storage[index]) {
    return undefined;
  }
  // return the value associated to the passed in key when invoking get
  return this.storage[index][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  //set a var to the evaluated result of the invocation of the hashcode  with the key and this.SIZE
  const index = hashCode(key, this.SIZE);
  //check if this.storage at the index or the key in the object at this index is empty if yes, return undefined
  if (!this.storage[index] || !this.storage[index][key]) {
    return undefined;
  }
  //store the key value pair to be removed
  let removed = this.storage[index][key];
  //delete the key value pair
  delete this.storage[index][key];
  //decrement the counter by 1
  this.counter--;
  //return the value that has been removed
  return removed;
};

// Do not modify
function hashCode(string, size) {
  "use strict";

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

const hashT = new HashTable();
hashT.set(10, 2);
hashT.set(15, 1);
hashT.set(120, 6);
console.log(hashT);
// console.log(hashT.get(120)); // 6
// console.log(hashT.get(15)); // 1
// console.log(hashT.get(0)); // undefined
console.log(hashT.remove(2)); //undefined
console.log(hashT.remove(10)); //2
console.log(hashT);

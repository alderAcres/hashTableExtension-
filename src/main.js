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
  this.items = 0;
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
  //run key thru hash function to obtain location (index) on storage array, store to variable
  const hashKey = hashCode(key, this.SIZE);
  //if value at that index is undefined, assign it to new object with hash key variable as key and value as value
  if (!this.storage[hashKey]) {
    this.storage[hashKey] = {};
    this.storage[hashKey][key] = value;
  } else {
    //if value exists, just add the key:value pair as a new property on the object. Overwrites should only occur if passed in key is the same
    this.storage[hashKey].key = value;
  }
  // increment and return items property;
  return ++this.items;
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
  //run key thru hash function to obtain key
  const hashKey = hashCode(key, this.SIZE);
  //return key on object at the index on storage specified by hash key
  return this.storage[hashKey][key];
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
  //run key thru hash function to obtain key
  const hashKey = hashCode(key, this.SIZE);
  //store to variable the property w key value pair at index specified by hash key
  const removed = this.storage[hashKey][key];
  //delete that property on storage obj
  delete this.storage[hashKey][key];
  //decrement items
  this.items--;
  //return stored value var
  return removed;
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

/** Testing **/
let testHT = new HashTable();
console.log('1 item ' + testHT.set('one', 1));
console.log('2 items ' + testHT.set('two', 2));
testHT.set('hi', 'hola');
testHT.set('truth', true);

// console.log(testHT);
// console.log(testHT.get('one'));
// console.log(testHT.get('hi'));
// console.log(testHT.get('truth'));
// console.log(typeof testHT.get('truth'));

console.log(testHT.remove('hi'));
console.log(testHT.remove('truth'));

console.log(testHT);

// Do not remove!!
module.exports = HashTable;

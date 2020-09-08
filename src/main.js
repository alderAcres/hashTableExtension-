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
  // get the index by passing the key through the has function
  let index = hashCode(key, this.SIZE);
  // if the hashed address contains key/value pair object, add this new key value pair to the object
  if (this.storage[index] === undefined) {
    // create an object to store data
    const bucket = {};
    bucket[key] = value;
    this.storage[index] = bucket;
  } else {
    // store the key/value pair in the bucket
    this.storage[index][key] = value;
  }

  // The new number of items stored in the hash table
  return this.SIZE;
};

const myHashTable = new HashTable();
myHashTable.set('Richie', 'a');
myHashTable.set('Richie', 'b');
myHashTable.set('richie', 'c');
// console.log(myHashTable.storage);

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
  // get the index by passing the key through the has function
  let index = hashCode(key, this.SIZE);

  // look in storage at specified index
  const valueAtIndex = this.storage[index];

  // if no bucket at index, return undefined
  if (valueAtIndex === undefined) return undefined;

  // if the value returned has more than one value/is object, find the value at key of key
  if (valueAtIndex[key]) {
    return valueAtIndex[key];
  }

  // return undefined if key is not in object
  return undefined;
};

/* Testing */
// const myHashTable2 = new HashTable();
// myHashTable2.set('Richie', 'R');
// console.log(myHashTable2.get('richie'));
// console.log(myHashTable2.get('Richie'));
// myHashTable2.set('apple', 'a');
// myHashTable2.set('richie', 'r');
// console.log(myHashTable2.get('richie'));
// console.log(myHashTable2.storage);

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  const index = hashCode(key, this.SIZE);
  // check to see if key exists in hash table, if not, return "undefined"
  if (this.storage[index] === undefined) return undefined;

  // search the object in the bucket
  // if the key is present, store it
  // delete it
  if (this.storage[index][key]) {
    const removedKey = this.storage[index][key];
    delete this.storage[index][key];
    // return removed key
    return removedKey;
  }
  // return undefined because key is not present
  return undefined;
};

/* Testing */
const myHashTable3 = new HashTable();
console.log(myHashTable3.remove('Richie'));
myHashTable3.set('Richie', 'R');
myHashTable3.set('apple', 'a');
myHashTable3.set('richie', 'r');
console.log(myHashTable3.storage);
console.log(myHashTable3.remove('richie'));
console.log(myHashTable3.storage);

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

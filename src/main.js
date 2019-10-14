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
HashTable.prototype.set = function(key, value) {
  // The hashed key which is the address in the table
  const hashKey = hashCode(key, this.SIZE);
  // console.log(hashKey);

  // There is a collision
  // Add the key value pair in the object inside the address
  if (this.storage[hashKey]) {
    // console.log(this.storage[hashKey]);

    this.storage[hashKey][key] = value;
  }
  // This is the first key value pair for the given address
  else {
    // Create an object to be stored in the address
    // The object will handle the collision
    const obj = {};
    obj[key] = value;

    this.storage[hashKey] = obj;
  }
};

const ht = new HashTable();
ht.set(1, 100);
ht.set(2, 200);
ht.set('100', 2);
ht.set('a', 1);
ht.set('123', 2);
console.log(ht.storage);

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
  // The hashed key which is the address in the table
  const hashKey = hashCode(key, this.SIZE);

  // Returns value for the specified key
  // Will return undefined if the key is not in the hash table
  return this.storage[hashKey][key];
};

console.log(ht.get('a'));
console.log(ht.get('100'));
console.log(ht.get(2));
console.log(ht.get(1));
console.log(ht.get(00));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
  // The hashed key which is the address in the table
  const hashKey = hashCode(key, this.SIZE);

  // If the key is in the hashtable
  // Save the value to be returned
  // Delete the specified key value pair
  if (this.storage[hashKey][key]) {
    const value = this.storage[hashKey][key];
    delete this.storage[hashKey][key];
    return value;
  }
  // else
  //   return undefined;
};

console.log(ht.remove(1));
console.log(ht);

console.log(ht.remove('a'));
console.log(ht);

console.log(ht.remove('123'));
console.log(ht);

console.log(ht.remove('123'));
console.log(ht);

ht.set('123', 2);
console.log(ht);

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

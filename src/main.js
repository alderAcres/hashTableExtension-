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
  // each element of hashtable is an object with key, value pair

  // pass the key into hashing func which returns the correct INDEX for the hashtable
  const INDEX = hashCode(key, this.SIZE);
  // store an object with KV pair into the returned INDEX
  if (this.storage[INDEX]) {
    this.storage[INDEX][key] = value
  } else this.storage[INDEX] = { [key] : value }
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
  // get INDEX from hash function passing in key as arg
  const INDEX = hashCode(key, this.SIZE);
  // if key doesn't exist return undefined
  if (!this.storage[INDEX]) return undefined;
  else return this.storage[INDEX][key];
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
  // get INDEX from hash code
  const INDEX = hashCode(key, this.SIZE);   
  // if index is empty return
  if (!this.storage[INDEX]) return;
  else {
    // delete the entry from obj inside of storage at INDEX
    delete this.storage[INDEX][key];
  }
};


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

// *** TESTS ***

const test = new HashTable();
//console.log(test);
test.set('name', 'Diego');
test.set('lastname', 'Vazquez');
test.set('job', 'teacher');
test.set('spouse', 'Wife');
test.set('pet', 'alligator');
console.log('testing get => ', test.get('name'));
test.remove('name');
console.log('testing get => ', test.get('name'));
console.log(test);


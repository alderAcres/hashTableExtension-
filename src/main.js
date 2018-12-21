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
  // create a hash key
  const hashkey = hashCode(key, this.SIZE);
  // if storage at hashkey is undefined
  if (!this.storage[hashkey]) {
    // create bin at place of hashkey and implement the new property
    const bin = {};
    bin[key] = value;
    this.storage[hashkey] = bin

  } else if (this.storage[hashkey][key]) {
  // else if the key is already in the bin
  // need to expand the hashtable to a larger size and move all properties
  // into the new larger hashtable, with updated hashkey indexes
  // copy the hashtable
  const temp = this.storage;
  // create larger hashtable to be twice of new hashtable
  // TODO: figure out an optimal resizing, maybe there's a more efficient way.
  this.SIZE = this.SIZE * 2;
  this.storage = new Array(this.SIZE);
  // console.log(this.storage);
  // console.log(temp);
  // add all of the properties to the larger hashtable by iterating and through recursion
  temp.forEach((bin) => {
    Object.entries(bin).forEach((property) => {
      this.set(property[0], property[1]);
    })
  })
  // console.log('called storage', this.storage);
  // add the property to the larger hashtable
  this.set(key, value);
  } else {
    // otherwise, just add the value to the hashtable bin
    this.storage[hashtable][key] = value;
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
  // create a hashkey to find the bin with the key
  const hashkey = hashCode(key, this.SIZE);
  if (!this.storage[hashkey][key]) return 'No value was set under this key';
  return this.storage[hashkey][key];
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
  // create a hashkey to find the bin
  const hashkey = hashCode(key, this.SIZE);
  // is property is undefined, return undefined
  if (!this.storage[hashkey]) return undefined;
  // declare a const to store the property value that's being removed
  const removed = this.storage[hashkey][key];
  // delete the property
  delete this.storage[hashkey][key];
  // if the object is empty then reset to be undefined;
  if (Object.keys(this.storage[hashkey]).length === 0) this.storage[hashkey] = undefined;
  // return the value that was deleted
  return removed;
};

const hash = new HashTable();
hash.set('a', 20);
hash.set('b', 30);
hash.set('c', 40);
hash.set('d', 50);
hash.set('e', 60);
hash.set('f', 70);
console.log(hash);
hash.set('a', 40);
console.log(hash);




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

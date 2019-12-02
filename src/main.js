/* eslint-disable func-names */

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
// use the hashcode to create an index using the key and size
  const index = hashCode(key, this.SIZE);
  // store the object at that specific key
  const obj = this.storage[index];
  // if the obj already exists, then set the key in the obj to be equal to the input value
  if (obj) {
    obj[key] = value;
  }
  // if the key exists, override the current key value pair
  if (key) {
    obj[key] = value;
  }
  // update the size of the hastable by 1
  this.SIZE += 1;
  // return the new size
  return this.SIZE;
};

// trying to test it, but it tells me that HashTable.set is not a function :(
console.log(HashTable.set('hi', 1));

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
  // get the index(location) using the key & size
  const index = hashCode(key, this.SIZE);
  // the hashtable object at that specific index
  const obj = this.storage[index];
  // return the value at that object key
  return obj[key];
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
  // find the index of the key in the object
  // (this is a bit repetitive, so I think I can put it outside in global scope & ref there)
  const index = hashCode(key, this.SIZE);
  // if the key doesn't exist, return undefined
  if (!key) {
    return undefined;
  }
  // save the value of what we want to remove
  const removeValue = HashTable.get(key);
  // delete it using the delete operator (essentially the same thing as obj[key])
  delete this.storage[index][key];
  // return the deleted value
  return removeValue;
};


// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

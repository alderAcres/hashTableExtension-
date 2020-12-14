/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
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
  //create a bucket variable for the key passing through hashcode
  const bucket = hashCode(key, this.SIZE);
 
  //if it is empty - overwrite the existing value
  if (this.storage[bucket] === undefined) {
    this.storage[bucket] = {key, value};
  } else if (this.storage[bucket][key] === undefined) {
     //check if the key is already in the bucket, replace with new value if so
    this.storage[bucket][key] = value;
  } else {
    //if the bucket is already being used, push the new key value pair into the current array
    this.storage[bucket].push({key, value});
  }
  //return number os items stored in hash table
  return ++this.length;
};

const setTest = new HashTable();
setTest.set("hello", 5);
console.log(setTest);
setTest.set("Hello", 2);
console.log(setTest);
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
  //create a bucket to hold key through the hashcode
  const bucket = hashCode(key, this.SIZE);
  //go to the bucket and return the value corresponding to the key
  return this.storage[bucket][key];
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
  //create a bucket to hold key passed through the hashCode
  const bucket = hashCode(key, this.SIZE);
  //if the key doesn't exist in hashtable, return undefined
  if (this.storage[bucket][key] === undefined) {
    return undefined;
  } else {
    //go to the bucket and delete the key value property
    delete this.storage[bucket];
  }
  this.length--;
  return 
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

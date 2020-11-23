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
  //we need to call the function that hashes the key
  const encryptedKey = hashCode(key, this.storage.length);
  //if this encrypted key has not been used , add an object so we can deal with collisions
  if (!this.storage[encryptedKey]) {
    this.storage[encryptedKey] = {};
  }
  //add to current object in the encrypted key slot
  this.storage[encryptedKey][key] = value;
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
  const decrypt = hashCode(key, this.storage.length);
  //use decryption and key passed in to look up the value associated with arg
  const decyptedValue = this.storage[decrypt][key];
  //return the decryptedvalue
  return decyptedValue;
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
  const decrypt = hashCode(key, this.storage.length);
  //check if decrypted index has a value , if not -return undefined
  if (!this.storage[decrypt]) {
    return undefined;
  }
  //if length only has one key , we can delete the current index element of the has table includin object assigned
  console.log(Object.keys(this.storage[decrypt]).length);
  if (Object.keys(this.storage[decrypt]).length < 2) {
    delete this.storage[decrypt];
  } else {
    //if it has more than one key in current hash table index , delete specific key value pair
    delete this.storage[decrypt][key];
  }
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
// const newTable = new HashTable();
// newTable.set("name1", "dennis");
// newTable.set("name2", "Will");
// const extractValue = newTable.get("name2");
// newTable.remove("name1");
// console.log(newTable.storage);
// Do not remove!!
module.exports = HashTable;

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
  // Store our storage location in a variable by putting the output of hash function into a variable called storageLocation

  const storageLocation = hashCode(key, this.SIZE);

  // If nothing is stored at storageLocation, create a new object and to store the key value pair
  if (!this.storage[storageLocation][key]) {
    this.storage[storageLocation] = {};
    this.storage[storageLocation][key] = value;
  } else this.storage[storageLocation][key] = value; // Else, add the key value pair to the object.
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
  // Send key to hash function and store location in variable storageLocation
  const storageLocation = hashCode(key, this.SIZE);
  // If the key does not exist on the object stored at the hashed location, return false
  if (this.storage[storageLocation][key]) {
    return false;
  } else return this.storage[storageLocation][key]; // Else, return the value associated with the key.

  //   else if(this.storage[storageLocation].length === 1 && (this.storage[storageLocation][0][key])){
  //   return this.storage[storageLocation][0][key];
  // }
  //   this.storage[storageLocation]= [value];
  //  else if(this.storage[storageLocation].length > 1) {
  //   for( let i = 0; i< this.storage[storageLocation].length; i+=1){
  //     if (this.storage[storageLocation][i][key] )
  //   }

  //   this.storage[storageLocation].push({key:value});
  //  }
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
  // Send key to hash function and store location in variable storageLocation
  const storageLocation = hashCode(key, this.SIZE);
  // If the key does not exist on the object stored at the hashed location, return false
  if (this.storage[storageLocation][key]) {
    return false;
  } else delete this.storage[storageLocation][key]; // Else, return the value associated with the key.
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

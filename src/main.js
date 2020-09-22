/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */

// I AM SO LOST =(   I DID NOT GET TO HASH TABLES AT ALL, IT TOOK ME FOREVER TO GET LINKED LIST, I UNDERSTAND THE CONCEPT OF HOW THE STORAGE WORKS AND MAPS TO ARRAY THEN USES BUCKET OBJECTS W KEY-VALUES FOR COLLISIONS BUT NEED TO WATCH A LOT OF VIDEOS/READ DOCS =(   DON'T KNOW HOW TO CODE ANY OF THIS, I STARTED WITH THE LOOPING FOR CREATING HASH CODES THEN SAW THAT CODE IS ALREADY GIVEN... I NEED HELP PLEASE =(

function HashTable() {
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
  // hashInput: hashCode(string, size)
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
HashTable.set = function (key, value) {
  // let mySet = new Set();
  console.log("In set right now");
  let index = this._hash(key);
};

const myHash = new HashTable();

// console.log(myHash)

myHash.storage.push("hi");
console.log(myHash);
// myHash.storage[4] = "hello";
// console.log(myHash);
// console.log('hashCode returns: ', hashCode('hello', 5));

console.log("HashTable after set---> ", HashTable);
console.log("after set---> ", myHash);

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
HashTable.prototype.get = function (key) {};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {};

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

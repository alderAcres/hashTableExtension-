/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16;
  this.redirect = {};
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
  let hashVal = hashCode(key, this.SIZE);
  if (this.storage[hashVal]) {
    for (let slot = 1; slot < this.storage.length; slot++) {
      let newSlot = hashCode(key, slot);
      if (!this.storage[newSlot]) {
        this.storage[newSlot] = value;
        this.redirect[key] = newSlot;
      }
    }
  }
  this.storage[hashVal] = value;
  // this.SIZE//?
  // if(this.slots > this.SIZE / 2)
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
  let hashKey = hashCode(key, this.SIZE);
  if (this.redirect[key]) return this.storage[this.redirect[key]];
  return this.storage[hashKey];
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
  let deletedVal = this.storage[hashCode(key, this.SIZE)];
  this.storage[hashCode(key, this.SIZE)] = undefined;
  console.log(`Table lookup: { ${key}: ${deletedVal} }, has been deleted.`);
  return deletedVal;
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

let newTable = new HashTable();
newTable.set("frank", 1);
newTable.set("mike", 2);
newTable.set("eliott", 3);
newTable.set("melissa", 4);
newTable.set("ham", 5);
newTable.set("gerry", 6);
newTable.set("frank", 1);
newTable.set("mike", 2);
newTable.set("eliott", 3);
newTable.set("melissa", 4);
newTable.set("ham", 5);
newTable.set("gerry", 6);
newTable; //?
newTable.storage;
newTable.get("frank"); //?
newTable.remove("frank");
newTable.get("frank"); //? //?
// newTable.SIZE; //?
hashCode("franz", 16); //?
// Do not remove!!
module.exports = HashTable;

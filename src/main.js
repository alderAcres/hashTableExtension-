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
  this.itemsInStorage = 0;
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
  // give default storage of 16 "slots", make it so that
  // implementing set does the following:
  // creates an empty object within to store the new value at the generated index
  // if the object already existed from a previous set, simply put the new key-value pair in that 
  // initially generated obj
  // this handles collision
  // visual reference: // HashTable { SIZE: 16, storage: [ , , , , , , , , , , ,  , , , , ...]}

  // utilizing the params of "value" and "key", pass to hashCode function, referencing this.size
  const generatedIndex = hashCode(key, this.SIZE);
  // does it exist yet?
  if(!this.storage[generatedIndex]) {
    this.storage[generatedIndex] = {}; // if not, let's put a nifty, new nested object at this slot
    this.storage[generatedIndex][key] = value; // followed by creating a new key value pair located at this object
    this.itemsInStorage += 1;
  } else if (this.storage[generatedIndex][key]) {
    this.storage[generatedIndex][key] = value; // if it already existed, let's create a new key value pair at location
  } else {
    this.storage[generatedIndex][key] = value;
    this.itemsInStorage += 1;
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
  return this.storage[hashCode(key, this.SIZE)][key];
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
  this.itemsInStorage -= 1;
  if(!this.storage[hashCode(key, this.SIZE)][key]) {
    return undefined;
  }
  const itemToDelete = this.storage[hashCode(key, this.SIZE)][key];
  delete this.storage[hashCode(key, this.SIZE)][key];
  return itemToDelete;
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

let firstHashTable = new HashTable();
console.log(firstHashTable);
firstHashTable.set("lemon", 2);
console.log(firstHashTable);
firstHashTable.set("fork", 4);
console.log(firstHashTable);
firstHashTable.set("something", true);
console.log(firstHashTable);
firstHashTable.set("alligator", "orange");
console.log(firstHashTable);
console.log(firstHashTable.get("alligator"));
console.log(firstHashTable.remove("alligator"));
console.log(firstHashTable);
// HashTable { SIZE: 16, storage: [ , , , , , , , , , , ,  , , , , ...]}

// Do not remove!!
module.exports = HashTable;

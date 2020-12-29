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
  this.length = 0;
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
  const hashAddress = hashCode(key, this.SIZE);
  // console.log("Hash for ", key, " :", hashAddress);
  // If this address is empty
  if (!this.storage[hashAddress]) {
    this.storage[hashAddress] = {};
  }
  // If there is no existing value at the key
  if (!this.storage[hashAddress][key]) {
    this.length++;
  }
  this.storage[hashAddress][key] = value;
  return this.length;
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
  const hashAddress = hashCode(key, this.SIZE);
  // console.log("Hash for ", key, " : ", hashAddress);
  if (this.storage[hashAddress]) {
    return this.storage[hashAddress][key];
  }
  return undefined;
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
  const hashAddress = hashCode(key, this.SIZE);
  let removedItem;
  if (this.storage[hashAddress]) {
    removedItem = this.storage[hashAddress][key];
    delete this.storage[hashAddress][key];
    this.length--;
  }
  return removedItem;
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


// Test Cases
const testHT = new HashTable();
console.log("Initial HT: ----------");
console.log(testHT);
console.log(testHT.SIZE);
console.log(testHT.length);

console.log("Adding items to the HT: ----------");
testHT.set("a", 5);
testHT.set("b", 2);
testHT.set("c", 3);
testHT.set("d", 4);
testHT.set("aa", 11);
console.log(testHT);
console.log(testHT.SIZE);
console.log(testHT.length);

console.log("Resetting an existing item in the HT: ----------");
testHT.set("a", 1);
console.log(testHT);

console.log("Adding an item that causes collision in the HT: ----------");
testHT.set("A", 1);
console.log(testHT);
console.log(testHT.SIZE);
console.log(testHT.length);

console.log("Retriving items from the HT: ----------");
console.log(testHT.get("A"));
console.log(testHT.get("a"));
console.log(testHT.get("b"));
console.log(testHT.get("c"));
console.log(testHT.get("d"));
console.log(testHT.get("aa"));
console.log(testHT.get("z"));
console.log(testHT);

console.log("Removing items from the HT: ----------");
console.log(testHT.remove("d"));
console.log(testHT.remove("A"));
console.log(testHT.remove("z"));
console.log(testHT);

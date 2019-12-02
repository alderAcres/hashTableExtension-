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
  // turn our key into an address (array index) between 0 and this.SIZE using the hashCode function
  const address = hashCode(key, this.SIZE);
  // if there's already an object at this address
  if (this.storage[address]) {
    // if inputted key is the same as a key in the object, overwrite its corresponding value. Otherwise, add a new key and value pair
    this.storage[address][key] = value;
  } 
  // if there's nothing at the address yet, insert an object with the inputted key and value
  else {
    this.storage[address] = {[key]: value};
  }
};
// const hashTable = new HashTable();
// console.log(hashTable.storage[0]); // each array element should be 'undefined'
// console.log(hashTable);
// hashTable.set('first key', 'value 1');
// console.log(hashTable);
// hashTable.set('second key', 'value 2');
// console.log(hashTable);
// hashTable.set('first key', 'value 11111'); // successfully overwrites
// console.log(hashTable);
// hashTable.set('third key', 'value 3');
// console.log(hashTable);
// hashTable.set('fourth key', 'value 4');
// console.log(hashTable);
// hashTable.set('fifth key', 'value 5'); // Successfully handles collision of 'third key' and 'fifth key'.
// console.log(hashTable);
// hashTable.set('sixth key', 'value 6');
// console.log(hashTable);

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
  const address = hashCode(key, this.SIZE);
  if (this.storage[address] && this.storage[address].hasOwnProperty(key)) {
    return this.storage[address][key];
  }
  return undefined;
};
// const hashTable = new HashTable();
// hashTable.set('first key', 'value 1');
// hashTable.set('second key', 'value 2');
// hashTable.set('first key', 'value 11111');
// hashTable.set('third key', 'value 3');
// hashTable.set('fourth key', 'value 4');
// hashTable.set('fifth key', 'value 5');
// hashTable.set('sixth key', 'value 6');
// console.log(hashTable.get('first key')); // 'value 11111'. Successfully retrieves modified value
// console.log(typeof hashTable.get('second key')); // string
// console.log(hashTable.get('third key')); // 'value 3'. Successfully retrieves value from an object with more than 1 key
// console.log(hashTable.get('fifth key')); // 'value 5'. Successfully retrieves value from an object with more than 1 key
// console.log(hashTable.get('fourth key')); // 'value 4'
// console.log(hashTable.get('non-existing key')); // undefined. Successfully handles non-existing key
// console.log(hashTable.get('first key NOT')); // undefined

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const address = hashCode(key, this.SIZE);
  let valueRemoved;
  // if an address is not empty, and the key is found
  if (this.storage[address] && this.storage[address].hasOwnProperty(key)) {
    // save its corresponding value so we can return it later
    valueRemoved = this.storage[address][key];
    // delete the key and value pair from this address
    delete this.storage[address][key];
  }
  // return the value we removed, or undefined if the key does not exist in the hash table
  return valueRemoved;
};
// const hashTable = new HashTable();
// hashTable.set('first key', 'value 1');
// hashTable.set('second key', 'value 2');
// hashTable.set('first key', 'value 11111');
// hashTable.set('third key', 'value 3');
// hashTable.set('fourth key', 'value 4');
// hashTable.set('fifth key', 'value 5');
// hashTable.set('sixth key', 'value 6');
// console.log('returned value: ', hashTable.remove('first key')); // sucessfully removes 'first key' and returns its corresponding value 'value 11111'
// console.log(hashTable);
// hashTable.set('first key', 'I am back and renewed!'); // can still insert other key and value pairs
// console.log(hashTable);
// console.log('returned value: ', hashTable.remove('third key')); // sucessfully removes a key from an object with more than 1 key
// console.log(hashTable);
// console.log('returned value: ', hashTable.remove('fifth key')); // value 5
// console.log(hashTable);
// console.log('returned value: ', hashTable.remove('non-existing key')); // undefined
// console.log('returned value: ', hashTable.remove('first key NOT')); // undefined

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

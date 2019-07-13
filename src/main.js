/**
* HashTable constructor
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
  const address = hashCode(key, this.SIZE);
  if(!this.storage[address]) {
    this.storage[address] = {};
  }
  this.storage[address][key] = value;
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
  const address = hashCode(key, this.SIZE);
  if(!this.storage[address][key]) {
    return undefined;
  }
  delete this.storage[address][key];
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

// let table = new HashTable();
// table.set('value1', 1);
// table.set('value2', 2);
// table.set('value3', 3);
// table.set('value4', 4);
// table.set('value5', 5);
// table.set('value6', 6);
// table.set('value7', 7);
// table.set('value8', 8);
// table.set('value9', 9);
// table.set('value10', 10);
// table.set('value11', 11);
// table.set('value12', 12);
// table.set('value13', 13);
// table.set('value14', 14);
// table.set('value15', 15);
// table.set('value16', 16);
// table.set('value17', 17);
// table.set('value18', 18);
// table.set('value19', 19);
// table.set('value20', 20);
// console.log(table.get('value1'));
// console.log(table.get('value2'));
// console.log(table.get('value3'));
// console.log(table.get('value4'));
// console.log(table.get('value5'));
// console.log(table.get('value6'));
// console.log(table.get('value7'));
// console.log(table.get('value8'));
// console.log(table.get('value9'));
// console.log(table.get('value10'));
// console.log(table.get('value11'));
// console.log(table.get('value12'));
// console.log(table.get('value13'));
// console.log(table.get('value14'));
// console.log(table.get('value15'));
// console.log(table.get('value16'));
// console.log(table.get('value17'));
// console.log(table.get('value18'));
// console.log(table.get('value19'));
// console.log(table.get('value20'));

// console.log(table.storage)

// console.log(table.storage);
// table.remove('value1');
// console.log(table.remove('value1'));
// console.log(table.storage);
// console.log(table.get('value1'));
// table.remove('value2');
// console.log(table.storage);
// console.log(table.get('value2'));
// table.remove('value3');
// console.log(table.storage);
// console.log(table.get('value3'));
// // end tests

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16; // length

  this.storage = new Array(this.SIZE);
}
const newTable = new HashTable();
console.log(newTable);
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
  let i = hashCode(key, this.SIZE); // address

  /// if key hasn't been used to store another value
  if (this.storage[i] === undefined) {
    const obj = {};
    obj[key] = value;
    this.storage[i] = obj;
    let count = this.SIZE++;

    console.log('count: ', count);
    return count;
  }
  else {// overwrite previous value
    this.storage[i][key] = value;
  }

};

newTable.set('a', 0);
newTable.set('b', 1);
newTable.set('c', 2);
newTable.set('d', 3);
newTable.set('e', 4);
newTable.set('f', 5);
newTable.set('g', 6);
newTable.set('h', 7);
newTable.set('i', 8);
newTable.set('j', 9);
newTable.set('k', 10);
newTable.set('l', 11);
newTable.set('m', 12);
newTable.set('n', 13);
newTable.set('o', 14);
newTable.set('p', 15);
console.log('1. set: ', newTable);


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
  let address = hashCode(key, this.SIZE);
  return this.storage[address][key];
};
console.log(`prev value at 'p' is: 15 - `, newTable.get('p'));
newTable.set('p', 20);
console.log(`2. set - overwrite 'p'(15) to 20: `, newTable.get('p'))
console.log(`3. get: value at 'b' to equal 1: `, newTable.get('b')) // true

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  let address = hashCode(key, this.SIZE);
  if (this.storage[address][key] !== undefined) {
    deletedVal = this.storage[address][key];
    delete this.storage[address][key];
    this.SIZE--;
    return deletedVal;
  }
  if (!this.storage[address]) return undefined;
};
console.log('4. remove: expect removed value to be 2:', newTable.remove('c'));
console.log('5. remove nonexistent key = undefined: ', newTable.remove('z'));

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

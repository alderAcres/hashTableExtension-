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
  // use hashcode to get hashed address
  const location = hashCode(key, this.SIZE)
  // console.log(`address ${address}`);
  if (!this.storage[location]) {
    this.storage[location] = {[key]: value}
  } else {
    this.storage[location][key] = value;
  }
  return this.length++;
};
let ht = new HashTable()
ht.set('key', 'value')
ht.set('key0', 'value0')
ht.set('key1', 'value1')
console.log(ht);


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
  const location = hashCode(key, this.SIZE)
  if (this.storage[location] && this.storage[location][key]) {
    return this.storage[location][key];
  }
  return 'Key does not exist'
};
console.log('get');
console.log(ht.get('key'));
console.log(ht);


/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
  const location = hashCode(key, this.SIZE);
  if (this.storage[location] && this.storage[location][key]) {
    const value = this.storage[location][key]
    delete this.storage[location][key];
    this.length--;
    return value;
  }  
  return undefined; 
};
console.log(ht.remove('key'));
console.log(ht);

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

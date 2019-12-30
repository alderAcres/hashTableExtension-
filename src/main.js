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
  const position = hashCode(key, this.SIZE);
  const obj = {};
  obj[key] = value;
  if (this.storage[position] === undefined) {
    this.storage[position] = obj;
  } else {
    this.storage[position][key] = value;
  }
  return this.storage;
};

const table = new HashTable();
table.set('0', 'key is 0');
table.set('1', 'key is 1');
table.set('2', 'key is 2');
table.set('3', 'key is 3');
table.set('4', 'key is 4');
table.set('5', 'key is 5');
table.set('6', 'key is 6');
table.set('7', 'key is 7');
table.set('8', 'key is 8');
table.set('9', 'key is 9');
table.set('10', 'key is 10');
table.set('11', 'key is 11');
table.set('12', 'key is 12');
table.set('13', 'key is 13');
table.set('14', 'key is 14');
table.set('15', 'key is 15');
table.set('16', 'key is 16');
table.set('17', 'key is 17');
table.set('18', 'key is 18');

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
  const position = hashCode(key, this.SIZE);
  if (!this.storage[position])
    return "the key you've entered isn't in this hash table.";
  return this.storage[position][key];
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
  const position = hashCode(key, this.SIZE);
  if (this.storage[position] === undefined) return undefined;
  const toDelete = this.storage[position][key];
  delete this.storage[key];
  this.storage[key] = undefined;
  return toDelete;
};

console.log(table.remove('5'));
console.log(table.remove('14'));
console.log(table);

// Do not modify
function hashCode(string, size) {
  'use strict';

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

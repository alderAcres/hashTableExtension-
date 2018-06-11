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
HashTable.prototype.set = function (key, value) {
  let hash = hashCode(key, this.SIZE);
  if (!this.storage[hash]) {
    this.storage[hash] = {};
  }
  this.storage[hash][key] = value;
  return this.SIZE;
};

const hashTable = new HashTable();
console.log(hashTable.storage);
hashTable.set('name', 'brendan');
console.log(hashTable);
hashTable.set('name1', 'bren1');
console.log(hashTable.storage);

hashTable.set('name2', 'bren2');
hashTable.set('name3', 'bren3');
hashTable.set('name4', 'bren4');
hashTable.set('name5', 'bren5');
hashTable.set('name6', 'bren6');
hashTable.set('name7', 'bren7');
hashTable.set('name8', 'bren8');
hashTable.set('name9', 'bren9');
hashTable.set('name1', 'bren10');
hashTable.set('name11', 'bren11');
hashTable.set('name12', 'bren12');
hashTable.set('name13', 'bren13');
hashTable.set('name14', 'bren14');
hashTable.set('name15', 'bren15');
hashTable.set('name16', 'bren16');
hashTable.set('name17', 'bren17');

console.log(hashTable.storage);



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
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash][key];
};

console.log(hashTable.get('name4'));
console.log(hashTable.get('name'));

console.log(hashTable.get('not a real key'));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  const hash = hashCode(key, this.SIZE);
  const removedValue = this.storage[hash][key];
  delete this.storage[hash][key];
  if (!Object.keys(this.storage[hash]).length) {
    this.storage[hash] = undefined;
  }
  return removedValue;
};

console.log(hashTable.remove('i do not exist'));
console.log(hashTable.remove('name2'));
console.log(hashTable);
console.log(hashTable.storage[7]);

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

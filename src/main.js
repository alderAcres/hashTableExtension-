/* eslint-disable strict */
/* eslint-disable operator-assignment */
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
  this.itemsStored = 0;
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

HashTable.prototype.set = function set(key, value) {
  const hash = hashCode(key, this.SIZE);
  // console.log('key:', key, 'hash:', hash);

  // if no value in element yet
  if (!this.storage[hash]) {
    // put empty object into element
    this.storage[hash] = {};
    this.storage[hash][key] = value;
  } else {
    // overwrite or add key-value pair
    this.storage[hash][key] = value;
  }
  this.itemsStored++;

  return this.itemsStored;
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
HashTable.prototype.get = function get(key) {
  // get hash
  const hash = hashCode(key, this.SIZE);

  if (!this.storage[hash]) {
    console.log('nothing at key in hashtable');
    return;
  }

  return this.storage[hash][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function remove(key) {
  const hash = hashCode(key, this.SIZE);

  // if key doesn't exist, retrun undefined
  if (!this.storage[hash][key]) return undefined;

  if (Object.keys(this.storage[hash]).length === 1) {
    const temp = this.storage[hash][key];
    this.storage[hash] = undefined;
    return temp;

    // eslint-disable-next-line no-else-return
  } else {
    const temp = this.storage[hash][key];
    delete this.storage[hash][key];
    return temp;
  }
};


// // Do not modify
// function hashCode(string, size) {
//   // eslint-disable-next-line strict
//   // eslint-disable-next-line lines-around-directive
//   'use strict';

//   let hash = 0;
//   if (string.length === 0) return hash;

//   for (let i = 0; i < string.length; i++) {
//     const letter = string.charCodeAt(i);
//     // eslint-disable-next-line no-bitwise
//     hash = ((hash << 5) - hash) + letter;
//     // eslint-disable-next-line no-bitwise
//     hash = hash & hash; // Convert to 32bit integer
//   }

//   return Math.abs(hash) % size;
// }

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


// const table = new HashTable();
// table.set('key', 'valueA');
// table.set('key', 'valueB');
// table.set('key2', 'valueC');
// table.set('yek', 'valueD');
// console.log(table);
// console.log(table.get('key2'));
// console.log(table.remove('key'));
// console.log(table);

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
/* eslint-disable func-names, no-use-before-define */
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
  // generate a hash key
  const hashKey = hashCode(key, this.SIZE);

  // Set value in table
  // Check storage at hashKey for bin
  // if no bin, create an empty bin
  if (!this.storage[hashKey]) this.storage[hashKey] = {};

  // assign storage at hashKey, bin at key to value
  this.storage[hashKey][key] = value;
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
HashTable.prototype.get = function (key) {
  // generate the hashKey
  const hashKey = hashCode(key, this.SIZE);
  const bin = this.storage[hashKey];
  if (bin) {
    return bin[key];
  }
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  // generate the hashKey
  const hashKey = hashCode(key, this.SIZE);
  const bin = this.storage[hashKey];
  let removed;
  if (bin) {
    removed = bin[key];
    delete bin[key];
  }

  return removed;
};


// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// const table = new HashTable();
// console.log('\n||||||| set testing |||||||\n');
// table.set(0, 'value at key0');
// table.set('testKey', 'testValue');
// console.log('table after set', table);

// console.log('\n||||||| get testing |||||||\n');
// console.log('get test:', table.get(0));
// console.log('get key:', table.get('key'));


// console.log('\n||||||| remove testing |||||||\n');
// console.log('remove \'testKey\' from table:', table.remove(0));
// console.log('table after remove', table);
// console.log('try to remove a key that doesn\'t exist -> undefined', table.remove('i dont exist'));


// Do not remove!!
module.exports = HashTable;

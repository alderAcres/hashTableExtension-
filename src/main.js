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
  const newObj = {};
  newObj[key] = value;
  if (this.storage[hashCode(key, this.SIZE)]) {
    this.storage[hashCode(key, this.SIZE)][key] = value;
  } else {
    this.storage[hashCode(key, this.SIZE)] = newObj;
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
  if (
    !this.storage[hashCode(key, this.SIZE)] ||
    !this.storage[hashCode(key, this.SIZE)][key]
  ) {
    return undefined;
  } else {
    return this.storage[hashCode(key, this.SIZE)][key];
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
HashTable.prototype.remove = function(key) {
  delete this.storage[hashCode(key, this.SIZE)][key];
};

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

//TESTS

//Create new hash table for tests
const testHashTable = new HashTable();

//========TESTS FOR SET=======
///set - Adds given value to the hash table with specified key.

//TEST 1 -  If the provided key has already been used to store another value, simply overwrite the existing value with the new value.

testHashTable.set('key 1', 'value 1');
testHashTable.set('key 1', 'value 2');
console.log('');
console.log(
  '*** TEST 1 - if the provided key has been used to store a value, the value will be overwritten with the new value ***'
);
console.log('');
console.log(
  '*** Expect key 1 value to === value 2 and test to return true ***'
);
console.log('');
console.log('key 1 value: ', testHashTable.get('key 1'), ' ==> value 2');
console.log('');
console.log(
  'test should pass and equal true: ',
  testHashTable.get('key 1') === 'value 2',
  ' ==> true'
);
console.log('');

// - If the hashed address already contains another key/value pair, you must handle the collision appropriately.

//set key value pairs using a loop so there will be collisions with entries
for (let i = 0; i < 20; i++) {
  testHashTable.set(`key ${i}`, `value ${i}`);
}

console.log('');
console.log(
  '*** TEST 2 - if hashed address contains another key/value collision is handled appropriately***'
);
console.log('');
console.log(
  '*** Expect hashtable to contain entries with multiple key value pairs ***'
);
console.log('');
console.log(testHashTable);
console.log('');

/*
 * get - Retrieves a value stored in the hash table with a specified key
 *
 * - If more than one value is stored at the key's hashed address, then you must retrieve
 *   the correct value that was originally stored with the provided key
 *
 */

console.log('');
console.log(
  "*** TEST 3 - Retrieves a value stored in the hash table with a specified key. If more than one value is stored at the key's hashed address, then you must retrieve the correct value that was originally stored with the provided key ***"
);
console.log('');
console.log('*** Expect key 1 to equal value 1***');
console.log('');
console.log('key 1 value: ', testHashTable.get('key 1'), ' ==> value 1');
console.log('');
console.log(
  'test should pass and equal true: ',
  testHashTable.get('key 1') === 'value 1',
  ' ==> true'
);
console.log('');

/*
testHashTable.get('key 1');
console.log('testHashTable get key 1', testHashTable.get('key 1'));

console.log('testHashTable get key 5', testHashTable.get('key 5'));

testHashTable.remove('key 1');
console.log('testHashTable get key 1', testHashTable.get('key 1'));
console.log('test hash table==', testHashTable);
testHashTable.set('key 1', 'value 1');
console.log('test hash table after set==', testHashTable);
testHashTable.set('key 1', 'value 2');
console.log('test hash table after set==', testHashTable);

*/

/* remove - delete a key/value pair from the hash table

  - If the key does not exist in the hash table, return undefined

 */
/*

*/

// Do not remove!!
module.exports = HashTable;

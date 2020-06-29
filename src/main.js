/* eslint-disable no-bitwise */
/* eslint-disable func-names */
/* eslint-disable no-prototype-builtins */

/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.LENGTH = 16;
  this.size = 0;

  // https://stackoverflow.com/questions/25512771/what-is-array-apply-actually-doing
  // eslint-disable-next-line prefer-spread
  this.storage = Array.apply(null, Array(this.LENGTH)).map(() => {
    return {};
  });
}

// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i += 1) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

/** √ PASSING
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
  // Get hash value of key to determine bucket
  const hashVal = hashCode(key, this.LENGTH);
  // increment qty IFF key does not already exist in that bucket (handle overwrites)
  if (!this.storage[hashVal].hasOwnProperty(key)) {
    this.size += 1;
  }
  // Hash key > set obj @ hashVal index to [key] = value (auto overwrite)
  this.storage[hashVal][key] = value;
  // Return number of items in table
  return this.size;
};

/** √ PASSING
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
  // Hash key for index
  const hashVal = hashCode(key, this.LENGTH);
  // Return value @ object[key] (will be undefined if never set)
  return this.storage[hashVal][key];
};

/** √ PASSING
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  // Hash key for index
  const hashVal = hashCode(key, this.LENGTH);
  // Decrement size if property exists
  if (this.storage[hashVal].hasOwnProperty(key)) {
    this.size -= 1;
  }
  // Retrieve value at index[key] (will be undefined if does not exist)
  const deletedVal = this.storage[hashVal][key];
  // <delete> property from index object
  delete this.storage[hashVal][key];
  // Return retrieved value (or undefined)
  return deletedVal;
};

// TESTING

// const test = new HashTable();
// test.set('banana', 1);
// test.set('apple', 3);
// console.log(test.set('banana', 5)); // => 2 [returning new size with overwrite]
// console.log(test.get('banana')); // => 5 [updated 'banana' value]
// console.log(test.get('apple')); // => 3
// console.log(test.get('pear')); // => undefined [implicit behavior]
// console.log(test.remove('apple')); // => 3 [last value of apple]
// test.set('apricot', 7);
// console.log(test.size); // => 2 [currently stored keys: 'banana' + 'apricot']
// console.log(test.remove('pear')); // => undefined [key never set]
// console.log(test.storage); // array of sixteen object with two indicies populated
// [{}, ..., {banana: 5}, {apricot: 7}]

/* SPEC SHEET
 * Instantiate HashTable as array of fixed size on <storage> property
 * Must track number of values in table
 * Store values, retrieve via separate keys (requires hashing key)
 * Duplicate keys overwrite values
 * Colliding hash of different keys must be preserve both values
 * When deleting values, delete key/value pair & return value (or undefined if no matching key)
 */

/* APPROACH
 * Store size in additional HashTable property, incrementing and decrementing with set/get
 * Store all key/value pairs on objects at each bucket (index)
 */

// Do not remove!!
module.exports = HashTable;

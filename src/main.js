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
  // first we need to convert the key to an integer using our hashCode function
  const hashed = hashCode(key, this.SIZE);
  // next check if hash table is empty, if so, we will set the first value to an empty object and then fill that object
  if (this.storage[hashed] === undefined) {
    this.storage[hashed] = {};
    this.storage[hashed][key] = value;
    // else just overwrite existing value with the new key/value pair
  }
  this.storage[hashed][key] = value;
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
  // first convert key to an integer using our hashCode function
  const hashed = hashCode(key, this.SIZE);
  // return the value at that new hashed key
  return this.storage[hashed][key];
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
  // convert key to an integer using hashCode function
  const hashed = hashCode(key, this.SIZE);
  // create a copy of value to delete
  const copy = this.storage[hashed][key];
  // delete that specific value
  delete this.storage[hashed][key];
  // return
  return copy;
};

const test = new HashTable();
test.set(654, 'apple');
test.set(333, 'banana');
console.log(test.get(333));
test.remove(654);
console.log(test);

// Do not modify
function hashCode(string, size) {
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

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
  const index = hashCode(key, this.SIZE);
  // helper function to calculate number of items in the hash table
  const length = () =>
    this.storage.reduce((total, el) => (el ? el.length + total : total), 0);

  const newItem = { [key]: value };
  // if there is no array at the index, create one with the newItem as it's only element
  if (!this.storage[index]) {
    this.storage[index] = [newItem];
    return length();
  }

  const existingIndex = this.storage[index].findIndex((el) => el[key]);
  if (existingIndex > -1) {
    this.storage[index][existingIndex][key] = value;
  } else {
    this.storage[index].push({ [key]: value });
  }
  return length();
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
  const index = hashCode(key, this.SIZE);
  const bucket = this.storage[index] ? this.storage[index] : [];
  const wrapper = bucket.find((el) => el[key] !== undefined);
  return wrapper ? wrapper[key] : undefined;
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
  const index = hashCode(key, this.SIZE);
  const bucket = this.storage[index] ? this.storage[index] : [];

  // wrapper is the object that wraps the value --> {key: value}
  const wrapperIndex = bucket.findIndex((el) => el[key] !== undefined);
  const wrapper = wrapperIndex > -1 ? bucket[wrapperIndex] : undefined;
  if (wrapper) {
    const value = wrapper[key];
    bucket.splice(wrapperIndex, 1);
    return value;
  }

  return undefined;
};

// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

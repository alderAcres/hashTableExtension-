/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW

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

  // helper to check if we need to rehash after setting
  const needsRehash = () => ~~((this.currentLength() / this.SIZE) * 100) > 75;

  const newItem = { [key]: value };
  // if there is no array at the index, create one with the newItem as it's only element
  if (!this.storage[index]) {
    this.storage[index] = [newItem];
    if (needsRehash()) {
      this.rehash(this.SIZE * 2);
    }
    return this.currentLength();
  }

  const existingIndex = this.storage[index].findIndex((el) => el[key]);
  if (existingIndex > -1) {
    this.storage[index][existingIndex][key] = value;
  } else {
    this.storage[index].push({ [key]: value });
  }

  if (needsRehash()) {
    this.rehash(this.SIZE * 2);
  }
  return this.currentLength();
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

  // check if we need to rehash
  if (this.SIZE > 16 && ~~((this.currentLength() / this.SIZE) * 100) < 25) {
    this.rehash(this.SIZE / 2);
  }

  return undefined;
};

HashTable.prototype.currentLength = function () {
  // helper function to calculate number of items in the hash table
  return this.storage.reduce(
    (total, el) => (el ? el.length + total : total),
    0
  );
};

/**
 * rehash - "rehashes" the storage by increasing the size
 *
 * @param {number} newSize - the new size of the hash table
 */
HashTable.prototype.rehash = function (newSize) {
  const newStorage = new Array(newSize);
  this.storage.flat().forEach((wrapper) => {
    if (!wrapper) return;

    const key = Object.keys(wrapper)[0];
    const value = wrapper[key];
    this.set.apply(
      {
        SIZE: newSize,
        storage: newStorage,
        currentLength: this.currentLength,
      },
      [key, value]
    );
  });

  this.storage = newStorage;
  this.SIZE = newSize;
};

// YOUR CODE ABOVE

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

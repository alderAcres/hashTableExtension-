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
HashTable.prototype.set = function set(key, value) {
  // Get capacity.
  const count = this.capacity();

  if ((count + 1) / this.SIZE >= 0.75) {
    this.resize(x => x * 2);
  }

  // Use array instead of linked list to handle collisions.
  // Store key along with value to find values in same bucket.

  if (this.storage[hashCode(key, this.SIZE)] === undefined) {
    // Create new array if no value exists in bucket yet.
    this.storage[hashCode(key, this.SIZE)] = [{ key, value }];
  } else {
    this.storage[hashCode(key, this.SIZE)].push({ key, value });
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
HashTable.prototype.get = function get(key) {
  const bucket = this.storage[hashCode(key, this.SIZE)];

  // If value for key does not exist, assume we should return -1.
  if ((bucket === undefined)) {
    return -1;
  } if ((bucket.length === 1)) { // If there is only one value in the bucket, return it.
    return bucket[0].value;
  }

  // Traverse array to find value associated with key.
  for (let i = 0; i < bucket.length; i += 1) {
    if (bucket[i].key === key) {
      return bucket[i].value;
    }
  }

  // Return -1 one if key was not found.
  return -1;
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
  const bucket = this.storage[hashCode(key, this.SIZE)];

  // If value for key does not exist, assume we should return -1.
  if ((bucket === undefined)) {
    return -1;
  } if ((bucket.length === 1)) { // Set bucket to undefined.
    const retVal = bucket[0].key;
    this.storage[hashCode(key, this.SIZE)] = undefined;

    // Get capacity.
    const count = this.capacity();

    if ((count + 1) / this.SIZE <= 0.25) {
      this.resize(x => x / 2);
    }

    return retVal;
  }

  // Traverse array to find value associated with key.
  for (let i = 0; i < bucket.length; i += 1) {
    if (bucket[i].key === key) {
      const retVal = bucket[i].key;
      this.storage = bucket.slice(0, i).concat(bucket.slice(i + 1, bucket.length));

      // Get capacity.
      // Redundant code, refactor if time allows.
      const count = this.capacity();

      if ((count + 1) / this.SIZE <= 0.25) {
        this.resize(x => x / 2);
      }

      return retVal;
    }
  }

  // Return -1 one if key was not found.
  return -1;
};

// Resize based on elements not buckets as test in original unit does.
HashTable.prototype.resize = function resize(func) {
  this.SIZE = func(this.SIZE);
  const newStorage = [];

  // Rehash elements into new storage.
  this.storage.forEach((el) => {
    if (el !== undefined) {
      newStorage[hashCode(el[0].key, this.SIZE)] = el;
    }
  });

  this.storage = newStorage;
};

HashTable.prototype.capacity = function capacity() {
  return this.storage.reduce((acc, el) => {
    if (el !== undefined) {
      return acc + el.length;
    }

    return acc;
  }, 0);
};
// YOUR CODE ABOVE

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

// Do not remove!!
module.exports = HashTable;

// const ht = new HashTable();
// ht.set('0', '0');
// ht.set('1', '1');
// ht.set('2', '2');
// ht.set('3', '3');
// ht.set('4', '4');
// ht.set('5', '5');
// ht.set('6', '6');
// ht.set('7', '7');
// ht.set('8', '8');
// ht.set('9', '9');
// ht.set('10', '10');
// ht.set('11', '11');
// console.log(ht);
// // console.log(JSON.stringify(ht));
// ht.set('12', '12');
// ht.set('13', '13');
// console.log(ht);
// // console.log(JSON.stringify(ht));

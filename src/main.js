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
//


// get(key) {
//   const pos = this.hash(key);
//   let index = 0;
//   while (this.table[pos][index] != key) {
//     if(this.table[pos][index] !== undefined) {
//       return this.table[pos][index]
//     } else {
//       return undefined;
//     }
//     index++;
//   }
// }

HashTable.prototype.set = function (key, value) {
  const index = hashCode(key, this.SIZE);
  console.log(index);
  if (this.storage[index] === undefined) {
    this.storage[index] = [[key, value]];
  }
  for (let i = 0; i < this.storage.length; i += 1) {
    let inserted = false;
    if (this.storage[index][i][0] === key) {
      this.storage[index][i][1] = value;
      inserted = true;
    }
    if (inserted === true) {
      this.storage[index].push([key, value]);
    }
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
HashTable.prototype.get = function (key) {
  // initialize variable for hashCode(key) and also an index variable to increment
  const key1 = hashCode(key, this.SIZE);
  let index = 0;
  // while the value associated with the corresponding key (key1) does not equal our key argument value and is not undefined
  // return the value at that position
  while (this.storage[key1][index] !== key) {
    if (this.storage[key1][index] !== undefined) {
      return this.storage[key1][index];
    }
    return undefined;
    index += 1;
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
  const key1 = hashCode(key, this.SIZE);
  const index = 0;
  let cache;
  // if position of key1 associated with key value exists, cache the value at index 1 (the val), delete this.storage at key1, then return the cash
  if (this.storage[key1][index] !== undefined) {
    cache = this.storage[key1][index][1];
    delete this.storage[key1];
    return cache;
  }
  // else return undefined;
  return undefined;
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


const hoidy = new HashTable();
hoidy.set('wassup', 15);
console.log(hoidy);

// Do not remove!!
module.exports = HashTable;

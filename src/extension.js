/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:


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
/* eslint-disable func-names, no-use-before-define */
function HashTable() {
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
}


// TODO 1. set:
// TODO - If adding the new item will push the number of stored items to over 75 % of
// TODO the hash table's SIZE, then double the hash table's SIZE and rehash everything


HashTable.prototype.set = function (key, value) {
  // Check length of this.storage
  //    if (this.storage + 1) / (this.SIZE) > 0.75 extend the table
  //    grab the old storage and hold
  //    reassign this.storage to an empty object
  //    double this.SIZE
  //    loop over keys in old storage and set them into this.storage
  const hashKeys = Object.keys(this.storage);
  console.log({ hashKeys });

  // ! Not hitting this conditional to resize an remap storage
  if (((hashKeys.length + 1) / this.SIZE) >= 0.75) {
    console.log('------------- EXTENDING -------------');

    const oldStore = this.storage;
    this.storage = {};
    this.SIZE = this.SIZE * 2;
    hashKeys.forEach((hk) => {
      const bin = oldStore[hk];
      const keys = Object.keys(bin);
      keys.forEach((key) => {
        this.set(key);
      });
    });
  }

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


const table = new HashTable();
console.log('\n||||||| set testing |||||||\n');
for (let i = 0; i < 16; i += 1) {
  table.set(i, i);
}
console.log('table size after many sets', table.SIZE);
console.log('table storage after many sets', table.storage);


// console.log('\n||||||| get testing |||||||\n');
// console.log('get test:', table.get(0));
// console.log('get key:', table.get('key'));


// console.log('\n||||||| remove testing |||||||\n');
// console.log('remove \'testKey\' from table:', table.remove(0));
// console.log('table after remove', table);
// console.log('try to remove a key that doesn\'t exist -> undefined', table.remove('i dont exist'));


// Do not remove!!
module.exports = HashTable;


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

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

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.resizeMax = this.SIZE * 0.75;
  this.numItems = 0;
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
  const hash = hashCode(String(key), this.SIZE);
  if (!this.storage[hash]) {
    this.storage[hash] = {};
    this.numItems++;
  }
  this.storage[hash][key] = value;

  let loadFactor = this.numItems / this.SIZE;
  console.log(loadFactor);
  console.log(this.resizeMax / this.SIZE);
  console.log(loadFactor >= this.resizeMax / this.SIZE);
  if (loadFactor >= this.resizeMax / this.SIZE) {
    this.resize(this.SIZE * 2);
  }

  return this.storage;
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
  const hash = hashCode(String(key), this.SIZE);
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
HashTable.prototype.remove = function (key) {
  const hash = hashCode(String(key), this.SIZE);
  // throw new error if we're trying to remove something that doesn't exist
  if (this.storage[hash] === undefined) {
    throw new Error("this key does not exist");
    return;
  }
  const remove = this.storage[hash][key];
  delete this.storage[hash][key];
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  // only want to delete the whole object if object is empty
  if (isEmpty(this.storage[hash])) {
    delete this.storage[hash];
    this.numItems--;
  }
  return remove;
};

HashTable.prototype.resize = function (newLimit) {
  // Set old storage to contents of previous storage
  let oldStorage = this.storage;
  // Update new size of new storage
  this.SIZE = newLimit;
  // Empty out current storage
  this.storage = new Array(this.SIZE);

  // Go through each bucket in the storage
  this.storage = oldStorage.reduce((acc, cur, i) => {
    let key = Object.keys(oldStorage[i]);
    let newHashKey = hashCode(key[0], this.SIZE);
    acc[newHashKey] = cur;
    return acc;
  }, []);
  this.resizeMax = this.SIZE * 0.75;
  return this.storage;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  "use strict";

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

// get up to 12 different
console.log(hashCode("one", 16));
console.log(hashCode("two", 16));
console.log(hashCode("three", 16));
console.log(hashCode("five", 16));
console.log(hashCode("seven", 16));
console.log(hashCode("eight", 16));
console.log(hashCode("twelve", 16));
console.log(hashCode("fourteen", 16));
console.log(hashCode("fifteen", 16));
console.log(hashCode("seventeen", 16));
console.log(hashCode("twentyone", 16));
console.log(hashCode("twentytwo", 16));

let myHashTable = new HashTable();
console.log(myHashTable); // HashTable { SIZE: 16, storage: [ , , , , , , , , , , , , , , ,  ] }
console.log(myHashTable.set("one", 2)); // [ , , , , , , { one: 1 }, , , , , , , , ,  ]
console.log(myHashTable.set("one", 1)); // [ , , , , , , { one: 2 }, , , , , , , , ,  ]
console.log(myHashTable.set("three", 3)); // [, , , , , , { one: 2 }, , , , , , { two: 2 }, , { three: 3 },]
console.log(myHashTable.set("two", 2)); // HashTable { SIZE: 16, storage: [ , , , , , , , , , , , , , , ,  ] }
console.log(myHashTable.set("five", 5)); // [ , , { five: 5 }, , , , { one: 2 }, , , , , , { two: 2 }, , { three: 3 },  ]
console.log(myHashTable.set("qw", "collision with one"));
console.log(myHashTable.numItems); // 4 since collisions go into same bucket
console.log(myHashTable.get("qw")); // "collision with one"
console.log(myHashTable.get("one")); // 1
console.log(myHashTable.get("five")); // 1
console.log(myHashTable.remove("five")); // 5
console.log(
  myHashTable
); /* HashTable { SIZE: 16,
storage:
[,
  ,
  ,
  ,
  ,
  ,
  { one: 1, qw: 'collision with one' },
  ,
  ,
  ,
  ,
  ,
  { two: 2 },
  ,
  { three: 3 },
  ],
  resizeMax: 12,
  numItems: 3 }
  */
console.log(myHashTable.remove("qw")); // "collision with one" 'collision with one'
console.log(myHashTable); // HashTable { SIZE: 16, storage: [, , {}, , , , { one: 1 }, , , , , , { two: 2 }, , { three: 3 },] }
console.log(myHashTable.SIZE); // 16
console.log(myHashTable.numItems); // 3

console.log(myHashTable.set("five", 5));
console.log(myHashTable.set("seven", 7));
console.log(myHashTable.set("eight", 8));
console.log(myHashTable.set("twelve", 12));
console.log(myHashTable.set("fourteen", 14));
console.log(myHashTable.set("fifteen", 15));
console.log(myHashTable.set("seventeen", 17));
console.log(myHashTable.set("twentyone", 21));
console.log(myHashTable);
console.log(myHashTable.set("twentytwo", 22));
console.log(myHashTable.numItems);
console.log(myHashTable);

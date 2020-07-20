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
  const hash = hashCode(String(key), this.SIZE);
  if (!this.storage[hash]) {
    this.storage[hash] = {};
  }
  this.storage[hash][key] = value;
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
  if (isEmpty(this.storage[hash])) delete this.storage[hash];
  return remove;
};

// Do not modify
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

console.log(hashCode("qw", 16));

let myHashTable = new HashTable();
console.log(myHashTable); // HashTable { SIZE: 16, storage: [ , , , , , , , , , , , , , , ,  ] }
console.log(myHashTable.set("one", 2)); // [ , , , , , , { one: 1 }, , , , , , , , ,  ]
console.log(myHashTable.set("one", 1)); // [ , , , , , , { one: 2 }, , , , , , , , ,  ]
console.log(myHashTable.set("three", 3)); // [, , , , , , { one: 2 }, , , , , , { two: 2 }, , { three: 3 },]
console.log(myHashTable.set("two", 2)); // HashTable { SIZE: 16, storage: [ , , , , , , , , , , , , , , ,  ] }
console.log(myHashTable.set("five", 5)); // [ , , { five: 5 }, , , , { one: 2 }, , , , , , { two: 2 }, , { three: 3 },  ]
console.log(myHashTable.set("qw", "collision with one"));
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
  {},
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
  ] }
  */
console.log(myHashTable.remove("qw")); // 'collision with one'
console.log(myHashTable); // HashTable { SIZE: 16, storage: [, , {}, , , , { one: 1 }, , , , , , { two: 2 }, , { three: 3 },] }
console.log(myHashTable.set("four", 4)); // [ , , , , , , { one: 1 }, , , , , , , , ,  ]
console.log(myHashTable.SIZE);

// Do not remove!!
module.exports = HashTable;

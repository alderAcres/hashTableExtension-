/**
 * /*
 *   Complete this extension only AFTER getting the functionality in main.js working!
 *   Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
 *   Modify the code to reflect to following:
 *
 *   1. set:
 *       - If adding the new item will push the number of stored items to over 75% of
 *         the hash table's SIZE, then double the hash table's SIZE and rehash everything
 *
 *   2. remove:
 *       - If the hash table's SIZE is greater than 16 and the result of removing the
 *         item drops the number of stored items to be less than 25% of the hash table's SIZE
 *         (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
 *
 * @format
 */

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.SIZE = 16;
  this.count = 0;
  this.storage = new Array(this.SIZE);
}
HashTable.prototype.set = function (key, value, table = this.storage) {
  //increment count
  this.count++;
  //find hash
  const hash = hashCode(key, this.SIZE);

  //check if object already exists - if not create one
  //store key value pair in object located at hash
  if (table[hash] !== undefined) {
    table[hash][key] = value;
  } else {
    const obj = {};
    obj[key] = value;
    table[hash] = obj;
  }

  //check if current storage is above 75%
  if (this.SIZE * 0.75 < this.count) {
    this.SIZE = this.SIZE * 2;
    this.rehash();
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
HashTable.prototype.get = function (key, cb = (obj, k) => obj[k]) {
  //find hash
  const hash = hashCode(key, this.SIZE);
  //create a temp variable to refer to object sotred at hash location
  const obj = this.storage[hash];
  //if nothing is at the location then return undefined
  if (obj === undefined) return;
  //otherwise run callback funciton - default call back is to simply return the value
  return cb(obj, key);
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
  //find hash
  const hash = hashCode(key, this.SIZE);

  //create callback function to delete the stored key value pair fromt he object and return the value
  const cb = function (obj, k) {
    //delete and return
    const temp = obj[k];
    delete obj[key];

    return temp;
  };

  //use get logic to find and remove key value pair

  const temp = this.get(key, cb);
  if (temp !== undefined) {
    //decrement size
    this.count--;
    //check if storage size should be decreased
    if (this.SIZE > 16 && Math.floor(this.SIZE * 0.25) >= this.count) {
      this.SIZE /= 2;
      this.rehash();
    }
  }
  return temp;
};

HashTable.prototype.rehash = function () {
  //create a temporary storage hash
  const temp = new Array(this.SIZE);
  //reset count to 0
  this.count = 0;
  //loop through current storage and rehash all key value pairs and store in temp
  this.storage.forEach((obj) => {
    for (let k in obj) {
      this.set(k, obj[k], temp);
    }
  });

  //replace this.storage with temp
  console.log("Rehash");
  this.storage = temp;
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

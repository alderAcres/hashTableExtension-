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
  this.currentSize = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  let hashKey = hashCode(key, this.SIZE);

  //store maxSize
  const maxSize = this.SIZE * 0.75;

  console.log(typeof this.storage);

  // if table size should be increased
  if (this.currentSize === maxSize - 1) {
    //double size
    this.SIZE = this.SIZE * 2;

    //create copy of storage
    const storage = this.storage;

    //create new table
    this.storage = new Array(this.SIZE);

    //iterate over storage updating storage before rehashing
    storage.forEach((obj) => {
      for (let key in obj) {
        // create new hash keys
        let hashKey = hashCode(key, this.SIZE);

        // if hashKey doesn't exist yet
        if (!this.storage[hashKey]) {
          let tempObj = {};
          // create new key/value pair
          tempObj[key] = value;
          // assign to hashKey location
          this.storage[hashKey] = tempObj;
        } else {
          // copy existing key/value pair to new hashKey
          this.storage[hashKey][key] = obj[key];
          //increment size
          this.currentSize++;
        }
      }
      //ran out of time
    });
    //increment
    this.currentSize++;

    //return num of items stored
    return this.currentSize;
  }

  // if storage at key is undefined update the storage
  if (!this.storage[hashKey]) {
    const tempObj = {};
    tempObj[key] = value;

    //re-assign storage at hash key
    this.storage[hashKey] = tempObj;
  } else {
    //if provided key has already been used to store another value, overwrite the existing with new
    this.storage[hashKey][key] = value;
  }

  // increment the number of items stored
  this.currentSize++;

  // return new number of items store in hash table
  return this.currentSize;
};

HashTable.prototype.get = function (key) {
  if (typeof key !== "string") return console.error(`Invalid Type: typeof key: ${key} should be string`);

  // get the hash key
  let hashKey = hashCode(key, this.SIZE);

  return this.storage[hashKey] ? this.storage[hashKey][key] : undefined;
};

HashTable.prototype.remove = function (key) {
  let hashKey = hashCode(key, this.SIZE);

  if (!this.storage[hashKey][key]) return undefined;

  const deletedVAlue = this.storage[hashKey][key];

  delete this.storage[hashKey][key];

  this.currentSize--;

  return deletedVAlue;
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

const myTable = new HashTable();

// testing
myTable.set("name", "James");
myTable.get("name");
myTable.remove("name");

// Do not remove!!
module.exports = HashTable;

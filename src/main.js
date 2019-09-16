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
  const code = hashCode(key, this.SIZE);


  if (!this.storage[code]) {
    //if bucket is empty,
    //create an object at that bucket in the hashTable
    this.storage[code] = {};
    // store key/value pair at that bucket
    this.storage[code][key] = value;
  } else {
    //if bucket already contains an object,
    //store or overwrite key/value pair at that bucket
    this.storage[code][key] = value;
  }
  //set should not return anything
};

// const myTable = new HashTable;
// console.log(myTable);
// console.log(myTable.set("chris", "flannery"));
// console.log(myTable);
// console.log(myTable.set("shric", "wills"));
// console.log(myTable);

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
  const code = hashCode(key, this.SIZE);


  if (!this.storage[code]) {
    //if there is nothing stored in bucket at code
    console.log("Hmm, it looks like there's nothing here to get!");
  } else if (!this.storage[code][key]) {
    //if there is an object stored in bucket at code
    //...but the key you are looking for is not inside
    console.log("There is something stored here, but it's not what you are looking for!")
  } else {
    //if there is an object stored in bucket at code
    ///...and the key you are looking for is inside, return it
    return this.storage[code][key];
  }
};

// const myTable = new HashTable;
// console.log(myTable);
// console.log(myTable.set("chris", "flannery"));
// console.log(myTable);
// console.log(myTable.set("shric", "wills"));
// console.log(myTable);
// console.log(myTable.get("chris"));
// console.log(myTable.get("hrsic"));
// console.log(myTable.get("beans"));

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  const code = hashCode(key, this.SIZE);

  if (!this.storage[code]) {
    //if there is nothing stored in bucket at code
    console.log("Hmm... it looks like this bucket is already empty!");
  } else if (!this.storage[code][key]) {
    //if there is an object stored in bucket at code
    //...but the key you are looking for is not inside
    console.log("Hmmm... looks like the key/value pair you are trying to remove is not present here.")
  } else {
    //if there is an object stored in bucket at code
    //...and the key you are looking for is inside, remove it
    delete this.storage[code][key];
  }
};

// const myTable = new HashTable;
// console.log(myTable);
// console.log(myTable.set("chris", "flannery"));
// console.log(myTable);
// console.log(myTable.set("shric", "wills"));
// console.log(myTable);
// myTable.remove("chris");
// console.log(myTable);
// myTable.remove("chris");
// myTable.remove("beans");


// Do not modify
function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

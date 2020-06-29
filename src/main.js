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

const hash = new HashTable();
console.log(hash);

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
  //run hash funciton on key
  let hashedKey = hashCode(key, 16);
  //create empty obejct to be used for collisions
  let number = 0;
  let obj = {};
  obj[key] = value;
  //check for objects at hashed key location
  if (typeof this.storage[hashedKey] === "object") {
    //get data from location in hash table
    let current = this.storage[hashedKey];
    //create an empty array at hash location
    this.storage[hashedKey] = [];
    //push current and new object to hash location
    this.storage[hashedKey].push(obj);
    this.storage[hashedKey].push(current);
    number = this.storage[hashedKey].length;
  } else {
    //insert value at hashed key location
    this.storage[hashedKey] = obj;
    number = 1;
  }
  return number;
};

//tests
hash.set("hi", { keytest: "valuetest" });
hash.set("hj", "second test");
hash.set("hk", "third test");
//log
console.log(hash);

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
  //convert key to hashcode
  let hashedKey = hashCode(key, 16);

  //check to see if location in hashtable is an array of objects
  if (Array.isArray(this.storage[hashedKey])) {
    //loop over objects stored in hash table location
    for (let element of this.storage[hashedKey]) {
      //get key from object
      let objKey = Object.keys(this.storage[hashedKey]);
      //compare object key to parameter key
      if (key === objKey) {
        // if there's a match return value from object key
        return element[objKey];
      }
    }
    return "No Value at Key Location";
  } else {
    //insert value at hashed key location
    return this.storage[hashedKey];
  }
};

//log
console.log(hash.get("hi"));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  //convert key to hashkey
  let hashedKey = hashCode(key, 16);

  //check to see if location in hashtable is an array of objects
  if (Array.isArray(this.storage[hashedKey])) {
    //loop over objects stored in hash table location
    for (let element of this.storage[hashedKey]) {
      //get key from object
      let objKey = Object.keys(this.storage[hashedKey]);
      //compare object key to parameter key
      if (key === objKey) {
        // if there's a match delete key value pair from hash location
        delete element;
      }
    }
    return "No Value at Key Location";
    //check to see if singular value exists at hashed key location
  } else if (this.storage[hashedKey]) {
    //delete value
    delete this.storage[hashedKey];
  }
  //if no primitive or object values found
  return undefined;
};

//test
hash.remove("hi");
hash.remove("hj");
//log
console.log(hash);

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

// Do not remove!!
module.exports = HashTable;

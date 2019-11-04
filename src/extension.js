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
HashTable.prototype.set = function(key, value) {
  resizeHash(this.storage);
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) {
    let hashObj = {};
    this.storage[index] = hashObj;
    this.storage[index][key] = value;
  } else {
    // if key already exists make an array or an obj
    // this way the same key can have multiple values.
    this.storage[index][key] = value;
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
HashTable.prototype.get = function(key) {
  const code = hashCode(key, this.SIZE);
  return this.storage[code][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
  // figure out how to turn the array index back to empty if object is empty
  const index = hashCode(key, this.SIZE);
  let temp = this.storage[index][key];
  delete this.storage[index][key];
  return temp;
  // semantic return
  return undefined;
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
// PSEUDO CODE SINCE I WONT HAVE TIME TO FINISH
function resizeHash(storage) {
  let oldHash = JSON.parse(JSON.stringify(storage));
  // if size is greater or less than a % value
  // iterate through current storage and deep clone
  // wipe current storage by resetting to empty filled array at the appropriate size
  // use clone to rehash keys and set their corresponding values in the newly reset storage
  // this function should work for either removal or setting and would check in a coditional if it should run the rehashing process.
  //console.log("in resize: ", oldHash);
}

// Do not remove!!
module.exports = HashTable;

let hash = new HashTable();
hash.set("adf", Math.random() * 20);
hash.set("adsff", Math.random() * 20);
hash.set("io3ierdf", Math.random() * 20);
hash.set("asdfkln", Math.random() * 20);
hash.set("adsioinorf", Math.random() * 20);
hash.set("aasdfdf", Math.random() * 20);
hash.set("aqwoqiedf", Math.random() * 20);
hash.set("aasdfadf", Math.random() * 20);
hash.set("adwef", Math.random() * 20);
hash.set("advzcxvzcf", Math.random() * 20);
hash.set("adjjjf", Math.random() * 20);
hash.set("adgfhf", Math.random() * 20);
hash.set("asfasdfdf", Math.random() * 20);
hash.set("aasdfasdfdf", Math.random() * 20);
hash.set("aasdfasfddf", Math.random() * 20);
hash.set("adasfdaf", Math.random() * 20);
hash.set("aasdfdf", Math.random() * 20);
hash.set("aasdfadsdf", Math.random() * 20);
hash.set("aasdfadfdf", Math.random() * 20);
hash.set("asadfadsfasdfdf", Math.random() * 20);
hash.set("avczxvzcdf", Math.random() * 20);
hash.set("anbvnvbndf", Math.random() * 20);
hash.set("adpopf", Math.random() * 20);
hash.set("ad23232f", Math.random() * 20);
hash.set("adasdfasdf", Math.random() * 20);
hash.set("ayerydf", Math.random() * 20);

hash.set("aasdfadsdf", Math.random() * 20);
hash.set("aasdfadfdf", Math.random() * 20);
hash.set("asadfadsfasdfdf", Math.random() * 20);
hash.set("avczxvzcdf", Math.random() * 20);
hash.set("anbvnvbndf", Math.random() * 20);
hash.set("adpopf", Math.random() * 20);
hash.set("ad23232f", Math.random() * 20);
hash.set("adasdfasdf", Math.random() * 20);
hash.set("ayerydf", Math.random() * 20);

hash.set("aayelitzasdf", Math.random() * 20);
hash.set("aarodrigoadfdf", Math.random() * 20);
hash.set("asassfasdfdf", Math.random() * 20);
hash.set("avczxvzcdf", Math.random() * 20);
hash.set("anbvnvbndf", Math.random() * 20);
hash.set("adpopf", Math.random() * 20);
hash.set("ad23232f", Math.random() * 20);
hash.set("ad786fasdf", Math.random() * 20);
hash.set("ayerydf", Math.random() * 20);

hash.set("aasdfadsdf", Math.random() * 20);
hash.set("aasjudyfdf", Math.random() * 20);
hash.set("asad2234sfasdfdf", Math.random() * 20);
hash.set("avc76878zcdf", Math.random() * 20);
hash.set("anbvnvbndf", Math.random() * 20);
hash.set("adpopf", Math.random() * 20);
hash.set("ad23232f", Math.random() * 20);
hash.set("adsdfsdf", Math.random() * 20);
hash.set("ay909ydf", Math.random() * 20);

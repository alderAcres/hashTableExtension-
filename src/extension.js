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
  //our array size will be a predetermined size of 16
  this.SIZE = 16;
  //instantiate a new array with 16 undefined as its elements. Assign this new array
  // as to the storage property on our "this" object.
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

//resize functionality: find percent: (values that are not undefined/size of storage length) * 100
// * need to be careful of floating decimals, not everything will divide cleanly into a percent whole number
//I didn't have time to code for decimals, i should floor() round up if I get a percent decimal
HashTable.prototype.set = function (key, value) {
  //Check if the storage is currently 75% occupied. If it is, this means adding one more would
  // be over the 75% max limit. Reset entire hashTable.
  let numNotOccupied = this.storage.length;
  let numOccupied = this.storage.reduce((counter, elem) => {
    //if elem is truthy, ie it exists and is not undefined, increment counter
    //I think Airbnb does not like post-fix incrementer?? (counter++), so I did addition assignment operator
    if (elem) counter += 1;
    return counter;
  }, 0);
  let addOneMore = numOccupied + 1;
  let percentOccupied = (numOccupied / numNotOccupied) * 100;
  let percentOneMore = (addOneMore / numNotOccupied) * 100;
  if (percentOccupied === 75 || percentOneMore) {
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);
  }
  //set functionality begins here:
  let index = hashCode(key, this.SIZE);
  //if the hashCode index has not already been assigned to a place in the array, then store
  //our key/value as an object on that array's index.
  if (this.storage[index] === undefined) {
    //assign our hashCode index on the array an empty object.
    this.storage[index] = {};
  }
  //on this object assign it with our passed in key/value pair.
  this.storage[index][key] = value;
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
  return this.storage[hashCode(key, this.SIZE)][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */

// ISSUE: need to fix remove function, see main.js comments
HashTable.prototype.remove = function (key) {
  //call hashCode returns an index that is assigned to our passed in key
  let indexToRemove = hashCode(key, this.SIZE);
  //store it in temp variable so that we may delete it and also return it.
  let removedValue = this.storage[indexToRemove][key];
  delete this.storage[indexToRemove][key];
  return removedValue;
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

// Do not remove!!
module.exports = HashTable;

// const hash = new HashTable();
// console.log(hash.storage.length);
// hash.set("Nelson", "Braeburn Dr");
// console.log(hash.storage);

// console.log(hash.get("Nelson"));
// console.log(hash.remove("Nelson"));
// console.log(hash.storage);

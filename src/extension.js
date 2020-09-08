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
  this.stored = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  //create a # of stored property in constructor
  //output of this function will equal to # stored -> similar mechanism will have to be in remove method to update property
  //in .set check if # of stored +1 = 75% of hash tables size
  //2 methods:
  /*
  1) create a new array with the new size. reset this.storage to be this new array once everything is rehashed
  2) ^^ creates a new reference in memory? Better to expand existing array??
  */

  if (this.stored + 1 === this.SIZE * 0.75) {
  }

  //store hashed index into variable
  const index = hashCode(key, this.SIZE);
  // let output = 0;
  // store object into hash table if this.value === undefined
  if (!this.storage[index]) {
    this.storage[index] = {};
    this.storage[index][key] = value;
    this.stored++;
  } else {
    this.storage[index][key] = value;
    this.stored++;
  }
  //object at that index will contain the incoming param key as the key, incoming value as value
  //returns new number - how to determine? Iterate over array to see how many elements are objects? Time complexity???
  // this.storage.forEach((el) => {
  //   if (el) {
  //     output += Object.keys(el).length;
  //   }
  // });
  return this.stored;
};

const test = new HashTable();
test.set('new', 'hello');
test.set('a', 'jello');
console.log(test.set('de', 'newtest'));
console.log(test);

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
  //store hashed key in variable
  const index = hashCode(key, this.SIZE);
  //check if undefined - if so return what? undefined? false?
  if (!this.storage[index]) return undefined;
  //if an object, check object for the key and return it's property
  return this.storage[index][key];
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
  //store index
  const index = hashCode(key, this.SIZE);
  //check if storage at index is undefined, if so return undefined
  if (!this.storage[index]) return undefined;
  //if defined, create temp storage for output, set it equal to the property found at param key
  const output = this.storage[index][key];
  if (Object.keys(this.storage[index]).length === 1) {
    delete this.storage[index];
    this.stored--;
  } else {
    delete this.storage[index][key];
    this.stored--;
  }
  //delete -> check if you end up with an empty object?
  return output;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

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

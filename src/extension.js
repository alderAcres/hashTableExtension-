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
HashTable.prototype.set = function (key, value) {
  let index = hashCode(key,this.SIZE);
  //check if with the addition of the key, whether the array with the elements filtered have a length that is .75 or greater
  //of the original arrays length
  if (!this.storage[index]) {
    //this placeholder helps check the length
    this.storage[index] = 'placeholder';
  }
    //this filter returns back only elements that have some value in them
  if (this.storage.filter((elem) => {
    return elem;
  }).length >= (this.SIZE * 0.75)) {
    //new array that will replace the current this.storage array
    let newArr = new Array(this.SIZE * 2);
    //looping through the array
    for (let i = 0; i < this.SIZE; i += 1) {
      //check if an element exists within that index
      if (this.storage[i] && this.storage[i] !== 'placeholder') {
        //check the keys of the element if it does exist because it MUST be an object
        for (let keys in this.storage[i]) {
          //rehash all the keys within that object
          const newIndex = hashCode(keys, this.SIZE * 2);
          //store the new old element at the new index of the new array
          newArr[newIndex] = this.storage[i];
        }
      }
    }
    //once the loops are completed, set this.storage to be the new array
    this.storage = newArr;
    //set this.SIZE to be this.SIZE * 2;
    this.SIZE = this.SIZE * 2;
  }
  //if it is, then change this.SIZE and then rehash everything
  index = hashCode(key, this.SIZE);
  //re-index the original key that was meant to be placed
  if (!this.storage[index] || this.storage[index] === 'placeholder') {
    //create an empty object
    this.storage[index] = {};
    this.storage[index][key] = value;
  } else {
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
  const index = hashCode(key,16);
  for(let objKeys in this.storage[index]) {
    if (key === objKeys) {
      return this.storage[index][key];
    }
  }
  //return this.storage[index][key]
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
  const index = hashCode(key,16);
  if (this.storage[index][key] !== undefined) {
    delete this.storage[index][key];
  } else {
    return undefined;
  }
};


// YOUR CODE ABOVE

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
const tester = new HashTable();
tester.set('hi','hello');
console.log(tester.storage);
tester.set('bye','bello');
console.log(hashCode('bye',16));
console.log(tester.storage);
// Do not remove!!
module.exports = HashTable;

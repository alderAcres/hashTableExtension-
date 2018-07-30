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

    // ----------------------- create a helper function ------------------------
    function countHashes() {
      // check to see how many hashes are in the table 
      let i = 0; // use to traverse
      let hashesPresent = 0;
      while (i < this.SIZE) {
        if (this.storage[i] !== undefined) { // check to see if an object is present 
          hashesPresent++ // if so, increment hashesPresent
        } else {
          i++;
        }
      }
      return hashesPresent; // return out count 
    }
    // --------------   helper function code ends  ------------------------------

  // get the index by of passing in key to hashCode
  let index = hashCode(key, this.SIZE);
  // get 75% of size into a variable. 
  const threeFourthOfSize = this.SIZE * 0.75;

  // check to see if the index is already occupied. 
  if (this.storage[index] !== undefined) {
    // check to see if the passed in key has already been used to store another val
    if (this.storage[index][key]) {
      this.storage[index][key] = value; // if so, overwrite the existing value with the new value
    } else {
      // create a new property
      this.storage[index][key] = value;
    }
  } else { // create a new object to add into the hashtable

    // before creating a new object, check to see if you're about to go over 75%;
    let currSize = countHashes() + 1;
    if (currSize > threeFourthOfSize) {
      let currHashes = this.getHashesIntoAnArray(); // get all current hashes in an array
      // resize storage
      this.storage *= 2;
      // rehash everything 
      while (currHashes.length) {
        this.set() // keep passing in the first hash 
      }
    } else {
      const obj = {};
      obj[key] = value; 
      this.storage[index] = obj;
    }
  }

  // this helper function is very similar to countHashes, both can be combined to DRY -----
  function getHashesIntoAnArray() {
    let i = 0; // use to traverse 
    const hashHolder = [];
    // before doubling the size of the storage, store the hashes in an array by iterating through original storage
    while (i < this.SIZE) {
      if (this.storage[i] !== undefined) {
        hashHolder.push(this.storage[i]); // add all objects into the hashHolder array
        for (let key in this.storage[i]) { // delete the properties in the object
          delete this.storage[i][key]
        }
      }
      i++;
    }
    return hashHolder;
  }
  // ---------------------------- helper function code ends -------------------------------
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
  // get the index 
  const index = hashCode(key, this.SIZE);
  // store the value in  a variable, to be returned 
  const getElement = this.storage[index][key];
  return getElement;
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
  // get the index
  const index = hashCode(key, this.SIZE);

  // check to see if the key/val exists. 
  if (this.storage[index][key]) {
    delete this.storage[index][key]; // if so, delete
  } else {
    return undefined; // if key doesn't exist, return undefined
  }
};


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

// Do not remove!!
module.exports = HashTable;

const hash = new HashTable();

console.log(hash.SIZE)
console.log(hash.SIZE * 0.75);

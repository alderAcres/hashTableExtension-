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
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.stored = 0;
  
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
  // create a hashed code variable containing the hashed key
  const hashedKey = hashCode(key, this.SIZE);
  const setObj = {};
  setObj[key] = value
  // check if the hashed code exists in our storage, if not, create the property and create an array containing the key/value pair
  if (!this.storage[hashedKey]) {
    this.storage[hashedKey] = [setObj];
    this.stored += 1;
    return this.stored;
  }

  for (let i = 0; i < this.storage[hashedKey].length; i += 1) {
    let obj = this.storage[hashedKey][i];

    if (!obj[key]) {
      this.storage[hashedKey].push(setObj)
      this.stored += 1;
      return this.stored;
    } else {
      // else overwrite      
      obj[key] = value;
      return this.stored;
    }
  }

  
};

// const newHashTable = new HashTable();
// console.log(newHashTable.set('john', 'friendly'));
// console.log(newHashTable)
// console.log(newHashTable.set('john', 'mean'));
// console.log(newHashTable.set('frank', 'great'));
// console.log(newHashTable.set('frank', 'not great'));
// console.log(newHashTable)
// console.log(newHashTable.set('jogm', 'friendly'))
// console.log(newHashTable.set('frank', 'not great'));
// console.log(newHashTable)


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
  // get hash code of the given key
  const hashedKey = hashCode(key, this.SIZE);
  // if hashed key doesnt exist return -1;
  if (!this.storage[hashedKey]) return -1;
  // if hashed key exists loop through the array and find a match with the given key
  for (let i = 0; i < this.storage[hashedKey].length; i += 1) {
    let obj = this.storage[hashedKey][i];

    // if it doesnt exist return false
    if (!obj[key]) return -1;
  // return the value stored
    return obj[key];
  }
};

// console.log(newHashTable.get('john'))
// console.log(newHashTable.get('blah'))
// console.log(newHashTable.get('frank'))


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const hashedKey = hashCode(key, this.SIZE);
  if (!this.storage[hashedKey]) return -1;
  
  // if array.length is 1 for the specified hashed key, then delete that property\
  if (this.storage[hashedKey].length === 1) {
    // create temp variable for deleted element
    const deleted = this.storage[hashedKey];
    delete this.storage[hashedKey];
    return deleted;
  }

  for (let i = 0; i < this.storage[hashedKey].length; i += 1) {
  // if greater than one use splice to remove that element from the array
    let obj = this.storage[hashedKey][i];
    if (!obj[key]) return -1;

    return this.storage[hashedKey].splice(i, 1);
  }
};

// console.log(newHashTable)
// console.log(newHashTable.remove('john'))
// console.log(newHashTable.remove('frank'))
// console.log(newHashTable.remove('blah'))
// console.log(newHashTable)


// const testArray = [1];
// let store = testArray.splice(0, 1);
// console.log(testArray)
// console.log(store)



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

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
  this.stored = 0
  this.storage = new Array(this.SIZE);
}

//  declare new function for "rehashing"
HashTable.prototype.rehash = function() {
  this.SIZE *= 2;
  this.stored = 0;
  let storage = this.storage;
  this.storage = new Array(this.SIZE);
  storage.forEach(obj => {
    for (let key in obj) {
      let index = hashCode(key, this.SIZE);
      if (!this.storage[index]) {
        let tempObj = {};
        tempObj[key] = obj[key];
        this.storage[index] = tempObj;
        this.stored++;
      } else {
        //check for passing in same key with diff value
        this.storage[index][key] = obj[key];
        this.stored++;
      }
    }
  });
}
/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
* - If adding the new item will push the number of stored items to over 75% of
*   the hash table's SIZE, then double the hash table's SIZE and rehash everything
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
    // first decalare an index variable, and set it to the invocation of hashcode 
    // using the key as the string parameter and then the size property of the hastable as the size parameter
    const index = hashCode (key, this.SIZE);
    //  check if there is already a object at the index value of the storage property
    //  if there already is a value add new key value pair from .set to that object
    //  finally update the value of the indexed position for the storage property
    if (this.storage[index]){
        this.storage[index][key] = value;
    } else {
      //  if there is no value there (the else case) create an object with the k/v pair from the .set function
      const obj = {};
      obj[key] = value; 
      this.storage[index] = obj;
      //  increment this.stored property because you are now adding an item to an additional index
      this.stored += 1;
    }
    if (this.stored >= (.75 * this.SIZE)){
      //  call rehash function that doubles the size and rehashes everything
      this.rehash()
    }
    return this.stored;
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
  //  declare an index constant that is set to the output of the hashcode function when invoked with key parameter
  const index = hashCode(key, this.SIZE);
  //  return the key of the value of the storage property @ the index constant
  return this.storage[index][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
* - If the hash table's SIZE is greater than 16 and the result of removing the 
*   item drops the number of stored items to be less than 25% of the hash table's SIZE
*   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //  declare index constant that is set to teh output of the hashcode function when invoeked with key and this.zie
  const index = hashCode(key, this.SIZE);
  //  declare a result variable and assignt that equal to the object value of the given key for the storage property at the index constant
  const result = this.storage[index][key];
  //  delete k/v pair @ object present in the storage property at the const index variable
  delete this.storage[index][key];
  //  check if the whole index container of this.storage property has zero k/v pairs, and if there is none, correct this.stored and make the index containter undefined once again
  if (!Object.keys(this.storage[index]).length){
    this.storage[index] = undefined;
    this.stored --;
  }
  //  if the capacity(this.stored) is less than 25%, AND max capacity (this.size) was already greater than 16, rehash everything
  //  couldnt' finish but i have to refactor the rehash code to make it universal for both expanding and constricting
  //  return result
  return result;
};

// const table = new HashTable()
// table.set('one', 1)

// console.log(table)

// table.set('two', 2)

// console.log(table)

// console.log(table.remove('two'))
// table.set('three', 3)

// console.log(table)
// console.log(table.remove('two'))


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

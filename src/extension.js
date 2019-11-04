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

  // the array will be instantiated as [undefined, undefined....]
  // pop() and push() shouldn't be used on the storage
  this.storage = new Array(this.SIZE);
}

// stores a value in the storage array
// hint: use the hash function to determine where in the array to store the value
HashTable.prototype.set = function(key, value) {

  const array = this.storage; // 16 buckets
  // hash the key
  let hash = hashCode(key, this.SIZE);
  let currentLength = this.SIZE;

  
  // if the index is empty 
  if (!array[hash]) {
    // we create a new object
    const myObj = {};
    // assign key value into the new object
    myObj[key] = value;
    // we set myObject kv pair as the value of the index in array. 
    array[hash] = myObj[key];
    
    currentLength += 1;

    if(currentLength > Math.floor((0.75 * this.SIZE) + this.SIZE)){
      delete array[hash][key]; // remove previously set key
      this.SIZE *= 2
      hash = hashCode(key, this.SIZE);
      if (!array[hash]) {
        // we create a new object
        //const myObj = {};
        // assign key value into the new object
        myObj[key] = value;
        // we set myObject kv pair as the value of the index in array. 
        array[hash] = myObj[key];
        
        currentLength += 1;
    }

  } else {
      if (array[hash].hasOwnProperty(key)){
          array[hash][key] = value
          return;
      } else {
        array[hash][key] = value
        return;
      }
  }
  return array;
};

// return a previously stored value
HashTable.prototype.get = function(key) {
  const array =  this.storage;
  const indexToGet = hashCode(key, this.SIZE);

  return array[indexToGet]; 
};

// returns and removes a key from the hash table
HashTable.prototype.remove = function(key) {
  const myStorage = this.storage;
  const indexToRemove = hashCode(key, this.SIZE);

  const valueToReturn = myStorage[indexToRemove];

  // valueToReturn !== key

  delete myStorage[indexToRemove];

  return valueToReturn;
};

// returns a number between 0 and size that is unique* and generated from the the inputted string

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

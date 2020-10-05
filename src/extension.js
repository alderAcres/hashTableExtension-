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

const { delete } = require("request");

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.SIZE = 16;
  this.count = 0;
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
  //first, we'll run hashcode on the key and save that as a variable
let element = hashCode(key, this.SIZE);
// to handle collisions, we'll want every this.storage to have an object that holds key/value pairs
if (this.storage[element] === undefined) {
  this.storage[element] = {};
  //I've added in a counter to track how much of the SIZE we're filling up
  this.count++
}
//finally, we'll save our key-value pair within said object
this.storage[element][key] = value;

//I'm not 100% sure how to do this so I'm breaking it down step by step. First we have to check how big the size is
if(this.count>=this.SIZE*3/4) {
  //If it reaches our limit we need to double it and reset our count
  this.SIZE *=2;
  this.count = 0;
  //Then iterate through each index in our hash table
  for (let x of this.storage) {
    //then run through each object at that index
    for (let y in this.storage[x]) {
      //we'll save the associated value and run the key thru a new hash code
      let value = this.storage[x][y];
      let newHashCode = hashCode(y, this.SIZE);
      //then we'll perform similar functionality to our the rest of our set function, checking if that exists and
      //if not creating an object and saving the associated key-value pair to that object
      if (this.storage[newHashCode] === undefined) {
        this.storage[newHashCode] = {};
    }
    this.storage[newHashCode][y] = value;
    //finally we'll remove the key-value pair from the old hash table
    delete y;
    //NOTE: I didnt have time to test this so I'd appreciate letting me know if this is the correct method or not :)
  }
}

};

let test = new HashTable();
test.set("key", "value")
test.set(0, 0)
test.set(0,true)
console.log(test)

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
  //first we will convert our key into hashcode
  let element = hashCode(key, this.SIZE);
  //then we'll check if a storage object at that element exists. Specifically checking for undefined is a little
  //  verbose but elimintates edge cases where the key is 0 or null. Returns error message if no key is found.
  if(this.storage[element] === undefined) {
    return "Error: There is no value associated with that key";
  }
  //otherwise returns the associated value
  else {
    return this.storage[element][key];
  }
};

console.log(test.get("key"))


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //Not to repeat myself but first we need to run the key through hashcode.
  let element = hashCode(key, this.SIZE);
  //then we need to check if the associated key-value pair exists, otherwise it could break the function.
  //if it does, we use delete to remove the key-value pair from the hash's object
  if(this.storage[element] !== undefined) {
    delete this.storage[element][key];
  }
  else {
    return "Error: There is no value associated with that key";
  }
  //For the remove extension, first we have to check if the criteria is met
  if (this.SIZE>16 && this.count<=this.SIZE*3/4) {
    //then we're having the size of the storage and I believe the rest of the functionality should be the
    //same as expanding the size. Again, didn't have time to test so let me know if this was the right way
    // to go about it!
  this.SIZE /=2;
  this.count = 0;
  //Then iterate through each index in our hash table
  for (let x of this.storage) {
    //then run through each object at that index
    for (let y in this.storage[x]) {
      //we'll save the associated value and run the key thru a new hash code
      let value = this.storage[x][y];
      let newHashCode = hashCode(y, this.SIZE);
      //then we'll perform similar functionality to our the rest of our set function, checking if that exists and
      //if not creating an object and saving the associated key-value pair to that object
      if (this.storage[newHashCode] === undefined) {
        this.storage[newHashCode] = {};
    }
    this.storage[newHashCode][y] = value;
    //finally we'll remove the key-value pair from the old hash table
    delete y;
  }
  }
};

test.remove("key")
console.log(test)


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

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
  this.counter = 0;
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

// we need to add values to the correct area in hashtable, based on the hashcode. Each storage has key value pair
HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key, this.SIZE); // generates the hashcode to place the key value pair
  // if there is already an existing key, then we just add the new key value pair
  if (this.storage[hash]){
    this.storage[hash][key] = value;
    this.counter++; // add the counter
  } else{ // if there is no existing key, we must create an empty object then insert the key value pair
    this.storage[hash] = {} // create an empty object if nothing exists at location
    this.storage[hash][key] = value;
    this.counter++; // add to the counter to keep track of length
  }

  // perform check to see if the hashtable is over 50% filled
  if (this.counter > this.SIZE/2){
    // resize that hashtable
    this.SIZE = 32
    // rehash everything that existed with the new size. Delete all values inside the array currently, and rehash them
    for (const pair of this.storage){
      // if not undefined, go through
      if (pair){
        for (let key in pair){
          let temp = pair[key] // store the value of the key that will be deleted
          delete pair[key]; // delete all values inside
          // rehash the value
          let newHash = hashCode(key, this.SIZE);
            // if there is already an existing key, then we just add the new key value pair
            if (this.storage[newHash]){
              this.storage[newHash][key] = temp;
            } else{ // if there is no existing key, we must create an empty object then insert the key value pair
              this.storage[newHash] = {} // create an empty object if nothing exists at location
              this.storage[newHash][key] = temp;
            }
        }
      } else{
        continue;
      }
    }

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

// get value stored in hash table with specified key
HashTable.prototype.get = function(key) {
  const hash = hashCode(key, this.SIZE); // generate the hash key to locate position
  // if exists, return it, else return does not exist
  if (this.storage[hash]){
    return this.storage[hash][key];
  } else{
    return "does not exist"
  } 
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

// remove value from the hashTable
HashTable.prototype.remove = function(key) {
  // generate the hash key to locate the position
  const hash = hashCode(key, this.SIZE);
  // save the key you are going to delete in a variable
  const returnVar = this.storage[hash][key];
  // use delete to remove the object with the key stored in the position
  delete this.storage[hash][key];
  // return that variable
  this.counter--
  return returnVar
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






// to get the hashtable to work
hashTable = new HashTable;

console.log(hashTable)
// Test cases for set
hashTable.set("one", 1)
hashTable.set("two", 2)
hashTable.set("three", 3)
hashTable.set("four", 4)
hashTable.set("five", 5)
hashTable.set("six", 6)
hashTable.set("seven", 7)
hashTable.set("eight", 8)
hashTable.set("nine", 9)
hashTable.set("ten", 10)
hashTable.set("eleven", 11)
hashTable.set("twelve", 12)

//console.log(hashTable)

// Test cases for get
//console.log(hashTable.get("one"))
//console.log(hashTable.get("five"))


// Test cases for remove
//console.log(hashTable.remove("one"))
//console.log(hashTable)



// Testing new set functionality
console.log(hashTable.counter)
console.log(hashTable)

// Do not remove!!
module.exports = HashTable;

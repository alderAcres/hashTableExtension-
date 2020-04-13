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

// ************************************* NOTES *************************************
// I have started updating hashtable to account for resizing.
// The hash table now has this.capacityUsed which counts the number of storage slots taken (not including clashes stored in the same slot)
// This will allow me to calculate the % used before using get or remove
// I have also updated get and remove to properly increment/decrement this
// I ran out of time before being able to implement the get and remove methods
// My planned stategy:
// Do a check for the % of capacity used before the get or set logic
// If capacity needs changing, I will have a helper method that implements this (by iterating through storage and rehashing the keys to add the items to the new table)


function HashTable() {
  this.SIZE = 16;

  // To count the number of items added to storage, including clashes
  this.itemCount = 0
  // To count the number of storage slots used (doesn't count clashes)
  this.capacityUsed = 0
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

  // Hash the key
  let hashedKey = hashCode(key, this.SIZE);
  // If object exists, add key value pair
  if (this.storage[hashedKey]){
    if (this.storage[hashedKey][key]) {
      this.storage[hashedKey][key] = value
    } else {
      this.storage[hashedKey][key] = value
      this.storage[hashedKey]["length"]++
      this.itemCount++
    }
  } else { // else, create object and add
    this.storage[hashedKey] = {
      [key]: value,
      "length": 1
    }
    this.capacityUsed++
    this.itemCount++
  }
  // return the number of stored items after incrementing (inc. clashed)
  return this.itemCount
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
  // Hash the key
  let hashedKey = hashCode(key, this.SIZE);
  // Check if key value pair exists and return if so
  if (this.storage[hashedKey]){
    return this.storage[hashedKey][key]
  } else { // else, return item not found
    return "item not found"  
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
HashTable.prototype.remove = function(key) {
  // Hash the key
  let hashedKey = hashCode(key, this.SIZE);
  // Check for key value pair at location
  let returned = this.storage[hashedKey][key]
  // If key value pair exist, delete them but return the stored value and decrement item count
  if (returned !== undefined){
    delete this.storage[hashedKey][key]
    this.itemCount--
    this.storage[hashedKey]["length"]--
    if (this.storage[hashedKey]["length"] === 0) {
      this.capacityUsed--
    }
    return returned
  } else { // else, return key not found
    return "Key not found in storage"
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

// Do not remove!!
module.exports = HashTable;


let myHash = new HashTable()
console.log(myHash.set("henry", "black") + "SET")
console.log(myHash.set("address", "bogota") + "SET")
console.log(myHash.storage)
console.log(myHash.set("henry", "BLACK") + "SET")
console.log(myHash.set("address", "BOGOTA") + "SET")
console.log(myHash.storage)
console.log("COUNT: " + myHash.itemCount)
console.log("capacityUsed: " + myHash.capacityUsed)
console.log(myHash.remove("henry") + "REMOVE")
console.log("COUNT: " + myHash.itemCount)
console.log("capacityUsed: " + myHash.capacityUsed)
console.log(myHash.remove("address") + "REMOVE")
console.log("COUNT: " + myHash.itemCount)
console.log(myHash.storage[1])
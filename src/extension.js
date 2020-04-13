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

  this.items = 0; // similar to size function, but for number of elements on the hash table
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
  if( (this.items+1)/this.SIZE > 0.75){
    this.SIZE = this.SIZE*2
    let newStorage = new Array(this.SIZE)
    this.storage.forEach(hashObject =>{
      let storedObject = hashObject
      let newKey = hashCode(Object.keys(storedObject)[0],this.SIZE) // we only need to use one key to get the new hashcode, all the others will match
      newStorage[newKey] = storedObject
    })
    this.storage = newStorage
  }
  let hashedKey = hashCode(key,this.SIZE);
  if (!this.storage[hashedKey]){ //using an object instead of a linked list for the sake of completing this code in time.
    this.storage[hashedKey] = {[key]: value} //give the hash table a new object
    this.items++
  }
  else{ // hash table already has an object in the hashcode spot so we are gonna add to that object
    if(!this.storage[hashedKey][key]){ //if it is the same hashcode but a different key we have to increase our items
      this.items++ 
    }
    this.storage[hashedKey][key] = value //otherwise we can just replace the existing value without modifying items
    
  }

  return this.items
  
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
  let hashedKey = hashCode(key,this.SIZE)
  if (this.storage[hashedKey]!== undefined){ // can't check the key of an undefined index, so have to make this check first
    return this.storage[hashedKey][key] //don't need to check if key exists because it will handle to undefined if it doesn't
  }
  else {
    return undefined
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

  if(this.SIZE>16 && (this.items-1)/this.SIZE < 0.25){  // probably can turn this if block into a method in the Hashtable object to be called by both set and remove
    this.SIZE = this.SIZE/2
    let newStorage = new Array(this.SIZE)
    this.storage.forEach(hashObject =>{
      let storedObject = hashObject
      let newKey = hashCode(Object.keys(storedObject)[0],this.SIZE) // we only need to use one key to get the new hashcode, all the others will match
      newStorage[newKey] = storedObject
    })
    this.storage = newStorage
  }



  let hashedKey = hashCode(key,this.SIZE)
  let removed 

  if(!this.storage[hashedKey]){ // can't check the key of an undefined object, so have to check here
    return undefined
  }

  if(!this.storage[hashedKey][key]){ //if it doesn't exist, just return undefined
    return undefined
  }

  // we get here if the above 2 cases are falsy
  
  this.items = Math.max(this.items-1,0) // make sure our # of items is never under 0
  removed = this.storage[hashedKey][key] // saved prior to deletion
  delete this.storage[hashedKey][key]
  if (!Object.keys(this.storage[hashedKey]).length){ //want to delete hash object if empty
    delete this.storage[hashedKey]
  }
  return removed

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
// let hash = new HashTable()
// hash.set("bobby","ain't right")
// hash
// hash.set("bobby","not my purse")
// hash
// hash.set("BOBBY","I'm ok Dad")
// hash
// hash.set("Hank","propane")
// hash
// hash.set("peggy", "hill")
// hash
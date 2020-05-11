/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}

//there is a more efficient way of iterating through the hashtable by starting at the converted key and proceeding afterwards looping to the start if not found. Would like to implement this later

HashTable.prototype = {
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

  //I did not handle for collision 
  set : function(key, value) {
    console.log(key, value)
    const hash = hashCode(key, this.SIZE);
    console.log(hash)
    // if the key already exists in our storage
    if (this.storage[hash]){
      //overwrite the old value
      this.storage[hash][key] = value;
    }
    // if the key does not already exist we will create :
    this.storage[hash] = {};
    //add the key taken in as the key and give it the value it was given
    this.storage[hash][key] = value;
  },

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

  //did not complete the second requested functionality only looking for [0]
  //possible brute force solution would be to add an addition for loop to find a match
  get : function(key) {
    //iterate through the hash table to find key
    for (let i in this.storage) {
      //if we find a match while iterating through the hashtable
      if (Object.keys(this.storage[i])[0] === key) {
        //return the value corresponding to the key passed into prototype.get
        return Object.values(this.storage[i])[0];
      }
    }
    //return false after iterating through the hashtable and not finding a match
    return false;
  },

  /**
  * remove - delete a key/value pair from the hash table
  *
  * - If the key does not exist in the hash table, return undefined
  *
  * @param {string} key - key to be found and deleted in hash table
  * @return {string|number|boolean} The value deleted from the hash table
  */

  //not checking for multiple keys
  remove : function(key) {
    //iterate through the hashtable to see if we can find a matching key
    for (let i in this.storage) {
      // if we find a match of key passed in our storage
      if (Object.keys(this.storage[i])[0] === key) {
        // save our soon to be deleted obj in a variable to return later
        const soonToBeDeleted = this.storage[i];
        // delete the desired obj
        delete (this.storage[i]);
        //return
        return soonToBeDeleted;
      }
    }
    // if we do not find a matching key in our hashtable return undefined.
    return;
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

// Do not remove!!
module.exports = HashTable;

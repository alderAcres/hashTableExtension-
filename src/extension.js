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

//I honestly HAVE no idea on how to increase the size at the moment.

function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
}

//there is a more efficient way of iterating through the hashtable by starting at the converted key and proceeding afterwards looping to the start if not found. Would like to implement this later 

HashTable.prototype = {
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
    // if we do not find a matching key in our hashtable we can return something else. false as an example
    return false;
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

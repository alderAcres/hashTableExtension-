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

function HashTable(size = 16) {
  this.SIZE = size;
  this.storage = new Array(this.SIZE);
  this.items = 0;
}

HashTable.prototype.set = function(key, value) {
  //Key must a string
  if (typeof key !== 'string') return 'Please input a valid key';
  //Convert key into hashcode
  let ind = hashCode(key, this.SIZE);
  //Check if bucket exists
  if (this.storage[ind] === undefined) {
    this.storage[ind] = [{key, value}];
    this.items++;
  } else {
  //If collision, check if key is in bucket
    let keyUpdate = false;
    for (let i = 0; i < this.storage[ind].length; i++) {
      //If key is in bucket, update value
      if (this.storage[ind][i]['key'] === key) {
        this.storage[ind][i]['value'] = value;
        keyUpdate = true;
      }
    } 
  //If key was not updated, then we have to add the new key to bucket to avoid collision
    if (!keyUpdate) {
      this.storage[ind][this.storage[ind].length] = {key, value};
      this.items++;
    }
  }

  //Check if we need to rehash
  if (this.items > (this.SIZE * .75)) {
    let newHashTable = this.HashTable(this.SIZE * 2);
    newHashTable.items === this.items;
    //iterate through storage adding each key to new hashtable
  }

  //Return
  return this.items;
};

HashTable.prototype.get = function(key) {
  //Key must be a string
  if (typeof key === 'string') {
    //Convert key into hashcode
    let ind = hashCode(key, this.SIZE);
    //If bucket does not exist, return key not found.
    if (!this.storage[ind]) return 'Key not found';
    //If bucket exists, iterate to check if key is in bucket
    for (let i = 0; i < this.storage[ind].length; i++) {
      //If found, retrieve value of specified key
      if (this.storage[ind][i]['key'] === key) return this.storage[ind][i]['value']
    }
  }
  //If key not found in bucket, return key not found.
  return 'Key not found';
};

HashTable.prototype.remove = function(key) {
  //Key must be a string
  if (typeof key === 'string') {
    //Convert key into hashcode
    let ind = hashCode(key, this.SIZE);
    //If bucket does not exist
    if (!this.storage[ind]) return undefined;
    //If bucket exists, iterate to check if key is in bucket
    for (let i = 0; i < this.storage[ind].length; i++) {
    //If key is found, check if bucket length. Delete entire bucket if it only contains one key, otherwise delete specified key
      if (this.storage[ind][i]['key'] === key) {
        let removed = this.storage[ind][i]['value'];
        if (this.storage[ind].length === 1) delete this.storage[ind];
        else delete this.storage[ind][i];
        return removed;
      }
    }
  }
  //If key not found in bucket
  return undefined;
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

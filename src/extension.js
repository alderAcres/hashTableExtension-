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
  
  this.storage = new Array(this.SIZE);
}
function Node(value,key,next = null){
  this.value = value;
  this.key = key;
  this.next = next;
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
  /*
  implementation of sizeCheck
  */
  if(this.sizeCheck === true){
    let newStorage = new Array(this.SIZE * 2);
    for(let i = 0; i < this.SIZE; i++){
      while(this.storage[i]){
        let newIndex = hashCode(this.storage[i].key, this.Size*2)
        if(newStorage[index] === null){
          let newNode = new Node(this.storage[i].value,this.storage[i].key)
          newStorage[index] = newNode;
        } else {
          let newNode = new Node(this.storage[i].value,this.storage[i].key.newStorage[index])
          newStorage[index] = newNode;
        }
      }
    }
      this.storage = newStorage;
      this.SIZE = this.SIZE * 2;
    }
    ///
  let index = hashCode(key, this.SIZE)
  if(this.storage[index] === null){
    let newNode = new Node(value,key);
    this.storage[index] = newNode
  } else {
    let newNode = new Node(value,key, this.storage[index])
    this.storage[index] = newNode;
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
HashTable.prototype.get = function(key) {
  let index = hashCode(key,this.SIZE)
  let bucket = this.storage[index];
  while(bucket || bucket.key !== key){
    if(bucket.key === key){
      return bucket.value
    }
    bucket=bucket.next
  }
  return "Not found"
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
//Implementation of sizeCheckSmall
  if(sizeCheckSmall){
    let newStorage = new Array(this.SIZE/2);
    for(let i = 0; i < this.SIZE; i++){
      while(this.storage[i]){
        let newIndex = hashCode(this.storage[i].key, this.Size*2)
        if(newStorage[index] === null){
          let newNode = new Node(this.storage[i].value,this.storage[i].key)
          newStorage[index] = newNode;
        } else {
          let newNode = new Node(this.storage[i].value,this.storage[i].key.newStorage[index])
          newStorage[index] = newNode;
        }
      }
    }
      this.storage = newStorage;
      this.SIZE = this.SIZE/2;
  }
//
  let index = hashCode(key,this.SIZE)
  let bucket = this.storage[index];
  let prevBucket = this.storage[index]
  while(bucket || bucket.key !== key){
    if(bucket.key === key){
      if(prevBucket.next === bucket.next){
        prevBucket.next = null;
      } else {
        prevBucket.next = bucket.next;
      }
      return bucket.value;
    }
    prevBucket = bucket;
    bucket=bucket.next;
  }
  return null;
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

//CustomMethod: sizeCheck to see if storage at 75% capactity
HashTable.prototype.sizeCheck = function(){
  let occupiedSlots = 0;
  let capacityLimit = this.SIZE/4*3
  for(let i = 0; i < this.SIZE; i++){
    if(this.storage[i]){
      occupiedSlots++
    }
  }
  return occupiedSlots >= capacityLimit
}

HashTable.prototype.sizeCheckSmall = function(){
  let occupiedSlots = 0;
  let capacityLimit = this.SIZE/2
  for(let i = 0; i < this.SIZE; i++){
    if(this.storage[i]){
      occupiedSlots++
    }
  }
  return occupiedSlots <= capacityLimit
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

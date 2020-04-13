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

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
  this.storage = new Array(this.SIZE);
}

function HashNode(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}
HashNode.prototype.last = function() {
  let result = this;
  while (result.next) {
    result = result.next;
  }
  return result;
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
  if ((this.length + 1) / this.size > .75){
    this.resize(this.size * 2);
  }

  let hash = hashCode(key, this.SIZE);
  let node = new HashNode(key, value);
  if (this.storage[hash]){
    this.storage[hash].last().next = node;
  } else {
    this.storage[hash] = node;
  }
  return ++this.length;
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
  let hash = hashCode(key, this.SIZE);

  if (this.storage[hash] === undefined){
    //bucket is empty, key cannot exist
    return undefined;
  }

  //crawl linked list to find key
  let result = this.storage[hash];
  while (result.key !== key) {
    if (result.next === null) {
      //no more nodes in the list, key does not exist
      return undefined;
    }

    result = result.next;
  }

  return result.value;
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
  if (this.size > 16 && (this.length - 1) / this.size < .25){
    this.resize(this.size / 2);
  }

  let hash = hashCode(key, this.SIZE);

  if (this.storage[hash] === undefined) {
    //bucket is empty, key cannot exist
    return undefined;
  }

  //crawl linked list to find key
  let parent = null;
  let target = this.storage[hash]; 
  while (target.key !== key) {
    if (target.next === null) {
      //no more nodes in the list, key does not exist
      return undefined;
    }

    parent = target;
    target = target.next;
  }

  //key exists
  this.length -= 1;

  let result;
  if (parent === null) { 
    //node to remove is head
    if (target.next) {
      this.storage[hash] = target.next;
    } else { 
      //node to remove is last value in bucket
      delete this.storage[hash];
    }
  } else if (target.next === null) { 
    //node to remove is tail
    parent.next = null;
  } else { 
    //node to remove has parent and child which must be linked
    parent.next = target.next;
  }
  return target.value;
};

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

//change SIZE property and rehash all elements
HashTable.prototype.resize = function(size) {
  let temp = new HashTable();
  temp.size = size;
  //add all current elements to temp hashtable
  for (let head of this.storage) {
    while (head) {
      temp.set(head.key, head.value);
      head = head.next;
    }
  }

  this.storage = temp.storage;
  this.size = temp.size;
}

// Do not remove!!
module.exports = HashTable;
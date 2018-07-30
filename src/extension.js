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
  this.length = 0;

  this.storage = new Array(this.SIZE);
}

function LinkedList(key, value){
  this.head = new Node(key, value);
  this.tail = this.head;
}

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}

LinkedList.prototype.add = function (key, value) {
  let currNode = this.head;
  while(currNode !== null){
    if(currNode.key === key) {
      currNode.value = value;
      return;
    }
    currNode = currNode.next;
  }
  this.tail.next = new Node(key, value);
  this.tail = this.tail.next;
}

LinkedList.prototype.getValue = function (key) {
  let currNode = this.head;
  while(currNode !== null){
    if(currNode.key === key) {
      return currNode.value;
    }
    currNode = currNode.next;
  }
}


LinkedList.prototype.containsKey = function (key) {
  let currNode = this.head;
  while(currNode !== null){
    if(currNode.key === key) {
      return true;
    }
    currNode = currNode.next;
  }
  return false;
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
  if(this.storage[hashCode(key, this.SIZE)] === undefined){
    this.storage[hashCode(key, this.SIZE)] = new LinkedList(key, value);
  } else {
    this.storage[hashCode(key, this.SIZE)].add(key, value);
  }

  this.length ++;
  if(this.length > ((this.SIZE / 4) *3)) {
    this.SIZE *= 2;
    this.length = 0;
    let values = this.getContents();
    this.storage = [];
    for(let i = 0; i < values.length; i++) {
      this.set(values[i].key, values[i].value);
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
HashTable.prototype.get = function(key) {
  if(typeof this.storage[hashCode(key, this.SIZE)] !== 'object') {
    return undefined;
  }
  return this.storage[hashCode(key, this.SIZE)].containsKey(key) ? this.storage[hashCode(key, this.SIZE)].getValue(key) : undefined;
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
  if(this.get(key) !== undefined){
    let temp = this.get(key);
    this.storage[hashCode(key, this.SIZE)].add(key, undefined);
    return temp;
  } else {
    return undefined;
  }
};

HashTable.prototype.getContents = function() {
  let result = [];
  for(let i = 0; i < this.storage.length; i++) {
    if(this.storage[i] !== undefined) {
      let currNode = this.storage[i].head;
      result.push(currNode);
      while(currNode !== null) {
        result.push(currNode);
        currNode = currNode.next;
      }
    }
  }
  return result;
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

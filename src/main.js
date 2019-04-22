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

  this.itemCount = 0;
}

// I was going to implement a linked list to handle collisions, but ran out of time
// function LinkedList() {
//   this.head = null;
//   this.tail = null;
// }

// LinkedList.prototype.add = function(value) {
//   const node = new Node(value);
//   if (this.head === null) {
//     this.head = node;
//     this.tail = node;
//   } else {
//     this.tail.next = node;
//     this.tail = node;
//   }
// }
// LinkedList.prototype.remove = function(value) {
//   if (this.head.value === value) {
//     this.head = this.head.next;
//   }
  
//   const traverser = this.head;
//   if 
// }

// function Node(value) {
//   this.value = value;
//   this.next = null;
// }

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
  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket]) {              // if bucket is currently empty
    this.storage[bucket] = {};
    this.storage[bucket][key] = value;  
    this.itemCount += 1;
  } else {                                // if bucket occupied, add to its object
    if (this.storage[bucket][key] !== undefined) this.itemCount += 1;   // increment item count only if key not already entered
    this.storage[bucket][key] = value;
  }

  return this.itemCount;
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
  const bucket = hashCode(key, this.SIZE);
  if (this.storage[bucket][key] === undefined) return "Key not found"
  return this.storage[bucket][key];
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
  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket] || this.storage[bucket][key] === undefined) return undefined;
  const removed = this.storage[bucket][key];
  delete this.storage[bucket][key];
  this.itemCount -= 1;
  return removed;
};



// let hashTable = new HashTable();
// hashTable.set("0","a");
// hashTable.set("1","b");
// hashTable.set("2","c");
// hashTable.set("3","d");
// hashTable.set("4","e");
// hashTable.set("5","f");
// hashTable.set("6","g");
// hashTable.set("7","h");
// hashTable.set("8","i");
// hashTable.set("9","j");
// hashTable.set("10","k");
// hashTable.set("11","l");
// hashTable.set("12","m");
// hashTable.set("13","n");
// hashTable.set("14","o");
// hashTable.set("15","p");
// hashTable.set("16","q");
// hashTable.set("17","r");
// hashTable.set("17","r");
// console.log(hashTable.itemCount)
// console.log(JSON.stringify(hashTable))
// console.log(hashTable.get("7"))
// console.log(hashTable.remove("2"))
// console.log(JSON.stringify(hashTable))



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

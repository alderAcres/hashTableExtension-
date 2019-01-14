/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/

function MyLinkedList(...args) {
  this.head = args.length > 0 ? new LLNode(args[0]) : null;
  this.tail = this.head || null;
  let index = 1;

  while (args[index] !== undefined) {
    
    let node = new LLNode(args[index]);

    if (index === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.back = this.tail;
      this.tail = node;
    }
    index++;
  }
}

MyLinkedList.prototype.push = function(value) {
  let node = new LLNode(value);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    node.back = this.tail;
    this.tail = node;
  }
};

// returns true if value is present in the list
MyLinkedList.prototype.containsKey = function(key) {
  let current = this.head;
  
  do {
    // console.log("key is " + key + " and the object's key is " + (current.value)[key])
    if (Object.keys(current.value)[0] === key) {
      return true;
    }
    current = current.next;
  } 
  while (current);
  return false;
};

function LLNode(value) {
  this.value = value;
  this.next = null;
  this.back = null;
}

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
}
// linked list of objects
// key will be the original key, value will be the value.
// set will go to the hashed index and check if there is already a linked list there.
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
  let hashIndex = hashCode(key, this.SIZE);
  if (this.storage[hashIndex] !== undefined) {
    if (!this.storage[hashIndex].containsKey(key)) this.storage[hashIndex].push({key});
    //else do nothing instead of overwrite
  } else {
    this.storage[hashIndex] = new MyLinkedList();
    this.storage[hashIndex].push({key, value});
  }
};
// linked list of objects
// key will be the original key, value will be the value.
// get will use hash to get to the hashed index and iterate through and check if each key is equal to the key we will we are looking for, and return that value
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
  let hashIndex = hashCode(key, this.SIZE);
  let current = this.storage[hashIndex].head;
  while (current) {
    if (Object.keys(current.value)[0] === key) return current.value[key];
    current = current.next;
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
  let hashIndex = hashCode(key, this.SIZE);
  if (this.storage[hashIndex] !== undefined && this.storage[hashIndex].containsKey(key)) {
    let current = this.storage[hashIndex].head;
    while (current) {
      if (Object.keys(current.value)[0] === key) {
        current.back.next = current.next;
        current.next.back = current.back;
      }
      current = current.next;
    }
  }
  return undefined;
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

// let ht = new HashTable;

// ht.set("hello", 5);
// console.log(ht);
// ht.set("hello", 5);
// console.log(ht.storage[2]);
// Do not remove!!
module.exports = HashTable;

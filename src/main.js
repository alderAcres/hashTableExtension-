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

// Create a linked list constructor function to utilize when collisions occur
function LinkedList(){
  this.head = null;
  this.tail = null;
}

// Create a constructor function for new nodes
function Node(value, key){
  this.value = value;
  this.key = key;
  this.next = null;
}

// adds to the tail of the linked lists
LinkedList.prototype.add = function(value, key){
  // create a new node
  let newNode = new Node(value, key);
  // is the linked list is empty, make new node the head and tail
  if (!this.head){
    this.head = newNode;
    this.tail = newNode;
  }
  // otherwise, add to the tail of the list
  if (this.tail !== null){
    this.tail.next = newNode;
    this.tail = newNode;
  }
}

// finds a given node along a linked list
LinkedList.prototype.find = function(key){
  // initialize our search at the head
  let currentNode = this.head;
  // declare a variable to keep track of the previous node
  let previousNode = undefined;
  // while our node exists, iterate through the linked list
  while (currentNode !== null){
    // if we find a match, return an array with the previous node and the current node we are looking for
    if (currentNode.key === key){
      return [previousNode, currentNode];
    }
    // otherwise move on to the next node
    previousNode = currentNode;
    currentNode = currentNode.next;
  }
  return null;
}

// Tests instantiation of a linkedlist and adding to an empty/non-empty linked list
// const test = new LinkedList();
// test.add(5,0);
// test.add(6,1);
// test.add(7,2);
// console.log(test.find());

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
  // create the variable hashed which will be the index where the new key,value pair is stored
  let hashed = hashCode(key, this.SIZE);
  // if something is already stored in that index, then we've already instantiated a linked list. So simply add to the linked list
  if (this.storage[hashed]){
    this.storage[hashed].add(value, key);
    // otherwise instantiate a new linked list, and add to it
  } else{
      this.storage[hashed] = new LinkedList();
      this.storage[hashed].add(value, key);
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
  // create the variable hashed which will be the index where the new key,value pair is stored
  let hashed = hashCode(key, this.SIZE);
  // if something is already stored in that index, then we've already instantiated a linked list. So simply search through the linked list
  if (this.storage[hashed]){
    // used the ll method "find" created above to traverse the linked list
    return this.storage[hashed].find(key)[1].value;
  } else {
      // if we don't find it, return this statement;
      return undefined;
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
  // create the variable hashed which will be the index where the new key,value pair is stored
  let hashed = hashCode(key, this.SIZE);
  // if something is already stored in that index, then we've already instantiated a linked list. So simply search through the linked list
  if (this.storage[hashed]){
    // set a variable equal to the return value of the linked list method find on the key argument
    const nodesToChange = this.storage[hashed].find(key);
    // if this.find(key) returns null then we don't have the key argument in our hash table
    if (nodesToChange === null) {
      return undefined;
    };
    if (nodesToChange[0] === undefined && nodesToChange[1].next !== null){
      this.storage[hashed].head = nodesToChange[1].next;
      nodesToChange[1].next = null;
      return nodesToChange[1].value;
    }
    if (nodesToChange[0] === undefined && nodesToChange[1].next === null){
      this.storage[hashed].head = null;
      this.storage[hashed].tail = null;
      return nodesToChange[1].value;
    }
    // otherwise, nodesToChange is an array in the format [previousNode, currentNode], and we want to remove currentNode
    const removedNode = nodesToChange[1];
    nodesToChange[0].next = nodesToChange[1].next;
    return removedNode;
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

// test set and get methods
// const hashTable = new HashTable();
// hashTable.set("hello", 5)
// hashTable.set("jello", 6)
// console.log(hashTable.get("hello")); // shoudl return 5
// console.log(hashTable.get("mellow")); // should return undefined

// test remove method
const hashTable = new HashTable();
hashTable.set("hello", 5)
hashTable.set("jello", 6)
console.log(hashTable.remove("hello")); // shoudl return node with hello
console.log(hashTable.get("hello")); // should return undefined

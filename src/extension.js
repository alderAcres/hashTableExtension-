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
function Node(val) {
  this.value = val;
  this.next = null;
}

function LinkedList() {
  this.head = null;
  this.tail = null;
}

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
HashTable.prototype.set = function (key, value) {
  // declare variable index, result of hashing key
  const index = hashCode(key, this.SIZE); //?
  // if that index is undefined ->
  const newNode = new Node({}); 
  newNode.value[key] = value;
  if (!this.storage[index]) {
    // new node with the key:val pair as the val
    // new linked list with the new node as the head and tail
    const linkedList = new LinkedList(); //?
    linkedList.head = newNode; //?
    linkedList.tail = newNode;
    this.storage[index] = linkedList;
  } else {
    // if the index exists --traverse linked list
    let nodePointer = this.storage[index].head;
    while (nodePointer) {
      // check if key has previously been logged
      // if yes, replace
      if (nodePointer.value[key]) nodePointer.value[key] = value;
      // if no, insert node after tail and reassign tail
      else if (nodePointer.next === null) nodePointer.next = newNode;
      nodePointer = nodePointer.next;
    }
  }
  
  // SIZE CHECK UPDATE
  // declare counter
  let counter = 0;
  // loop thru storage array and increment counter if not undefined
  for (let i = 0; i < this.storage.SIZE; i++) {
    if (this.storage[i]) counter++
  }
  // if counter / size > 75%, double SIZE property
  // loop thru storage array again and rehash if not undefined
  if (counter / this.storage.SIZE > 0.75) {
    this.storage.SIZE *= 2;
    for (let i = 0; i < this.storage.SIZE; i++) {
      if (this.storage[i]) {
        let newIndex = hashCode(key, this.SIZE); //?
        Object.assign(this.storage[newIndex], this.storage[i]);
        delete this.storage[i];
      }
    }  
  }
  // return the hashtable
  return this;
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
HashTable.prototype.get = function (key) {
  // declare variable index, result of hashing key
  const index = hashCode(key, this.SIZE); //?
  // if index is undefined, return undefined
  if (!this.storage[index]) return undefined;
  // traverse linked list
  let nodePointer = this.storage[index].head; //?
  while (nodePointer) {
    if (nodePointer.value[key]) return nodePointer.value[key];
    nodePointer = nodePointer.next;
  }
  return undefined;
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  // declare variable index, result of hashing key
  const index = hashCode(key, this.SIZE);
  // if index is undefined, return undefined
  if (!this.storage[index]) return undefined;
  // declare prevPointer and currPointer
  let prevPointer = null;
  let currentPointer = this.storage[index].head;
  // declare variable to store value of the node (if found)
  let removed;
  // traverse linked list
  while (currentPointer) {
    // if key is a property of the value
    if (currentPointer.value[key]) {
      // reassign variable to node value
      removed = currentPointer.value;
      // if this is the only node in the list
      if (
        this.storage[index].head === currentPointer &&
        this.storage[index].tail === currentPointer
      ) {
        this.storage[index].head = null;
        this.storage[index].tail = null;
      } else if (this.storage[index].head === currentPointer) {
        // if node is the head of list
        this.storage[index].head = currentPointer.next;
      } else if (this.storage[index].tail === currentPointer) {
        // if node is tail of list
        this.storage[index].tail = prevPointer;
      } else {
        // prevPointer -> currPointer.next
        prevPointer.next = currentPointer.next;
      }
      // currPointer set to null
      currentPointer.value = null;
    }
    prevPointer = currentPointer;
    currentPointer = currentPointer.next;
  }
  // return node value
  return removed;
};

// Do not modify


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

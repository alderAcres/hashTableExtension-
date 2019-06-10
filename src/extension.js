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
  this.storage = new Array(this.SIZE);
  this.total = 0;
}

// create a node class that will be added to the hash table
function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}

HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);
  let counter = 0;

  // check if curNode, exists. If not, add a new node and return;
  if (!this.storage[index]) {
    this.storage[index] = new Node(key, value);
    this.total += 1;
    return this.total;
  }

  // declare a curNode variable
  let curNode = this.storage[index];

  // use a while loop to go through the linked list
  while (curNode) {
    // every time it hits a new node, increment counter
    counter += 1;

    if (curNode.key === key) {
      curNode.value = value;
      return this.total;
    }
    if (!curNode.next) break;
    curNode = curNode.next;
  }

  // check whether if adding the new item will push the number of stored items to over 75% of this.SIZE
  const limit = this.SIZE * 0.75;
  if (counter + 1 > limit) {
    // declare an obj to store all key-value pairs
    let storageObj = {};

    // add the originally passed in key value pair so that when we rehash the table, this is also included
    storageObj[key] = value;

    // retrieve all nodes' key value pair by iterating through this.storage
    for (let i = 0; i < this.SIZE; i += 1) {
      // if node exists in storage[i]
      if (this.storage[i]) {
        let retrieveNode = this.storage[i];

        // iterate through linked list and save key-value pair to storageObj
        while (retrieveNode) {
          storageObj[retrieveNode.key] = retrieveNode.value;

          // if retrieveNode is tail node, break
          if (!retrieveNode.next) break;

          // increment retriveNode
          retrieveNode = retrieveNode.next;
        }

        // after saving all key-value pairs in the bucket, delete it
        delete this.storage[i];
      }

      // resize SIZE
      this.size = this.size * 2;

      // reassign key-value pairs
      for (let key in storageObj) {
        this.set(key, storageObj[key]);
      }
    }

    // increment total then return
    this.total += 1;
    return this.total;
  }

  // if it doesnt resize, create a new node and put it in the tail
  curNode.next = new Node(key, value);

  // increment this.total then return
  this.total += 1;
  return this.total;
};

HashTable.prototype.get = function(key) {
  // retrieves a value stored in the hash with given key

  // first, hash the key to find the index
  const index = hashCode(key, this.SIZE);

  // goto storage.contents[index] to check whether key exists
  // if bucket is empty, return 'Key not found'
  if (!this.storage[index]) return 'Key not found';

  // traverse through the linked list using a while loop
  // while(curNode) check to see if curNode.key === key
  let curNode = this.storage[index];
  while (curNode) {
    // if so, return curNode.value
    if (curNode.key === key) return curNode.value;
    // if curNode.next is null, return 'Key not found'

    if (curNode.next === null) return 'Key not found';

    // increment curNode to curNode.next
    curNode = curNode.next;
  }

  // if for whatever reason, we reach to this point
  // return 'Key not found'
  return 'Key not found';
};

HashTable.prototype.remove = function(key) {
  // run the hashcode on key and find index
  const index = hashCode(key, this.SIZE);
  let removedVal;

  // if !storage[index], return undefined
  if (!this.storage[index]) return undefined;

  let curNode = this.storage[index];

  // if head node's key is equal to given key
  if (curNode.key === key) {
    removedVal = curNode.value;
    // if so, remove head node and return value of the removed node
    this.storage[index] = curNode.next;
    return removedVal;
  }

  // traverse through linked list to find node with given key
  while (curNode) {
    // unlike get and set, we compare key with curNode.next.value
    // if key === curNode.next.key,
    if (curNode.next.key === key) {
      removedVal = curNode.next.value;

      // if curNode.next.next is null, curNode.next is null. It's the tail node. return the deleted value.
      if (!curNode.next.next) {
        curNode.next = null;
        return removedVal;
      }

      // if curNode.next.next is not null, point curNode to curNode.next.next. Then return the deleted value.
      curNode.next = curNode.next.next;
      return removedVal;
    }

    curNode = curNode.next;
  }

  // after traversing the linked list, if key is not found, return undefined;
  return undefined;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

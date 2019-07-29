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
  this.storage.size = 0;
}

function Node(value) {
  this.value = value;
  this.head = null;
  this.tail = null;
  this.back = null;
  this.next = null;
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
  let hashIndex = hashCode(value, this.SIZE); //generated location from hashing function 
  if (this.storage[hashIndex] === 'undefined') {
    this.storage[hashIndex] = value;
    this.storage.size = 1; // no collision case
  } else {
    let newNode = new Node(value); 
    // in case of collisions, create linkedlist at the given location
    // reassigning node values; make nodes and connect them and reassign props
    
    //checking how to assign head property for our new Node
    if (this.storage[hashIndex - 1] === 'undefined') {
      newNode.head = true;
    } else {
      newNode.head = null;
    };

    //checking how to assign tail property for our new Node
    if (this.storage[hashIndex + 1] === 'undefined') {
      newNode.tail = true;
    } else {
      newNode.tail = null;
    }

    //checking how to assign head property for our new Node
    if (newNode.tail === true) {
      newNode.next = null;
    } else {
      newNode.next = [hashIndex + 1];
    }
    // needs to refer to stuff before and after the place we're setting the node at
    newNode.tail = this.storage[this.storage.size]; //
    this.storage.size += 1;
  }
  return this.storage.size;
};

const run = HashTable.prototype.set();
run(2, 3)

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
  let hashIndex = hashCode(key, this.SIZE) //nothing there
  let lookingFor = key;
  if (this.storage[key] === null) {
    return 'empty';
  } else if (this.storage[key].length === 1) { //one value at the given index
    return this.storage[key];
  } else { //more than one value at the given index, only return head
    return this.storage.key[head];
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
  if (this.storage[key] === 'undefined') {
    return 'undefined';
  } 
  if (this.storage.key.head === true) {
    this.storage[key -1].head === true && this.storage[key].head === false; //reassinging head in case the deleted node was the head
  } 
  if (this.storage.key.tail === true) {
    this.storage[key +1].tail === true && this.storage[key].tail === false;//reassinging tail in case the deleted node was the tail
  } 
  if (true) {
    let before = this.storage.key.back; //nodes before and after current node. 
    let after = this.storage.key.next; //connect these using back and next.
    
    //connect the nodes before and after the node we're deleting
    before.next = after; 
    after.back = before;

    delete this.storage.key;
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

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
HashTable.prototype.set = function(key, value) {
  let index = hashCode(key, this.SIZE);

  if (!this.storage[index]) this.storage[index] = new LinkedList();
  this.storage[index].push({[key]: value});
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
  let index = hashCode(key, this.SIZE);

  let currentNode = this.storage[index].head;

  if(!currentNode) return 'No nodes found, did you set up your List structure correctly?'
  if (Object.keys(currentNode.value).includes(key)) return currentNode.value[key];

  while (currentNode.next !== null){
    currentNode = currentNode.next;
    if (Object.keys(currentNode.value).includes(key)) return currentNode.value[key];
  }

  return 'No match among the Linked List!! Did you forget to check your spelling, Benji..?'
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
  let index = hashCode(key,16);

  if (!this.storage[index])
    return;

  let currentNode = this.storage[index].head;

  if(!currentNode) return;

  if (Object.keys(currentNode.value).includes(key)){
    currentNode.next = this.storage[index].head;
    return currentNode.value[key];
  }
  
  let nextNode = currentNode.next;

  if (Object.keys(nextNode.value).includes(key)){
    currentNode.next = nextNode.next;

    if(this.storage[index].head == nextNode)
      this.storage[index].head == currentNode;

    return nextNode.value[key];
  }

  while (nextNode !== null){
    currentNode = nextNode;
    nextNode = currentNode.next;

    if (Object.keys(nextNode.value).includes(key)){
      currentNode.next = nextNode.next;

      if(this.storage[index].head == nextNode)
        this.storage[index].head == currentNode;
  
      return nextNode.value[key];
    };
  }

  return;
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

//Building out a quick LinkedList class to use to make retreiving from Get easier!

class LinkedList{
  constructor(){
    this.head = null;
    this.tail = null;
  }

  push(value){
    let newNode = new Noodle(value);

    if (this.head == null){
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
}

class Noodle{
  constructor(value){
    this.value = value;
    this.next = null;
  }
}
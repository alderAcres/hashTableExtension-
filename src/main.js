/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/

// helper functions
function HashTable() {
  this.SIZE = 16;

  this.storage = new Array(this.SIZE);
}

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(key,value) {
  this.key = key
  this.value = value;
  this.next = null;
}

LinkedList.prototype.push = function(node) {
  if(this.tail) {
    this.tail.next = node;
    this.tail = node;
  }
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
  let newNode = new Node (key, value);
  let index = hashCode(key, this.SIZE);
  // instantiate new linkedlist if empty
  if (this.storage[index] === undefined) {
    let list = new LinkedList;
    this.storage[index] = list;
    list.head = newNode
    list.tail = newNode;
  }
  else {
    // push element
    this.storage[index].push(newNode)
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
  let index = hashCode(key, this.SIZE)

  // traverse linkdlist
  if(this.storage[index]){
     let current = this.storage[index].head;
     if(current.key === key){
       return current.value
     } else {
       current = current.next
     }
   } else {
     return undefined
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
  let index = hashCode(key, this.SIZE)
  // remove node given a key
  if(this.storage[index]){
    let current = this.storage[index].head;

    if(current.key === key && current.next !== null){
      console.log(current.key)
      current = current.next;
      current.head = current;
      console.log(current.head)
      }

    if (current.key === key && current.next === null){
      console.log('removed', current.key )
      this.storage[index] = undefined;
      console.log('no more linkedlist')
    }
    else {
      let prev;

      while (current != null && current.key != key) {
          prev = current;
          current = current.next;
      }
        console.log('removed:', current.key)
        prev.next = current.next;
      }
    } else {
       return undefined
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

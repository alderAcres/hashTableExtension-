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
  this.SIZE = 2;
  
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
  let pointer = hashCode(key, this.SIZE);
  const totalPointers = Object.keys(this.storage);
  if (totalPointers.length > (this.SIZE * 0.75)){
    this.storage = this.storage(this.SIZE * 2);
  }


  // if (!this.storage[pointer]){
  //     this.storage[pointer] = new LinkedList();
  // }
  // this.storage[pointer].push(key, value);
  return this.storage;
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
  let address = hashCode(key, this.SIZE);
  //set curr to be the LL.head
  let curr = this.storage[address].head;
  if (!curr) return false;
  while (curr){
    if (curr.key === key){
      return curr.value;
    }
    curr = curr.next;
  }
  return false;
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
  let address = hashCode(key, this.SIZE);
  let curr = this.storage[address].head;
  let prev; 
  while (curr) {
    if (curr.key === key){
      prev.next = curr.next;
    }
    prev = curr;
    curr = curr.next;
  }
  return false;
};

function LinkedList (){
  this.head = null;
  this.tail = null;
}

function Node(value) {
  this.value = value;
  this.next = null;
}

LinkedList.prototype.push = function (key, value) {
  const newNode = new Node(key, value);
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
    return;
  }
  this.tail.next = newNode;
  this.tail = newNode;
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

let HT = new HashTable();
HT.set('boom', 1);
HT.set('ldks', 2);
HT.set('cat', 3);
// HT.get('cat');
// HT.remove('boom')

console.log(HT);

// Do not remove!!
module.exports = HashTable;

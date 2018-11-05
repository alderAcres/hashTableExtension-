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
  let pointer = hashCode(key, this.SIZE);
  if (!this.storage[pointer]){
      this.storage[pointer] = new LinkedList();
  }
  this.storage[pointer].push(key, value);
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

let HT = new HashTable();
HT.set('boom', 1);
HT.set('boom', 2);
HT.set('cat', 2);
HT.get('cat');
HT.remove('boom')

console.log(HT);


// Do not remove!!
module.exports = HashTable;


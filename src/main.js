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
function LinkedList () {
  this.head = null;
  this.tail = null;
}

function Node (value) {
  this.value = value;
  this.next = null;
}

LinkedList.prototype.add = function add (value, index) {
  debugger;
  const newNode = new Node(value);
  
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
    return;
  }
  let currentNode = this.head;
  let counter = 0;
  let hold;
  while (currentNode) {
    if (currentNode.next === null && index === undefined) {
      currentNode.next = newNode;
      this.tail = newNode;
      return;
    }
    if (counter + 1 === index) {
      hold = currentNode
    }
    if (counter === index) {
      hold.next = newNode;
      newNode.next = currentNode.next;
      return;
    }
    currentNode = currentNode.next;
    counter += 1;
  }
};

LinkedList.prototype.remove = function remove (key) {
  // loop through list

  // find value

  //reconnect nodes
  
};

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
HashTable.prototype.set = function set(key, value) {
  // object method attempt
  const result = hashCode(key, this.SIZE);
  if (this.storage[result] === undefined) this.storage[result] = {};
  this.storage[result][key] = value;
  return Object.keys(this.storage[result]).length;

  // linked list attempt
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
HashTable.prototype.get = function get(key) {
  const result = hashCode(key, this.SIZE);
  return this.storage[result][key];
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
  const result = hashCode(key, this.SIZE);
  const hold = this.storage[result][key];
  delete this.storage[result][key];
  return hold;
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


const hash = new HashTable();

console.log(hash);
console.log(hash.set('key', 'value'));
console.log(hash.set('key2', 'value value two'));
console.log(hash.set('key1', 'value three'));
console.log(hash);
console.log(hash.get('key'));

const ll = new LinkedList();
ll.add(2);
ll.add(3);
ll.add(5);
console.log(ll)
// Do not remove!!
module.exports = HashTable;

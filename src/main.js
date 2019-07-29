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
  this.keysUsed = {};

  this.numItems = 0;
}

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(key, value) {
  this.key = key
  this.value = value;
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
  let hashVal = hashCode(key, this.SIZE);
  let newNode = new Node(key, value);

  if (this.storage[hashVal] === undefined) {

    this.storage[hashVal] = new LinkedList();
    this.storage[hashVal].head = newNode;
    this.storage[hashVal].tail = newNode
    this.keysUsed[key] = 1;

    this.numItems++;

  } 
  else if (this.storage[hashVal] !== undefined && this.keysUsed[key] !== undefined) {
    
    if (this.storage[hashVal].head.next === null) {
      this.storage[hashVal].head.value = value;
    } else {
      let temp = this.storage[hashVal].head;
      while (temp.next.key !== key) {
        temp.next;
      }
      temp.next.value = value;
    }
    
  } 
  else {
    this.keysUsed[key] = 1;
    this.storage[hashVal].tail.next = newNode;
    this.storage[hashVal].tail = newNode;

    this.numItems++;
    
  }

  return this.numItems;
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
  let hashVal = hashCode(key, this.SIZE);

  if (this.keysUsed[key] === undefined) {
    return undefined;
  }
  else {
    let temp = this.storage[hashVal].head
    while (temp.key !== key) {
      temp = temp.next
    }
    return temp.value;
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
  
  let hashVal = hashCode(key, this.SIZE);

  if (this.keysUsed[key] === undefined) {
    return undefined;
  }
  else {
    this.numItems--;
    delete this.keysUsed[key];
    if (this.storage[hashVal].head.next === null) {
      let nodeVal = this.storage[hashVal].head.value;
      this.storage[hashVal] = undefined;
      return nodeVal;
    }

    let temp = this.storage[hashVal].head;
    while (temp.next.key !== key) {
      temp = temp.next;
    }
    if (temp.next === this.storage[hashVal].tail) {
      let nodeVal = this.storage[hashVal].tail.value;
      this.storage[hashVal].tail = temp;

    } 
    else {
      let nodeVal = temp.next.value;
      temp.next = temp.next.next;
      return nodeVal;
    }


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



let table = new HashTable();
table.set("a", 3);
table.set('b', 5);
table.set("c", 234);
console.log(table.get("a"));
table.set("a", 6);
console.log(table.get("a"));
table.remove("a");
console.log(table.get("a"));
table.set("abc", 6);
table.set("bca", 8);
console.log(table.get("abc"));
console.log(table.get("bca"));



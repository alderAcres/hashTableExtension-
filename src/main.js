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
  // LinkedList.find the key
  // if found, just update it
  // else, just LinkedList.add a new node
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
  // LinkedList.find the key
  // If found, return the value
  // else return undefined
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

};

// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

// Linked List class
function LinkedList() {
  this.head = null;
  this.tail = null;
}
// Node class
function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}
// Linked List Methods
// Add
LinkedList.prototype.add = function (key, value) {
  // create a newNode w/ key, value
  const newNode = new Node(key, value);
  // if this.head is null, assign head and tail to be newNode
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    // else...
    // assign this.tail's next to be newNode
    this.tail.next = newNode;
    // update this.tail to be newNode
    this.tail = newNode;
  }
};
// Find
LinkedList.prototype.find = function (key, currentNode = this.head) {
  // starting with head, check...
  // if currentNode is null, return undefined
  if (currentNode === null) return undefined;
  // if currentNode contains key, return currentNode
  if (currentNode.key === key) return currentNode;
  // else recursively call find on currentNode's next
  LinkedList.prototype.find(key, currentNode.next);
};
// Remove
LinkedList.prototype.remove = function (key, previousNode = null, currentNode = this.head) {
  // starting with head, check...
  // if currentNode is null, return undefined
  if (currentNode === null) return undefined;
  // if currentNode contains key and is the head, reassign head to be the next node
  // else if currentNode contains key, point prevNode's next at currentNode's next
  // why is this.tail undefined after the first recursive call?
  console.log(this.tail);
  if (currentNode.key === key) {
    (currentNode === this.head) ? this.head = currentNode.next : previousNode.next = currentNode.next;
    // if currentNode contains key and is the tail, reassign tail to be prevNode
    // console.log(currentNode);
    if (currentNode === this.tail) {
      console.log('test');
      this.tail = previousNode;
    }
  } else {
    // else recursively call remove on currentNode's next
    LinkedList.prototype.remove(key, currentNode, currentNode.next);
  }
};

/*
Edge cases:
not found
found in LL with one node
found in head vs body/tail
if found in tail, must reassign tail
*/

const myLL = new LinkedList();
myLL.add('a', 0);
myLL;
const foundNode = myLL.find('a');
foundNode;
myLL;
myLL.add('b', 1);
myLL.add('c', 2);
myLL;
myLL.remove('c');
console.log(myLL);

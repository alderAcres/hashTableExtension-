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

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(value) {
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
 * @param {string} key - key to be used to create hashed address - done
 * @param {string|number|boolean} value - value to be stored in hash table - done
 * @return {number} The new number of items stored in the hash table - partial
 */
LinkedList.prototype.push = function(value) {
  //if there are no nodes
  let newNode = new Node(value); //create new node
  if (this.head === null && this.tail === null) {
    //if linkedlist is empty
    this.head = newNode;
    this.tail = newNode;
  } else {
    //if node already present
    let previousNode = this.tail;
    previousNode.next = newNode; //newNode.next is already null
    this.tail = newNode;
  }
};
HashTable.prototype.set = function(key, value) {
  //new hashtable already created array at this.storage
  //key = result from hash function
  if (this.storage[key]) {
    // push new node to the same key
    const newLL = new LinkedList();
    newLL.push(this.storage[key]); //push single value that previously occupied this index
    newLL.push(value); //push new value aka newNode
  } else {
    this.storage[key] = value;
  }
  //calculate number of items
  let linkedlistCount = 0;
  for (let i = 0; i < this.SIZE; i++) {
    //iterate through each hash index
    if (typeof this.storage[key] === LinkedList) {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
        linkedlistCount++;
      }
    } else if (this.storage[key] !== null) {
      //only one val at index
      console.log("entered");
      linkedlistCount++;
    } else if (this.storage[key] === undefined) {
      console.log("entered2");
      linkedlistCount + 0;
    }
  }
  return linkedlistCount;
};

/**
 * get - Retrieves a value stored in the hash table with a specified key
 *
 * - If more than one value is stored at the key's hashed address, then you must retrieve
 *   the correct value that was originally stored with the provided key
 *
 * @param {string} key - key to lookup in hash table - done
 * @return {string|number|boolean} The value stored with the specifed key in the - partial
 * hash table
 */
HashTable.prototype.get = function(key) {
  return this.storage[key]; //use if there is only one value stored at hashed address
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {};

// Do not modify
function hashCode(string, size) {
  "use strict";

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size; //return location to be stored
}

const newTable = new HashTable();
const apple = hashCode("apple", newTable.SIZE);
const pear = hashCode("pear", newTable.SIZE);
const kiwi = hashCode("kiwi", newTable.SIZE);

newTable.set(apple, "apple"); //why can't you use this.SIZE?
newTable.set(pear, "pear");
newTable.set(kiwi, "kiwi");
console.log(newTable);
console.log(newTable.get(kiwi));

// Do not remove!!
module.exports = HashTable;

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

function LinkedList (node){
  this.head = node;
  this.tail = null;
  this.length = 0

}

function Node (key, val){
  this.key = key;
  this.value = val;
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
    // generate index from hash function
    const currIndex = hashCode(key, this.SIZE);

    // use index to access the appropriate array index
    const location = this.storage[currIndex];

    // check for collision
    const node = new Node(key, value);
  //  console.log('node', node.value);
    const linkedList = new LinkedList(node);
  //  console.log('linkedList', linkedList.head);

    // if collision exists add value to end of linked list

    if (location === undefined){
      this.storage[currIndex] = linkedList;
      linkedList.length++
    } else {
      let currNode = location.head;
      while (currNode.next !== null){
        if (currNode.key === key){
          // currNode.value = value;
          break;
        }
        currNode = currNode.next;
      }
      // add values to linked at appropriate index

      if (currNode.key === key){
        currNode.value = value;
      } else {
        console.log("collision", this.storage);
        console.log(node);
        currNode.next = node
        location.length++
        console.log('list length', location.length);
      }

    }
    //console.log(this.storage[currIndex].head);
    let itemCount = 0
    for (let i=0; i < this.storage.length; i++){
      if (this.storage[i] !== undefined){
        itemCount = itemCount + this.storage[i].length
      }
    }
    return itemCount;
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
  // get index of key using hash function
  const currIndex = hashCode(key, this.SIZE);
  console.log('currIndex', currIndex);

  // check if there's a value at that index
  const location = this.storage[currIndex];

  if (location === undefined){
    return;
  }
  let currNode = location.head;
  while (currNode !== null){
    if (currNode.key === key){
      return currNode.value;
    }
    currNode = currNode.next;
  }
  // check for key in linkedList


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

const hashTable = new HashTable();
hashTable.set('1', 1);
hashTable.set('2', 2);
console.log(hashTable.set('3', 3));
// hashTable.set('4', 4);
// hashTable.set('5', 5);
// hashTable.set('6', 6);
// hashTable.set('7', 7);
// hashTable.set('8', 8);
// hashTable.set('9', 9);
// hashTable.set('10', 10);
// hashTable.set('11', 12);
// hashTable.set('13', 13);
// hashTable.set('14', 14);
// hashTable.set('15', 15);
// hashTable.set('16', 16);
// console.log(hashTable.set('17', 17));
// console.log(hashTable.set('2', 22));
// console.log(hashTable.set('2', 22));
// console.log(hashTable.set('2', 22));
console.log(hashTable.get('2'));
console.log(hashTable.get('3'));
console.log(hashTable.get('1'));
// Do not remove!!
module.exports = HashTable;

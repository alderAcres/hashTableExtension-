/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.ITEMS = 0;
  
  this.storage = new Array(this.SIZE);
}

//LinkedList will be used to handle collisions;
function LinkedList(){
  this.head = null;
  this.tail = null;
}

function Node(key, value){
  this.value = value;
  this.key = key
  this.next = null
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

  //Handle collisions by implementing new LinkedList
  if(this.storage[index] === undefined){

    let newList = new LinkedList();
    let newNode = new Node(key, value);

    newList.head = newList.tail = newNode;
    

    this.storage[index] = newList;
    this.ITEMS++;
    return this.ITEMS;

  }
  else {

    let currNode = this.storage[index].head;
    let lastNode = this.storage[index].tail;
    let newNode = new Node(value);

    //If list has one item, reassign tail and add node as value to head.next
    if( currNode === lastNode){
      currNode.next = newNode;
      lastNode = newNode;
      this.ITEMS++;
      return this.ITEMS;
    } else {
      
      //Loop through list till we find
      while( currentNode.next !== null) {
        currNode = currNode.next;
      }

      currentNode.next = lastNode = newNode;
      this.ITEMS++;
      return this.ITEMS;
    }
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

  let index = hashCode(key, this.SIZE);
  let head = this.storage[index].head;

  // Return value if there is only one node in List
  if(head.next === null){
    return head.value;
  }

  else{

    let currNode = head.next;
    debugger;
    //Loop until we find Node with correct key in List
    while( currNode.key !== key ){
      currNode = currNode.next
    }

    return currNode.value;
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

  let index = hashCode(key, this.SIZE);

  if(!index){
    return undefined;
  }

  let list = this.storage[index];

  let target = list.get(key);

  

};

/**
* find - retrieve the target node and its previous node and 
*
* - If the key does not exist, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {INT|INT|object} 
*/

HashTable.prototype.find = function(key){

  let index = hashCode(key, this.SIZE);
  let list = this.storage[index];
  let head = list.head;
  let position = 0

  if( head.next === null ){
    return {
      index,
      position,
      head
  }

  else {

    while

  }

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



let table = new HashTable();

table.set("Aaron@gmail.com", "password123");

table.set("Aaron1@gmail.com", "123456");
table.set("Aaron1@gmail.com", "123456");
table.set("Aaron2@gmail.com", "123456");
table.set("Aaron3@gmail.com", "123456");

table.get("Aaron1@gmail.com");

console.log(table);
console.log(table.ITEMS);
debugger;

// Do not remove!!
module.exports = {
  HashTable,
  LinkedList,
  Node,
}


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
  this.items = 0
}

function LinkedList() {
  this.head = null
  this.tail = null
  this.items = 0
}

function Node(key, val) {
  this.key = key
  this.value = val
  this.next = null
}

LinkedList.prototype.push = function(key, val) {
  const newNode = new Node(key, val)
  if (this.head === null) {
    this.head = newNode
    this.tail = this.head
  } else {
    this.tail.next = newNode
    this.tail = newNode
  }
  this.items += 1
}


HashTable.prototype.reHash = function () {
  this.SIZE *= 2
  console.log(this.SIZE)
  const tempList = new HashTable
  tempList.SIZE = this.SIZE
  tempList.storage = new Array(this.SIZE)

  for (const val of this.storage) {
    if (val) {
      let pointer = val.head
      while (pointer) {
        console.log(pointer)
        tempList.set(pointer.key)
        pointer = pointer.next
      }
    }
  }

  // RAN OUT OF TIME HERE :( I WAS GOING TO TRY TO SET THIS to TEMPLIST!
  console.log(tempList)
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
  const hashedVal = hashCode(key, this.SIZE)
  if (this.storage[hashedVal] === undefined) {
    this.storage[hashedVal] = new LinkedList()
    this.storage[hashedVal].push(key, value)
  } else {
    this.storage[hashedVal].push(key, value)
  }
  this.items += 1
  if (this.items / this.SIZE >= 0.75) {
    this.reHash()
  }
  return this.items
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
  if (!this.storage[hashCode(key, this.SIZE)]) return undefined
  let listLocation = this.storage[hashCode(key, this.SIZE)].head

  while (listLocation) {
    if (listLocation.key === key) return listLocation.value
    else {
      listLocation = listLocation.next
    }
  }
  return undefined
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
  if (!this.storage[hashCode(key, this.SIZE)]) return undefined
  let list = this.storage[hashCode(key, this.SIZE)]
  let currentNode = this.storage[hashCode(key, this.SIZE)].head
  let returnVal = undefined


  // if only one item, clear linked list
  if (currentNode.items === 1) {
    returnVal = this.head.value
    currentNode.items = 0
    currentNode.head === null
    currentNode.tail === null
    list.items -= 1
    return returnVal
  }

  // if head reset head
  if (currentNode.key === key) {
    returnVal = list.head.value
    list.head = list.head.next
    list.items -= 1
    return returnVal
  }


  while (currentNode.next.key !== key) {
    currentNode = currentNode.next
  }

  // if item to remove is tail, remove tail
  if (currentNode.next === list.tail && list.tail.key === key) {
    list.tail = currentNode
  }

  if (currentNode.next.key === key) {
    returnVal = currentNode.next.value
    currentNode.next = currentNode.next.next
    list.items -= 1
  }

  return returnVal
};


// const table = new HashTable()
// table.set('abc', 123)
// table.set('dec', 456)
// table.set('test', 789)
// table.set('test2', 789)
// table.set('test3', 789)
// table.set('test4', 789)
// table.set('test5', 789)
// table.set('test6', 789)
// table.set('test7', 789)
// table.set('test8', 789)
// table.set('test9', 789)
// table.set('test10', 789)
// table
//console.log(table.remove('dec'))
//console.log(table.storage[2])



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

// Do not remove!!
module.exports = HashTable;

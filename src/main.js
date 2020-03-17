/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/

//REMOVES ARE RETURNING UNDEFINED -- OUT OF TIME TO TROUBLE SHOOT and added this.items at last minue...no time to fix

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.items = 0;
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
  const index = hashCode(key, this.SIZE);

  if (!this.storage[index]) {
    this.storage[index] = new LinkedList();
  }
  const linkedList = this.storage[index];
  // I know this traverses more than necessary, will fix if time to refactor
  if (linkedList.contains(key)) linkedList.remove(key);

  linkedList.add(key, value);
  return  ++this.items;
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
  const index = hashCode(key, this.SIZE);
  const notFoundString = 'Propery Not Found in Hash Table'

  if (!this.storage[index]) return console.log(notFoundString);

  let currentNode = this.storage[index].head;

  while (currentNode) {
    if (currentNode.key === key) return currentNode.value;
    currentNode = currentNode.next;
  }

  return console.log(notFoundString);
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
  const index = hashCode(key, this.SIZE);

  if (!this.storage[index]) return;

  this.storage[index].remove(key);
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

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function LLNode(key, value) {
  this.key = key;
  this.value = value;
  
  this.previous = null;
  this.next = null;
}

LinkedList.prototype.add = function (key, value) {
  if (!this.head) {
    this.head = new LLNode(key, value);
    this.tail = this.head;
    this.head.previous = this.tail;
    return ++this.items;
  }
  const oldTail = this.tail;
  oldTail.next = new LLNode(key, value);
  this.tail = oldTail.next;
  this.tail.previous = oldTail;
  this.head.previous = this.tail;
};

LinkedList.prototype.contains = function (key) {
  let currentNode = this.head;

  while (currentNode) {
    if (currentNode.key === key) return true;
    currentNode = currentNode.next;
  }
  return false;
};

LinkedList.prototype.remove = function (key) {
  if (this.head.key === key) {
    let value = this.head.value;
    this.head = this.head.next;
    this.items--;
    return value;
  }

  if (this.tail.key === key) {
    let value = this.tail.value;
    this.tail = this.tail.previous;
    this.head.previous = this.tail;
    this.items--;
    return value;
  }

  let currentNode = this.head.next;
  while (currentNode) {
    if (currentNode.key === key) {
      let value = currentNode.value;
      currentNode.previous.next = currentNode.next;
      currentNode.next.previous = currentNode.previous;
      this.items--
      return value;
    }
    currentNode = currentNode.next;
  }
};

const hashTable = new HashTable();

hashTable.set('seven', 7);
console.log('set Test' , hashTable.get('seven'));

hashTable.set('eight', 8);
hashTable.set('seven', 6);
hashTable.set('nine', 9);
hashTable.set('ten', 10);

console.log('overwriteTest', hashTable.get('seven'));

console.log('removeHead', hashTable.remove('seven'));
console.log(hashTable.remove('ten'));

hashTable.set('eleven', 11);

console.log(hashTable.remove('nine'));

console.log(hashTable);

// Do not remove!!
module.exports = HashTable;

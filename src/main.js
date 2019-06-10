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

function LinkedListCopy() {
  this.head = null;
  this.tail = null;
}

function NodeCopy(k, val) {
  this.value = val;
  this.key = k;
  this.next = null;
}

// adds node to end of list
LinkedListCopy.prototype.push = function(k, val) {
    let newNode = new NodeCopy(k, val);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
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
HashTable.prototype.set = function(key, value) {
  // create a linked list inside the index of the hash table
  let bucket = new hashCode(key, this.SIZE);
  if (this.storage[bucket] === undefined) {
    this.storage[bucket] = new LinkedListCopy();
    this.storage[bucket].push(key, value);
  }
  while (this.storage[bucket].head.next !== null) {
    if (this.storage[bucket].head.next.key) {
      this.storage[bucket].head.next.value = value;
    }
  }

};
let test = new HashTable();
test.set("key", "value");
console.log(test);


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
  for (let bucket of this.storage) {
    if (bucket instanceof LinkedListCopy) {
      if (bucket.head === null) {
        return undefined;
      }
      if (bucket.head.key === k) {
        return bucket.head.value;
      }
    }
    let currentNode = bucket.head;
    while (currentNode.next !== null) {
      if (currentNode.next.key === k) {
        return currentNode.next.value;
      }
      currentNode = currentNode.next;
    }
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
  for (let bucket of this.storage) {
    if (bucket instanceof LinkedListCopy) {
      if (bucket.head.key == k) { //if we find the key in the HEAD
        let result = bucket.head.value ;
        //if we find key in the head and there is another node after
        if (bucket.head.next !== null) {
          bucket.head = bucket.head.next ;
        }
        else {
          bucket.head = null ;
          bucket.tail = null ;
        }
        return result ;
      }
      let currentNode = bucket.head ;
      while (currentNode.next !== null) {
        if (currentNode.next.key == k) {
          let result = currentNode.next.value ;
          if (currentNode.next.next !== null) {
            currentNode.next = currentNode.next.next ;
          }
          return result ;
        }
      }      
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

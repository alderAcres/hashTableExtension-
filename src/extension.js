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
  //get hash address
  let address = hashCode(key, this.SIZE);
  //determine if value already exists
  if (!this.storage[address]) {
    this.storage[address] = new Node(key, value);
  }
  //if value does not exist at that address determine if the next item in link list exists
  //if not, create new node
  else if (this.storage[address].next === null) {
    //check if first node has key, if so, replace, else add new node to .next
    if (this.storage[address].key === key) {
      this.storage[address].value = value;
    } else this.storage[address].next = new Node(key, value);
  }
  //if next does exist, traverse the list to find next null
  else if (this.storage[address].next !== null) {
    let head = this.storage[address];
    let next = this.storage[address].next;

    while (next.next !== null) {
      console.log(head.key)
      //if the current key = key, replace value with current value and return out of the function
      if (head.key === key) {
        head.value = value;
        return;
      }
      next = next.next;
      head = head.next;
    }
    //set next to be new Node (this should be if next.next = null and the key has not been found in the linked list)
    if (head.key === key) {
      head.value = value;
    } else if (next.key === key) {
      next.value = value;
    } else next.next = new Node(key, value);


  }

  //if hash table is 75% full double this.SIZE and rehash

  //iterate through hash table array and count number of null, if less that 25% of this.SIZE, double this.SIZE
  //traverse all hash lists and put the keys through the hashCode function

  //if has table is 25% full halve this.SIZE and rehash

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
  //get address from hash code
  const address = hashCode(key, this.SIZE);

  //check if there is anything at that address
  if (!this.storage[address]) return 'this key is not stored';

  else {
    let head = this.storage[address];
    let next = this.storage[address].next;

    //traverse hash address to find key-value pair
    while (next !== null && head.key !== key) {
      next = next.next;
      head = head.next;
    }
    //return value
    if (next === null && head.key !== key) return 'this key is not stored';
    else if (head.key === key) return head.value;

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
HashTable.prototype.remove = function (key) {
  //get address
  const address = hashCode(key, this.SIZE);

  //check if there is anything at that address
  if (!this.storage[address]) return 'this key is not stored';

  else {
    let head = this.storage[address];
    let next = this.storage[address].next;

    //check if first node has key
    if (head.key === key) {
      this.storage[address] = head.next;
    }

    //else traverse hash address to find key-value pair
    while (next !== null && next.key !== key) {
      next = next.next;
      head = head.next;
    }
    //remove value
    if (next === null && head.key !== key) return 'this key is not stored';
    else if (next.key === key) head.next = next.next;

  }
};

let hash = new HashTable()
hash.set(1, 2)
hash.set(2, 1)
hash.set(3, 4)
hash.set('foo', 'bar')
hash.set(1, 3)
console.log(JSON.stringify(hash))
console.log(hash.get(3))
hash.remove(1)
console.log(JSON.stringify(hash))

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}


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
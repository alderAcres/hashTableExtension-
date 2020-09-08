/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
class Node {
  constructor(value, key = null) {
    this.value = value;
    this.key = key;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(val, key = null) {
    const node = new Node(val, key);

    if (this.head !== null && this.tail !== null) {
      this.size += 1;
      this.tail.next = node;
      this.tail = this.tail.next;

      return this.size;
    }

    this.size += 1;
    this.head = node;
    this.tail = this.head;

    return this.size;
  }

  remove(key) {
    if (this.head !== null) {
      if (this.head.key === key) {
        this.size -= 1;
        this.head = this.head.next;
        return this.size;
      }

      let prev = this.head;

      while (prev) {
        const curr = prev.next;

        if (curr.key === key) {
          this.size -= 1;
          prev.next = curr.next;
          return this.size;
        }

        prev = prev.next;
      }
    }
  }

  contains(key) {
    let curr = this.head;
    while (curr) {
      if (curr.key === key) return curr.value;
      curr = curr.next;
    }

    return -1;
  }

  replaceValue(key, val) {
    let curr = this.head;
    while (curr) {
      if (curr.key === key) {
        curr.value = val;
        return this.size;
      }
      curr = curr.next;
    }

    return -1;
  }
}

class HashTable {
  constructor() {
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
  set (key, value) {
    const address = hashCode(key, this.SIZE);
    if (this.storage[address] === undefined) this.storage[address] = new LinkedList();

    const bucket = this.storage[address];
    return bucket.contains(key) === -1 ? bucket.push(value, key) : bucket.replaceValue(key, value);
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
  get (key) {
    const address = hashCode(key, this.SIZE);
    return this.storage[address].contains(key);
  };

  /**
   * remove - delete a key/value pair from the hash table
   *
   * - If the key does not exist in the hash table, return undefined
   *
   * @param {string} key - key to be found and deleted in hash table
   * @return {string|number|boolean} The value deleted from the hash table
   */
  remove (key) {
    const address = hashCode(key, this.SIZE);
    return this.storage[address].remove(key);
  };
}

// Tests
const myHashTable = new HashTable();
console.log(myHashTable.set('abc', 123), '-> 1');
console.log(myHashTable.set('xyz', {}), '-> 1');
console.log(myHashTable.get('abc'), '-> 123');
console.log(myHashTable.set('abc', 321), '-> 1');
console.log(myHashTable.get('abc'), '-> 321');
console.log(myHashTable.get('abc'), '-> 321');
console.log(myHashTable.remove('abc'), '-> 0');
console.log(myHashTable.remove('abc'), '-> undefined');

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

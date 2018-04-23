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
HashTable.prototype.set = function(key, value) {
    let hashKey = hashCode(key, this.SIZE);
    console.log(hashKey);

    let currHNode = this.storage[hashKey];

    if (currHNode !== undefined) {
        let hNodeFound = false;
        while (!hNodeFound) {
            if (currHNode.next === null) {
                hNodeFound = true;
                currHNode.next = new HNode(key, value);
                continue;
            }

            if (currHNode.key === key) {
                currHNode.value = value;
                hNodeFound = true;
                continue;
            }

            currHNode = currHNode.next;
        }
    }

    this.storage[hashKey] = new HNode(key, value);
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
    let hashKey = hashCode(key, this.SIZE);
    let currHNode = this.storage[hashKey];
    let hNodeFound = false;

        while (!hNodeFound) {

            if (currHNode.key === key) {
                return currHNode.value;
            }

            if (currHNode.next === null) {
                return undefined;
            }

            currHNode = currHNode.next;
        }
    // return currHNode.value;
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
    let hashKey = hashCode(key, this.SIZE);

    if (this.storage[hashKey] === undefined) {
        return undefined;
    }

    let currHNode = this.storage[hashKey];
    let prevHnode;

    let hNodeFound = false;

        while (!hNodeFound) {

            if (currHNode.key === key) {
                val = currHNode.value;
                if (currHNode.next !== null) {
                    this.storage[hashKey] = currHNode.next;
                    return val;
                }

                if (prevHNode) {
                    prevHNode.next = currHNode.next;
                    return val;
                }


                this.storage[hashKey] = undefined;
                return val;

            }

            if (currHNode.next === null) {
                return undefined;
            }

            prevHNode = currHNode;
            currHNode = currHNode.next;
        }
    return currHNode.value;
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

// linked node structure to handle collisions
function HNode(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
}

let h = new HashTable();

h.set('hi', 'there');
h.set('cool', 'beans');



// Do not remove!!
module.exports = HashTable;

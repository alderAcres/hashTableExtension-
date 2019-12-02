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

// Comments on Assessment:

// I don't really understand the "data type" of a hash table.
// I understand it uses indices to retrieve/manipulate data in O(1) time complexity
// But I honestly don't understand what it means to construct it
// Nevertheless I'm going to give it my best effort
/* I also wasn't sure which type of iterator to use because I don't 
understand the data type of a hash table, so i went with a for in loop
 */
// Lastly, I'm wondering if my iterator/logic doesn't have the correct syntax

HashTable.prototype.set = function(key, value) {
    // iterate through the hash table "pushing/adding" values to the Hash Table
    for (let x in this) {
        // if the value exists in the hash table then we want to overwrite
        if (x = key && this.hasOwnProperty(x)) {
            x = key;
            this.x = value;
            // *I don't know how to handle a collision in a hash table
        } else if () {

            // lastly, if the value doesn't exist, then add the key/value pair
        } else {
            this.key = value;
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
    // iterate through the hash table
    for (let x in this) {
        // how do i specify that more than one value is stored at a key?
        if (x = key && this.hasOwnProperty(key)) {}
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
    // iterate through the hash table
    for (let x in this) {
        // delete key/value pair if it exists in the hash table
        if (x = key && this.hasOwnProperty(key)) {
            delete this.key;
            // *how do i delete/specify if there are multiple values at the address
            // else return undefined
        } else {
            return undefined;
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
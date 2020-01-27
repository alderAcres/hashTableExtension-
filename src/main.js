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
    this.itemsContained = 0;
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
    // start by generating the index where we will store things at
    const hashIndex = hashCode(key, this.SIZE);

    // if there is nothing currently at the index we will use...
    if (!this.storage[hashIndex]) {
        // store the key and value as a pair inside an object (which can then hold other key/value pairs)
        this.storage[hashIndex] = { key: value };
    }
    // if there is already an object at the index we are looking for
    else if (this.storage[hashIndex]) {
        // insert our key and value into the existing object without overwriting other keys
        this.storage[hashIndex][key] = value;
    }
    // increment our running tracker so we know it contains 1 more item
    this.itemsContained += 1;
    // return the current number of items contained
    return this.itemsContained;
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
    // start by generating the index we need to access
    const hashIndex = hashCode(key, this.SIZE);
    // return the value matching our key at that specific index
    return this.storage[hashIndex][key];
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
    // start by generating the index we need to access
    const hashIndex = hashCode(key, this.SIZE);

    // look for our specific key/value at that has index and make a copy we can return
    const itemToReturn = this.storage[hashIndex][key];

    // delete it from our hash storage
    delete this.storage[hashIndex][key];

    // check if there are no other keys remaining in the object at that hashIndex, and delete the empty object to conserve space if no other keys are found
    if (this.storage[hashIndex] === {}) {
        delete this.storage[hashIndex];
    }
    // return whatever we deleted
    return itemToReturn;
};

// Do not modify
function hashCode(string, size) {
    let hash = 0;
    if (string.length === 0) return hash;

    for (let i = 0; i < string.length; i++) {
        const letter = string.charCodeAt(i);
        hash = (hash << 5) - hash + letter;
        hash &= hash; // Convert to 32bit integer
    }

    return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

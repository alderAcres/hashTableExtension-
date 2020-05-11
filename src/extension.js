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
function HashTable(size) {
	// Default the size to 16
	this.SIZE = size || 16;
	this.storage = new Array(this.SIZE);

	// Keeps track of number of items stored
	this.maxlimit = this.SIZE * 0.75;
	this.minlimit = this.SIZE * 0.25;
	this.capacity = 0;
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
 * @return {number} The new number of capacity stored in the hash table
 */
HashTable.prototype.set = function (key, value) {
	// Get hash code
	const code = hashCode(key, this.SIZE);

	if (this.storage[code] === undefined) {
		// If undefined at this.storage[code], create new object and place in storage
		const obj = {};
		obj[key] = value;
		this.storage[code] = obj;
	} else {
		// Else add key-value pair to existing object
		this.storage[code][key] = value;
	}

	// Update capacity
	this.capacity += 1;

	// Increase size of hash table once capacity is greater than maxlimit
	if (this.capacity > this.maxlimit) this.changeHashTableSize(true);
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
	// Get hash code
	const code = hashCode(key, this.SIZE);

	// Return undefined if key does not exist in storage
	if (this.storage[code] === undefined) return undefined;

	// Return the value stored of the key-value pair
	return this.storage[code][key];
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
	// Get hash code
	const code = hashCode(key, this.SIZE);

	// Return undefined if key does not exist in storage
	if (this.storage[code] === undefined) return undefined;

	// Store output
	const output = this.storage[code][key];

	if (Object.keys(this.storage[code]).length <= 1) {
		// If only one or less elements in the object at this.storage[code], reassign to undefined
		this.storage[code] = undefined;
	} else {
		// Else delete the key-value pair and keep the object at this.storage[code]
		delete this.storage[code][key];
	}

	// Update capacity
	this.capacity -= 1;

	// Halve size of hash table if capacity is less than minlimit
	if (this.capacity < this.minlimit) this.changeHashTableSize(false);

	return output;
};

/**
 * HELPER FUNCTION
 * Increase or decrease Hash Table size when number of stored capacity is over this.maxlimit or under this.minlimit
 * @param {boolean} increase True if we are increasing size of hash table. False otherwise. *
 */
HashTable.prototype.changeHashTableSize = function (increase) {
	// If 'increase' is true, then double the size of the new hash table
	// If 'increase' is false, then half the size of the new hash table
	const newSize = increase ? this.SIZE * 2 : this.SIZE / 2;
	const newHashTable = new HashTable(newSize);

	// Iterate through current storage and skip over indices that hold undefined
	for (let obj of this.storage) {
		if (obj === undefined) continue;

		// Rehash everything
		for (let key in obj) {
			newHashTable.set(key, obj[key]);
		}
	}

	// Reassign 'this' to the newly created hashTable and reallocate memory for old hash table
	this.SIZE = newSize;
	this.storage = newHashTable.storage;
	this.items = newHashTable.items;
	this.maxlimit = newHashTable.maxlimit;
	this.minlimit = newHashTable.minlimit;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
	'use strict';

	let hash = 0;
	if (string.length === 0) return hash;

	for (let i = 0; i < string.length; i++) {
		const letter = string.charCodeAt(i);
		hash = (hash << 5) - hash + letter;
		hash = hash & hash; // Convert to 32bit integer
	}

	return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

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

function Node(key, value) {
	this.key = key;
	this.value = value;
	this.next = null;
	this.length = 1;
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
	// generate hashed key w/ key and size
	let hashedKey = hashCode(key, 16);
	// create new node w/ key and value
	let node = new Node(key, value);
	// if hashed Key not found, then add node as value for hashed key
	if (!this.storage[hashedKey]) {
		this.storage[hashedKey] = node;
		return this.length;
		// else, traverse through the LL of nodes, adding current node to the end when end found
	}
	let current = this.storage[hashedKey];
	while (current.next) {
		current = current.next;
	}
	current.next = node;
	this.length += 1;

	return this.length;
};

HashTable.set('first key', 'first value');
console.log(HashTable().set('testing 1 key', 'testing 1 value'));

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
	// generate hashed key w/ key and size
	let hashedKey = hashCode(key, 16);
	// no hasedKey found, return undefined
	if (!this.storage[hashedKey]) return undefined;
	// else, tranverse through LL looking for key
	let current = this.storage[hashedKey];
	while (current.next) {
		if (current.key === key) {
			return current.value;
		}
		current = current.next;
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
HashTable.prototype.remove = function(key) {};

// Do not modify
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

/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable(size) {
  this.SIZE = size;

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

// console.log(typeof hash.set());

HashTable.prototype.set = function(key, value) {
  const table = this.storage;

  for (let i = 0; i < table.length; i++) {
    const data = {};
    const hashedKey = hashCode(key,5);
    if (!table[i]) {
      table.unshift(data);
      console.log(Number(hashedKey));
      table[i][hashedKey] = value;
      // table[i].hashedKey = value;
      break;
    }
    if (hashedKey in table[i]) {
      console.log("im in");
      table[i].duplicated = {};
      table[i].duplicated[hashedKey] = value;
      break;
    }
  }
  return 'im a function';
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
  const table = this.storage;
  const hashedKey = hashCode(key);

  for(const data of table){
    console.log(data);
    if(!data){
      if(`${hashedKey}` in data) return data[hashedKey];
    }
  }
  return "not found in table"
  

};

const test = new HashTable(5);
test.set('tevinIsAmazing', 4);
test.set('tevinIsAmazing', 5);
console.log(test.get("tevinIsAmazing"));

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
};

// Do not modify
function hashCode(string, size) {
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

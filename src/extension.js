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

// /////////////////////////
// PASTE AND MODIFY YOUR CODE BELOW
// /////////////////////////

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
  this.itemsStored = 0;
}


HashTable.prototype.set = function set(key, value) {
  const hash = hashCode(key, this.SIZE);
  // console.log('key:', key, 'hash:', hash);

  // if no value in element yet
  if (!this.storage[hash] && this.itemsStoraged < Math.floor(this.SIZE * 0.75)) {
    // put empty object into element
    this.storage[hash] = {};
    this.storage[hash][key] = value;
    this.itemsStored++;
  } else if (this.itemsStoraged < Math.floor(this.SIZE * 0.75)) {
    // overwrite or add key-value pair
    this.storage[hash][key] = value;
  } else if (this.itemsStoraged > Math.floor(this.SIZE * 0.75)) {
    // double hash table size
    this.SIZE = this.SIZE * 2;

    // rehash everything
    for (let i = 0; i < this.storage.length; i++) {
      if(this.storage[i]){
        for (const key in this.storage) {
          if (this.storage.hasOwnProperty(key)) {
            HashTable.set(key, this.storage[key])
          }
      }
    }
  }


  return this.itemsStored;
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
HashTable.prototype.get = function get(key) {
  // get hash
  const hash = hashCode(key, this.SIZE);

  if (!this.storage[hash]) {
    console.log('nothing at key in hashtable');
    return;
  }

  return this.storage[hash][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function remove(key) {
  const hash = hashCode(key, this.SIZE);

  // if key doesn't exist, retrun undefined
  if (!this.storage[hash][key]) return undefined;

  if (Object.keys(this.storage[hash]).length === 1) {
    const temp = this.storage[hash][key];
    this.storage[hash] = undefined;
    return temp;

    // eslint-disable-next-line no-else-return
  } else {
    const temp = this.storage[hash][key];
    delete this.storage[hash][key];
    return temp;
  }
};

// /////////////////////////
// YOUR CODE ABOVE
// /////////////////////////

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

// Do not remove!!
module.exports = HashTable;

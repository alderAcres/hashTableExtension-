/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable() {
  this.SIZE = 16
  this.NOT_FOUND = undefined

  this.storage = new Array(this.SIZE)
}

function LinkedList() {
  this.head = null
  this.tail = null
  this.memo = []
}

function Node(key, value, position) {
  this.key = key
  this.value = value
  this.position = null
  this.next = null
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
  const location = hashCode(key, this.SIZE)
  const node = new Node(key, value)

  if (this.storage[location] !== undefined) {
    let list = this.storage[location]
    if (list.head === null) {
      node.position = 0
      list.head = list.memo[0] = node
    } else if (list.tail === null) {
      node.position = 1
      list.tail = list.head.next = list.memo[1] = node
    } else {
      node.position = list.memo.length
      list.tail.next = node
      list.memo.push(node)
    }
  } else {
    let list = new LinkedList()
    node.position = 0
    list.head = list.memo[0] = node
    this.storage[location] = list
  }
}

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
  const location = hashCode(key, this.SIZE)

  if (this.storage[location] !== undefined) {
    const list = this.storage[location]
    let node = list.head
    while (node !== null) {
      if (node.key === key) {
        return node
      }
      node = node.next
    }
  } else {
    return this.NOT_FOUND
  }
  return this.NOT_FOUND
}

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {
  const location = hashCode(key, this.SIZE)

  if (this.storage[location] !== undefined) {
    let list = this.storage[location]
    let node = this.get(key)
    if (node === this.NOT_FOUND) {
      return this.NOT_FOUND
    } else if (this.memo === undefined || this.memo.length === 0) {
      return this.NOT_FOUND
    } else if (this.memo.length === 1) {
      this.storage[location] = undefined
      return node
    } else if (node.position === 0) {
      this.head = node.next
      list.memo = list.memo.splice(node.position, 1)
      return node
    } else {
      const previousNode = list.memo[node.position - 1]
      previousNode.next = node.next
      list.memo = list.memo.splice(node.position, 1)
      return node
    }
  } else {
    return this.NOT_FOUND
  }
}

// Do not modify
function hashCode(string, size) {
  "use strict"

  let hash = 0
  if (string.length === 0) return hash

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i)
    hash = (hash << 5) - hash + letter
    hash = hash & hash // Convert to 32bit integer
  }

  return Math.abs(hash) % size
}

/* TDD */
// const table = new HashTable()
// console.log("----- START -----")
// table.set("key-0", "value-0")
// table.set("key-1", "value-1")
// table.set("key-2", "value-2")
// table.set("key-3", "value-3")
// table.set("key-4", "value-4")
// table.set("key-5", "value-5")
// table.set("key-6", "value-6")
// table.set("key-7", "value-7")
// table.set("key-8", "value-8")
// table.set("key-9", "value-9")
// table.set("key-10", "value-10")
// table.set("key-11", "value-11")
// table.set("key-12", "value-12")
// table.set("key-13", "value-13")
// table.set("key-14", "value-14")
// table.set("key-15", "value-15")
// table.set("key-16", "value-16")
// table.set("key-17", "value-17")
// table.set("key-18", "value-18")
// table.set("key-19", "value-19")
// table.set("key-20", "value-20")
// console.log(table.remove("key-1"))
// console.log("----- END -----")
/* ----- */

// Do not remove!!
module.exports = HashTable

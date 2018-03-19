const HashTable = require('./main')

it('sets values and returns the new number of items', () => {
    const table = new HashTable()
    expect(table.getNumberOfItems()).toBe(0)
    let count = table.set("hello", 'world')
    expect(count).toBe(1)
    table.set('hello', 'world')
    expect(table.getNumberOfItems()).toBe(1)
})

it('gets values that have been set', () => {
    const table = new HashTable()
    table.set('hello', 'world')
    expect(table.get('hello')).toBe('world')
    expect(table.get('goodbye')).toBe(undefined)
})

it('removes set values', () => {
    const table = new HashTable()
    table.set('hello', 'world')
    table.set('goodbye', 'world')
    const world = table.remove('hello')
    expect(world).toBe('world')
    expect(table.getNumberOfItems()).toBe(1)
    const nothing = table.remove('absent')
    expect(nothing).toBe(undefined)
    expect(table.getNumberOfItems()).toBe(1)
})
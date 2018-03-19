const HashTable = require('./extension')

it('keeps the items when it resizes', () => {
    const table = new HashTable()
    table.set('hello', 'world')
    table.set('goodbye', 'world')
    expect(table.getNumberOfItems()).toBe(2)
    table.resize(32)
    expect(table.SIZE).toBe(32)
    expect(table.getNumberOfItems()).toBe(2)
})

it('resizes when it gets too large', () => {
    const table = new HashTable()
    for(let i = 1; i <= 15; i++){
        table.set('number' + i, 'test')
    }
    expect(table.SIZE).toBe(32)
})
'use strict';

export class ObjectStoreSpec {
    constructor(name, options = {}, ...indexes) {
        this.name = name;
        this.options = options;
        this.indexes = indexes;
    }
}

class Promisifier {
    constructor() { }

    _promisifyRequest(req) {
        return new Promise((resolve, reject) => {
            req.onsuccess = evt => {
                console.log('Success', evt);
                resolve(evt.target.result); 
            };

            req.onerror = evt => {
                console.log('Error', evt);
                reject(evt);
            };
        });
    }
}

class DBCommonOps extends Promisifier {
    constructor(dbObject) {
        super();

        this.dbObject = dbObject;
    }

    _setObject(dbObject) {
        this.dbObject = dbObject;
    }

    get(key) {
        if (!key) {
            throw new Error('A valid key is required!');
        }

        return this._promisifyRequest( this.dbObject.get(key) );
    }

    getKey(key, mode = 'read') {
        if (!key) {
            throw new Error('A valid key is required!');
        }

        return this._promisifyRequest( this.dbObject.getKey(key) );
    }

    getAll(query, count, mode = 'read') {
        return this._promisifyRequest( this.dbObject.getAll(query, count) );
    }

    getAllKeys(query, count, mode = 'read') {
        return this._promisifyRequest( this.dbObject.getAllKeys(query, count) );
    }

    openCursor(query, direction, mode = 'readwrite') {
        return this._promisifyRequest( this.dbObject.openCursor(query, direction) );
    }

    openKeyCursor(query, direction, mode = 'readwrite') {
        return this._promisifyRequest( this.dbObject.openKeyCursor(query, direction) );
    }
}

export class Index extends DBCommonOps {
    constructor(idx) {
        if (!idx || !(idx instanceof IDBIndex)) throw new Error('A valid IDBIndex is required!');

        super(idx);        
    }
}

export class ObjectStore extends DBCommonOps {
    constructor(name, tx) {
        if (!name) throw new Error('A name is required');
        if (!tx || !(tx instanceof IDBTransaction)) throw new Error('A valid IDBTransaction object is required');

        super( tx.objectStore(name) );

        this.name = name;
        this.tx = tx;

        this.tx.oncomplete = evt => {
            console.log('Transaction completed!');
        };
        
        this.tx.onerror = evt => {
            console.log('Transaction error!', evt);
        };
    }

    index(name) {
        return new Index( this.dbObject.index(name) );
    }

    add(obj, mode = 'readwrite') {
        if (!obj || obj == null) {
            throw new Error('A valid object is required!');
        }

        return this._promisifyRequest( this.dbObject.add(obj) );
    }

    put(obj, mode = 'readwrite') {
        if (!obj || obj == null) {
            throw new Error('A valid object is required!');
        }

        return this._promisifyRequest( this.dbObject.put(obj) );
    }

    delete(key, mode = 'readwrite') {
        if (!key) {
            throw new Error('A valid key is required!');
        }

        return this._promisifyRequest( this.dbObject.delete(key) );
    }
}

export class Database {
    constructor(name, version = 1, db, ...objectStores) {
        if (!('indexedDB' in window)) {
            throw new Error('This browser doesn\'t support IndexedDB');
        }

        if (!name) throw new Error('A name is required');
        if (!db || !(db instanceof IDBDatabase)) throw new Error('An instance of idb is required');

        this.name = name;
        this.version = version;
        this.objectStores = objectStores;
        this.db = db;
    }

    static open(name, version = 1, ...objectStores) {
        if (!name) throw new Error('A name is required');

        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) {
                return reject(new Error('This browser doesn\'t support IndexedDB'));
            }

            const idb = window.indexedDB;
            const dbReq = idb.open(name, version);

            dbReq.onupgradeneeded = evt => {
                console.log(`Database ${name} requires an upgrade!`);
                
                const db = evt.target.result;

                for (const objStore of objectStores) {
                    if (!db.objectStoreNames.contains(objStore.name)) {
                        const os = db.createObjectStore(objStore.name, objStore.options);
                        
                        for (const idx of objStore.indexes) {
                            os.createIndex(idx.name, idx.field, idx.options);
                        }

                        os.transaction.oncomplete = osEvt => {
                            console.log(`ObjectStore ${os.name} created on ${name} with options`, objStore.options, 'and indexes', objStore.indexes);
                        };
                    }
                }
            };

            dbReq.onerror = evt => {
                console.log('Error opening DB', evt);
                reject(evt);
            };

            dbReq.onsuccess = evt => {
                console.log('Success opening DB', evt.target.result);
                resolve(new Database(name, version, evt.target.result, objectStores));
            };
        });
    }

    createObjectStore(objectStore = {}, mode = 'readwrite') {
        return new Promise((resolve, reject) => {
            if (!objectStore || !(objectStore instanceof ObjectStoreSpec)) {
                return reject(new Error('An ObjectStoreSpec instance is required!'));
            }

            if (!this.db.objectStoreNames.contains(objectStore.name)) {
                this.objectStores.push(objectStore);

                const os = this.db.createObjectStore(objStore.name, objStore.options);
                
                for (const idx of objStore.indexes) {
                    os.createIndex(idx.name, idx.field, idx.options);
                }

                os.transaction.oncomplete = osEvt => {
                    console.log(`ObjectStore ${os.name} created on ${name} with options`, objStore.options, 'and indexes', objStore.indexes);
                    resolve( new ObjectStore(os.name, this.db.transaction(os.name, mode)) );
                };
            } else {
                reject(new Error(`The object store '${objectStore.name}' already exists!`))
            }
        });
    }
    
    objectStore(name, mode = 'readwrite') {
        if (!name) throw new Error('A name is required');

        return new ObjectStore(name, this.db.transaction(name, mode));
    }

    close() {
        const result = this.db.close();

        this.db = null;

        return result;
    }
}

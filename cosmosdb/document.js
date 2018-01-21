const documentClient = require('documentdb').DocumentClient

exports.conn = (endPoint, accountKey) => (
  new documentClient(endPoint, { "masterKey": accountKey })
)

exports.dao = (conn, database, collection) => ({
  insert: data => insert(conn, database, collection, data),
  findById: id => findById(conn, database, collection, id),
  findFirst: query => findFirst(conn, database, collection, query),
})

function findById(conn, database, collection, id) {
  const documentLink = `dbs/${database}/colls/${collection}/docs/${id}`
  return new Promise((resolve, reject) => {
    conn.readDocument(documentLink, (err, resource) => {
      err ? reject(err) : resolve(resource)
    })
  })
}

function insert(conn, database, collection, data) {
  const documentLink = `dbs/${database}/colls/${collection}`
  return new Promise((resolve, reject) => {
    conn.createDocument(documentLink, data, (err, resource) => {
      err ? reject(err) : resolve(resource)
    })
  })
}

function findFirst(conn, database, collection, query) {
  const documentLink = `dbs/${database}/colls/${collection}`
  return new Promise((resolve, reject) => {
    conn.queryDocuments(documentLink, query).current((err, item) => {
      err ? reject(err) : resolve(item)
    })
  })
}
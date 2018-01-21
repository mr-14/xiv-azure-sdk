const documentClient = require('documentdb').DocumentClient

exports.conn = (endPoint, accountKey) => (
  new documentClient(endPoint, { "masterKey": accountKey })
)

exports.dao = (conn, database, collection) => ({
  get: id => readDocument(conn, database, collection, id),
  insert: data => createDocument(conn, database, collection, data)
})

function readDocument(conn, database, collection, id) {
  const documentLink = `dbs/${database}/colls/${collection}/docs/${id}`
  return new Promise((resolve, reject) => {
    conn.readDocument(documentLink, (err, resource) => {
      err ? reject(err) : resolve(resource)
    })
  })
}

function createDocument(conn, database, collection, data) {
  const documentLink = `dbs/${database}/colls/${collection}`
  return new Promise((resolve, reject) => {
    conn.createDocument(documentLink, data, (err, resource) => {
      err ? reject(err) : resolve(resource)
    })
  })
}
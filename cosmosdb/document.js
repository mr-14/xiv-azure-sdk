const documentClient = require('documentdb').DocumentClient

exports.conn = (endPoint, accountKey) => (
  new documentClient(endPoint, { "masterKey": accountKey })
)

exports.client = (conn, database, collection) => ({
  get: id => readDocument(conn, database, collection, id)
})

function readDocument(conn, database, collection, id) {
  const documentLink = `dbs/${database}/colls/${collection}/docs/${id}`
  return new Promise((resolve, reject) => {
    conn.readDocument(documentLink, (err, resource) => {
      err ? reject(err) : resolve(resource)
    })
  })
}
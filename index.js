const fastify = require('fastify')({ logger: true })
const crypto = require('crypto')
const STARTUP = new Date()
const id = hash()

function hash() {
  return crypto.randomBytes(20).toString('hex')
}

fastify.get('/', async (request, reply) => {
  return {
    startup: STARTUP,
    id,
    body: {
      date: new Date(),
      hash: hash(),
      hello: 'world',
      env: process.env.NODE_ENV || 'missing'
    }
  }
})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()


const axios = require('axios')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

const directory_url = 'https://directory.prod.aserto.com/api/v3/directory/objects?object_type=user&page.size=100'
async function get() {
  const API_KEY = process.env.API_KEY
  if (!API_KEY) {
    console.error('Must provide a API_KEY environment variable')
    process.exit(1)
  }
  const tenantId = (process.argv.length > 2 && process.argv[2]) || process.env.TENANT_ID
  if (!tenantId) {
    console.error('Must provide a tenant ID either as the first argument or in TENANT_ID env variable')
    process.exit(1)
  }
  let users = []
  let page_token = ''
  let i = 0
  while (true) {
    try {
      console.error(`getting page ${i++}`)
      const url = page_token ? `${directory_url}&page.token=${encodeURIComponent(page_token)}` : directory_url
      const response = await axios.get(url, {
        headers: {
          'authorization': `basic ${API_KEY}`,
          'aserto-tenant-id': tenantId,
          'content-type': 'application/json'
        }
      })
      users = [...users, ...response.data.results]
      page_token = response.data.page.next_token
      if (!page_token) {
        break
      }
    } catch (e) {
      console.error(e)
      break
    }
  }
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))
}

get()
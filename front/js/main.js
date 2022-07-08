'use strict'

const Handlebars = require('handlebars')
const { request } = require('graphql-request')
const endpoint = 'http://localhost:3002/api'

const template = `
{{#with error}}
  There was an error: {{../error}}
{{/with}}
{{#each items}}
<div class="item">
  <h3>{{name}}</h3>
</div>
{{/each}}
`
const templateData = Handlebars.compile(template)

async function search () {
  const query = `
 query{
  getStudents{
         _id
         name
      }
}
`

  const data = { }
//   const data = { keyword: document.getElementById('search').value }
  let result, html

  try {
    result = await request(endpoint, query, data)
    // alert(JSON.stringify(result))
    html = templateData({ items: result.getStudents })
  } catch (error) {
    html = templateData({ error: error })
  }

  document.getElementById('result').innerHTML = html
}

window.onload = () => {
  document.getElementById('btn-search').addEventListener('click', search)
}

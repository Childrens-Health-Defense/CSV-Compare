const csv = require('csv-parser')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    { id: 'first_name', title: 'First Name' },
    { id: 'last_name', title: 'Last Name' },
    { id: 'email', title: 'Email' },
  ],
})

const members = []
const dafna = []

function filterData() {
  const filteredData = members.filter((member) => dafna.includes(member.email))

  csvWriter.writeRecords(filteredData).then(() => console.log('done'))
}

function gatherCSVs() {
  fs.createReadStream('chd-members.csv')
    .pipe(csv())
    .on('data', (data) => {
      members.push(data)
    })
    .on('end', () => {
      fs.createReadStream('dafna.csv')
        .pipe(csv())
        .on('data', (data) => {
          dafna.push(data.email)
        })
        .on('end', () => {
          filterData()
        })
    })
}

gatherCSVs()

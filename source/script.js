/* global setAnswer, fieldProperties, getPluginParameter, $ */

var choices = fieldProperties.CHOICES // Get the full list of choices available
var numberOfChoices = choices.length // Count the number of choices for this field
var fieldType = fieldProperties.FIELDTYPE // Get the type of field (select_one or select_multiple)
var delimiter = getPluginParameter('delimiter') // Get thd parameter for the delimiter entered in the form definition
var headers = getPluginParameter('headers') // Get the list of headers entered in the form definition
var headerArray = headers.split(',') // get individual headers from the headers parameter

var style = 'single' // set the default style to select one
var className = 'select-radiobox'
// check if the field is multi select and set selection to allow selecting multiple fields
if (fieldType === 'select_one') {
  style = 'single'
  className = 'select-radiobox'
} else {
  style = 'multi'
  className = 'select-checkbox'
}

var data = [] // Array to keep the data for the data table

// Loop through the choices and create key value pairs
for (let i = 0; i < numberOfChoices; i++) {
  const itemObject = {}
  const choicesLabel = choices[i].CHOICE_LABEL
  const splitLabel = choicesLabel.split(delimiter)
  itemObject.check = ''
  itemObject.value = choices[i].CHOICE_VALUE
  if (splitLabel.length >= 1) {
    for (let j = 0; j < splitLabel.length; j++) {
      var label = headerArray[j]
      itemObject[label] = splitLabel[j]
    }
  }
  data.push(itemObject)
}

// Create a placeholder for the table
var $thead = $('#tableId').find('thead')
var tr = $('<tr>')
$thead.append(tr)
var columns = [] // Array to store the column headers

// Loop through the first and designate these as column headers
$.each(data[0], function (name, value) {
  var column = {
    data: name,
    title: name
  }
  columns.push(column)
})

// Using datatables create a table dynamically
const table = $('#tableId').DataTable({
  data: data, // data for each row
  columns: columns, // column headers for each column
  columnDefs: [ // Make specific alterations to certain columns of the table
    {
      targets: 0, // targets the first column
      searchable: false,
      sortable: false,
      orderable: false,
      className: className // adds checkboxes to the first column
    },
    {
      targets: 1, // targets the second column
      visible: false, // Use this to hide the value from the table
      searchable: false,
      sortable: false,
      orderable: false
    }],
  order: [], // Remove the sorting icon from the first column. Also allows for default sorting to be used
  info: false, // Hide table information
  paging: false, // Remove table paging
  select: { // Allow section for this table
    items: 'row', // Allow selection by row
    style: style // Allow selection based on fieldType (single/multi)
  },
  scrollX: true,
  fixedHeader: true
})

table.columns(0).header().to$().html(' ') // Set header for first column to blank

// Hightlight previously selected choices
for (let n = 0; n < numberOfChoices; n++) {
  if (choices[n].CHOICE_SELECTED) {
    if (fieldType === 'select_one') {
      const currentAnswer = choices[n].CHOICE_VALUE
      const names = table.row(function (idx, data, node) {
        return data.value === currentAnswer ? true : false
      }).index()
      table.row(names).select()
    } else {
      const currentAnswer = choices[n].CHOICE_VALUE
      const splitAnswer = currentAnswer.split(' ')
      if (splitAnswer.length === 1) {
        const names = table.row(function (idx, data, node) {
          return data.value === currentAnswer ? true : false
        }).index()
        table.row(names).select()
      } else {
        for (let k = 0; k <= splitAnswer.length; k++) {
          const names = table.row(function (idx, data, node) {
            return data.value === splitAnswer[k] ? true : false
          }).index()
          table.row(names).select()
        }
      }
    }
  }
}

getSelected() // Call method to process selections

let ids // Variable to keep track of the selected rows

function getSelected () {
  table.on('select', function (e, dt, type, indexes) { // On row selection
    if (type === 'row') {
      ids = $.map(table.rows({ selected: true }).data(), function (item) {
        return item.value // save the value of the row
      })
    }
    setValue(ids) // Pass ids to setValue
  })
  table.on('deselect', function (e, dt, type, indexes) {
    if (type === 'row') {
      ids = $.map(table.rows({ selected: true }).data(), function (item) { // On row deselection
        return item.value // remove the value of the deselected row
      })
    }
    setValue(ids) // Pass ids to setValue
  })
}

// Sets the value of selection based on selected rows
function setValue (value) {
  if (fieldType === 'select_multiple' && value.length > 1) { // check if to expect more than one selection
    const answer = value.join(' ') // Change array into space seperated string
    setAnswer(answer) // Set this as the answer for this field
  } else if (fieldType === 'select_one') {
    if (value.length === 1) { // Check if only one answer is checked
      const answer = value.toString(); // Change an array into a string value
      setAnswer(answer); // Set this as the answer for the field
    } else if (value.length === 0) { // No selection made
      setAnswer(''); // Clear the answer for this field
    }
  }
}

function clearAnswer () {
  setAnswer()
}

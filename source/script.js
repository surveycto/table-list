var choices = fieldProperties.CHOICES // Get the full list of choices available
var numberOfChoices = choices.length // Count the number of choices for this field
var fieldType = fieldProperties.FIELDTYPE // Get the type of field (select_one or select_multiple)
var delimiter = getPluginParameter('delimiter') // Get thd parameter for the delimiter entered in the form definition
var headers = getPluginParameter('headers') // Get the list of headers entered in the form definition
var headerArray = headers.split(',') // get individual headers from the headers parameter

var style = 'single' // set the default style to select one

// check if the field is multi select and set selection to allow selecting multiple fields
if (fieldType === 'select_one') {
  style = 'single'
} else {
  style = 'multi'
}

var data = [] // Array to keep the data for the data table

// Loop through the choices and create key value pairs
for (let i = 0; i < numberOfChoices; i++) {
  const item = {}
  const choicesLabel = choices[i].CHOICE_LABEL
  const splitLabel = choicesLabel.split(delimiter)
  item.check = ''
  item.value = choices[i].CHOICE_VALUE
  if (splitLabel.length >= 1) {
    for (var j = 0; j < splitLabel.length; j++) {
      var label = headerArray[j]
      item[label] = splitLabel[j]
    }
  }
  data.push(item)
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
      className: 'select-checkbox', // adds checkboxes to the first column
      title: ' '
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
  // scrollX: true,
  fixedHeader: true,
  drawCallback: function (settings) {
    $('#tableId tr:eq(0) th:eq(0)').text(' ') // Set header for first column to blank
  }
})

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
  } else {
    if (value.length === 1) { // Check if only one answer is checked
      const answer = value.toString(value) // Change a array into a string value
      setAnswer(answer) // Set this as the answer for the field
    }
  }
}

function clearAnswer () {
  setAnswer()
}

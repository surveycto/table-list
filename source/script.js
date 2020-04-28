var choices = fieldProperties.CHOICES;
var numberOfChoices = choices.length;
var fieldType = fieldProperties.FIELDTYPE;
var result;
var delimiter = getPluginParameter ("delimiter");
var headers = getPluginParameter("columns");
var headerArray = headers.split(",");

var style = 'single';

if (fieldType === 'select_one'){
  style = 'single';
}
else {
  style = 'multi';
}

var data = [];

for(let i = 0; i < numberOfChoices; i++ ){
  const item = {};
  const choicesLabel = choices[i].CHOICE_LABEL;
  const splitLabel = choicesLabel.split(delimiter);
  item.check='';
  item.value = choices[i].CHOICE_VALUE;
  if ( splitLabel.length >= 1 ){
    for( var j = 0; j < splitLabel.length; j++){
      var label = headerArray[j];
      item [label] = splitLabel[j];
    }
  }
  data.push(item);
}

//var column;

console.log(data[0]);

var $thead = $('#tableId').find('thead');
var tr = $("<tr>");
$thead.append(tr);
var columns = [];
$.each(data[0], function(name, value) {
  var column  = {
    "data": name,
    "title":name
  };
  // if(name === 0){
  //   column = {
  //     "data": name,
  //     "title":name,
  //     "className": 'select-checkbox'
  //   }
  // }else{
  //   column = {
  //     "data": name,
  //     "title":name
  //   }
  // }
  columns.push(column);
});

let table = $('#tableId').DataTable({
  data: data,
  columns: columns,
  columnDefs:[
    {
      targets : 0,
      searchable : false,
      sortable : false,
      orderable : false,
      className: 'select-checkbox',
      title : " "
    },
    {
    targets : 1,
    visible : false,
    searchable : false,
    sortable : false,
    orderable : false
  }],
  info : false,
  paging : false,
  select: {
    items : 'row',
    style : style
  },
  fixedHeader : true,
  drawCallback : function(settings){
    $('#tableId tr:eq(0) th:eq(0)').text(" ");
  }
});

getSelected();

let ids;

function getSelected(){
  table.on( 'select', function ( e, dt, type, indexes ) {//process what is selected
    if ( type === 'row' ) {
      ids = $.map(table.rows({ selected: true }).data(),function(item){
          return item.value;
      });
    }

    setValue(ids);
  });
  table.on( 'deselect', function ( e, dt, type, indexes ) {
    if ( type === 'row' ) {
        ids = $.map(table.rows({ selected: true }).data(),function(item){
            return item.value;
        });
    }

    setValue(ids);
    });
}

function setValue(value){
  if(fieldType === 'select_multiple' && value.length > 1){
    const answer = value.join(" ");
    setAnswer(answer);
  }else{
    const answer = value.toString(value);
    setAnswer(answer);
  }
}

function clearAnswer(){
  setAnswer();
}

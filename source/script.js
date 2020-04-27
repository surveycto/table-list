var choices = fieldProperties.CHOICES;
var numberOfChoices = choices.length;
var fieldType = fieldProperties.FIELDTYPE;
var result;
var delimiter = getPluginParameter ("delimiter");

var style = 'single';

if (fieldType == 'select_one'){
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
  item.value = choices[i].CHOICE_VALUE;
  if ( splitLabel.length >= 1 ){
    for( var j = 0; j < splitLabel.length; j++){
      var label = "label"+ j;
      item [label] = splitLabel[j];
    }
  }
  data.push(item);
}

var $thead = $('#tableId').find('thead');
var tr = $("<tr>");
$thead.append(tr);
var columns = [];
$.each(data[0], function(name, value) {
  var column = {
    "data": name,
    "title":name
  };
  columns.push(column);
});

let table = $('#tableId').DataTable({
  data: data,
  columns: columns,
  info : false,
  paging : false,
  select: {
    items : 'row',
    style : style
  },
  fixedHeader : true,
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
  if(fieldType == 'select_multiple' && value.length > 1){
    let answer = value.join(" ");
    setAnswer(answer);
  }else{
    setAnswer(value);
  }
}

function clearAnswer(){
  setAnswer();
}

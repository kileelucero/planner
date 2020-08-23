$(document).ready(function() {
  
  const test = false;

  // get times from moment
  const now = moment().format('MMMM Do YYYY');

  let hourPeriod24 = moment().format('H');
  let hourPeriod12 = moment().format('h');

  // set times for testing after hours
  if (test) {
    hourPeriod24 = 13;
    hourPeriod12 = 1;
  }

  let $currentDay = $('#navbar-subtitle');
  $currentDay.text(now);
  
  const saveIcon = "./images/save-regular.svg"; 

  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  let savePlans = JSON.parse(localStorage.getItem("savePlans"));

  if (test) { console.log(savePlans); }

  // If plans were retrieved from localStorage, update the plan array to it
  if (savePlans !== null) {
    planInputArray = savePlans;
  } else {
    // this should only occur on first time the app is loaded in the browser
    // helpfully remind user that lunch is important
    planInputArray = new Array(9);
    planInputArray[4] = "Don't Forget to Breathe";
  }

  if (test) { console.log("full array of planned text",planInputArray); }

  // set variable referencing planner element
  let $toDoDiv = $('#plannerContainer');
  // clear existing elements
  $toDoDiv.empty();

  if (test) { console.log("current time",hourPeriod12); }


  // build calendar by row for fix set of hours
  for (let hour = 9; hour <= 17; hour++) {
    // index for array use offset from hour
    let index = hour - 9;
    
    // build row components
    let $plannerRowDiv = $('<div>');
    $plannerRowDiv.addClass('row');
    $plannerRowDiv.addClass('plannerRow');
    $plannerRowDiv.attr('hour-index',hour);
  
    // Start building Time box portion of row
    let $column2TimeDiv = $('<div>');
    $column2TimeDiv.addClass('col-md-2');
  
    // create timeBox element (contains time)
    const $timeboxSpan = $('<span>');
    // can use this to get value
    $timeboxSpan.attr('class','timeBox');
    
    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // populate timeBox with time
    $timeboxSpan.text(`${displayHour} ${ampm}`);

    // insert into col inset into timebox
    $plannerRowDiv.append($column2TimeDiv);
    $column2TimeDiv.append($timeboxSpan);
    // STOP building Time box portion of row

    // START building input portion of row
    // build row components
    let $dailyPlanSpan = $('<input>');

    $dailyPlanSpan.attr('id',`input-${index}`);
    $dailyPlanSpan.attr('hour-index',index);
    $dailyPlanSpan.attr('type','text');
    $dailyPlanSpan.attr('class','dailyPlan');

    // access index from data array for hour 
    $dailyPlanSpan.val( planInputArray[index] );
    
    // create col to control width
    let $column9InputDiv = $('<div>');
    $column9InputDiv.addClass('col-md-9');

    // add col width and row component to row
    $plannerRowDiv.append($column9InputDiv);
    $column9InputDiv.append($dailyPlanSpan);
    // STOP building Time box portion of row

    // START building save portion of row
    let $column1SaveDiv = $('<div>');
    $column1SaveDiv.addClass('col-md-1');

    let $saveButton = $('<i>');
    $saveButton.attr('id',`saveid-${index}`);
    $saveButton.attr('save-id',index);
    $saveButton.attr('class',"far fa-save saveIcon");
    
    // add col width and row component to row
    $plannerRowDiv.append($column1SaveDiv);
    $column1SaveDiv.append($saveButton);
    // STOP building save portion of row

    // set row color based on time
    updateRowColor($plannerRowDiv, hour);
    
    // add row to planner container
    $toDoDiv.append($plannerRowDiv);
  };

  // function to update row color
  function updateRowColor ($hourRow,hour) { 

    if (test) { console.log("rowColor ",hourPeriod24, hour); }

    if ( hour < hourPeriod24) {
      // $hourRow.css('')
      if (test) { console.log("lessThan"); }
      $hourRow.css("background-color","lightgrey")
    } else if ( hour > hourPeriod24) {
      if (test) { console.log("greaterthan"); }
      $hourRow.css("background-color","lightgreen")
    } else {
      if (test) { console.log("eqaul"); }
      $hourRow.css("background-color","tomato")
    }
  };

  // saves to local storage
  // onclick function to listen for user clicks on plan area
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    if (test) { console.log('click before '+ planInputArray); }

    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planInputArray[$index] = $value;


    if (test) { console.log('value ', $value); }
    if (test) { console.log('index ', $index); }
    if (test) { console.log('click after '+ planInputArray); }

    // remove shawdow pulse class
    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("savePlans", JSON.stringify(planInputArray));
  });  
  
  // function to color save button on change of input
  $(document).on('change','input', function(event) {
    event.preventDefault();  
    if (test) { console.log('onChange'); }
    if (test) { console.log('id', $(this).attr('hour-index')); }

    // neeed to check for save button
    let i = $(this).attr('hour-index');

    // add shawdow pulse class
    $(`#saveid-${i}`).addClass('shadowPulse');
  });
});
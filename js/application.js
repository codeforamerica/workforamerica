// ======
// Get the data
// ======

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1O8bcLjf6vapSodOb_zCg445Cr_ctjlRahJRakapKV-Y/pubhtml';

function init() {
  console.log('Ring, ring. Calling Google Sheets...')
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: handleData,
                   simpleSheet: true } );
}

function handleData(data,tabletop) {
  console.log('They picked up...')

  // Pull out the data
  var jobs;
  jobs = tabletop.sheets('submitted_jobs').elements;
  console.log(jobs);

  // Do something with the data
  makeJobs(jobs);
}

function makeJobs(jobs) {
  var template,
      compiled,
      conten;
  template = $('#js-jobs-template').html();
  compiled = _.template(template);
  content = compiled({ 'jobs' : jobs });
  $('#jobs-app').html( content );
}
// =====
// Check if app exists by searching for some class/id in the DOM
// =====

function appExists(dom) {
  var exists;
  exists = $(dom);
  if (exists.length > 0) { 
    return true; 
  }
  else { 
    return false; 
  }
}

// =====
// Do the thing
// =====

$(document).ready(function(){
  if (appExists('#jobs-app')) {
    init();
  }
});
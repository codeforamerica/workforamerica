// =====
// Set up our app
// =====
var app = {};
    // Global settings
    app.global = {};
    app.global.sheet_url = 'https://docs.google.com/spreadsheets/d/1O8bcLjf6vapSodOb_zCg445Cr_ctjlRahJRakapKV-Y/pubhtml';
    app.global.sheet_name = 'submitted_jobs';

// =====
// Run the app
// =====
app.init = function(name,settings) {
  if ((!app.global.sheet_url) || (!app.global.sheet_url)) {
    // Not set up properly!
    return false;
  }
  if (app.exists(name)) {
    var template,
        compiled,
        result;
    // Get the data, finish the process
    app.get(app.global.sheet_url,app.global.sheet_name,
    function(data,tabletop)
    {
      // Get the template
      template = $('#js-template-' + name).html();
      // Get ready to use the template
      compiled = _.template(template);
      // Run template and return our HTML
      result = compiled({ 'data' : data });
      // Put the compiled template into the DOM
      $('#js-app-' + name).html(result);
      // Return true
    });
    return true;
  }
  return false;
}

// =====
// Check if the app exists on the page by finding an ID in the dom in this format: #js-app-name
// =====
app.exists = function(name) {
  if ($('#js-app-' + name).length > 0) {
    return true;
  }
  return false;
}

// =====
// Get the data for the requested sheet, return an array of objects
// =====
app.get = function(url,sheet,cb) {
  console.log('Ring, ring. Calling Google Sheets...')
  // var goods;
  return Tabletop.init(
  { 
    key: url,
    callback: cb,
    simpleSheet: true 
  });
  // Return the data from the sheet we want
  // return goods.sheets(sheet).elements;
}

// =====
// Run everything
// =====
$(document).ready(function(){
  app.init('jobs_all');
  app.init('jobs_single');
});

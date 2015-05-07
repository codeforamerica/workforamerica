// =====
// Set up our app
// =====
var app = {};
    // Global settings
    app.global = {};
    app.global.sheet_url = 'https://docs.google.com/spreadsheets/d/1O8bcLjf6vapSodOb_zCg445Cr_ctjlRahJRakapKV-Y/pubhtml';
    app.global.sheet_name = 'submitted_jobs';
    app.global.errormsg = {};
    app.global.errormsg.not_found = 'Sorry, that record doesn\'t exists. The record may no longer exist, or you may have the wrong URL.';

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
    // Get the template
    template = $('#js-template-' + name).html();
    // Get ready to use the template
    compiled = _.template(template);
    // Get the data, fill in the js-templatet
    app.get(app.global.sheet_url,app.global.sheet_name,
    function(data,tabletop)
    {
      // Do we need to get data by ID?
      if (typeof settings !== 'undefined') {
        if (settings.data_id) {
          data = app.getDataByID(data,settings.data_id);
          // If that thing doesn't exist, say so
          if (typeof data === 'undefined') {
            $('#js-app-' + name).html('<div class="error">' + app.global.errormsg.not_found + '</div>');
            return;
          }
        }
      }
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
// Get the data by ID
// =====
app.getDataByID = function(data,id) {
  return response = _.findWhere(data, { 'id' : id });
}

// =====
// Get the data for the requested sheet, return an array of objects
// =====
app.get = function(url,sheet,cb) {
  console.log('Ring, ring. Calling Google Sheets...');
  // var goods;
  Tabletop.init(
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
  app.init('jobs_single',{
    'data_id' : urlParams.id
  });
});

// =====
// Set up our app
// =====
var app = {},
    app.global = {};
    // Global settings
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
    var data,
        template,
        compile,
        result;
    // Get the data 
    data = app.get(app.global.sheet_url,app.global.sheet_name); // Returns array of objects
    // Get the template
    template = $('#js-template-' + name).html();
    // Get ready to use the template
    compile = _.template(template);
    // Run template and return our HTML
    result = compiled({ 'data' : data });
    // Put the compiled template into the DOM
    $('#js-app-' + name).html(result);
    // Return true
    return true;
  }
  return false;
}

// =====
// Check if the app exists on the page by finding an ID in the dom in this format: #js-app-name
// =====
app.exists = function(name) {
  if ($('#js-app-' + name) > 0) {
    return true;
  }
  return false;
}

// =====
// Get the data for the requested sheet, return an array of objects
// =====
app.get = function(url,sheet) {
  console.log('Ring, ring. Calling Google Sheets...')
  var goods;
  goods = Tabletop.init(
  { 
    key: public_spreadsheet_url,
    callback: function(data,tabletop) {
      console.log('They picked up...')
    },
    simpleSheet: true 
  });
  // Return the data from the sheet we want
  return goods.sheets(sheet).elements;
}

// =====
// Run everything
// =====
(function(win,doc){
  // =====
  // Do the thing
  // =====
  app.init('jobs_all');
  app.init('jobs_single');
})(this,this.document);

// =====
// Set up our app
// =====
var app = {};
    // Global settings
    app.global = {};
    app.global.name = 'workforamerica';
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
      app.save(data);
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
  // Let's check if the data exists
  var saved,
      cachedAt;
  saved = localStorage.getItem(app.global.name);
  cachedAt = localStorage.getItem(app.global.name + '--cachedAt');

  if (saved !== null && saved !== "" && cachedAt !== null && cachedAt !== "") {
    saved = JSON.parse(saved);
    cachedAt = JSON.parse(cachedAt);
    cachedAt = new Date(cachedAt);
    // Check if it was saved longer than 5 minutes ago (300 seconds)
    seconds = Math.floor((new Date() - cachedAt) / 1000);
    if (seconds < 300) {
      console.log('Found saved sheet...');
      cb(saved);
    }
    else {
      console.log('Stale data. Calling Google Sheets...');
      Tabletop.init(
      { 
        key: url,
        callback: cb,
        simpleSheet: true 
      });
    }
  }
  else {
    console.log('Ring, ring. Calling Google Sheets...');
    Tabletop.init(
    { 
      key: url,
      callback: cb,
      simpleSheet: true 
    });
  }
}

// =====
// Reach out to Google Docs
// =====

app.fetch = function() {
  
}

// =====
// Save the data in local storage
// =====

app.save = function(data) {
  // Save the data in local storage
  var cachedAt;
  cachedAt = new Date();
  localStorage.setItem(app.global.name,JSON.stringify(data));
  localStorage.setItem(app.global.name + '--cachedAt',JSON.stringify(cachedAt));
  return;
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

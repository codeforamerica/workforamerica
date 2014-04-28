<html>
  <? include "_html_head.php" ?>
  <body class="home">
    <? include "_header.php" ?>    
    <main role="main">
      <div class="site-width">
        <h1>Work for America</h1>
        <p>The very finest government tech jobs. Hand-selected by <a href="http://codeforamerica.org">Code for America</a> and written in words we can all understand.</p>
        <? for ($i=0; $i < 5; $i++) : ?> 
          <article class="job-listing">
            <h1>Job title</h1>
            <dl>
              <dt>Description</dt>
              <dd>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
              <dt>Salary</dt>
              <dd>$70,000</dd>
              <dt>Location</dt>
              <dd>Boston, MA</dd>
              <dt>Type</dt>
              <dd>Government</dd>
            </dl>
          </article>
        <? endfor; ?>
      </div>
    </main>
  </body>
</html>
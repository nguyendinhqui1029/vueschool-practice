export const HTML_TEMPLATE = `
          <html>
            <head>
              <title>
                Result
              </title>
            </head>
            <body>
              <script>
                try {
                  console.log = function(message) { 
                    document.body.innerHTML += "<h4>Output:</h4>" + message; 
                  };
                } catch (error) {
                  console.log(error)
                  document.body.innerHTML += "<h2>Error:</h2>" + "<span style='color:red;'>"+error.message+"</span>";
                }
              </script>
            </body>
          </html>`;
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

export const LANGUAGE_CONSTANT = {
  JAVASCRIPT: 'JAVASCRIPT',
  HTML: 'HTML',
  CSS: 'CSS',
  SQL: 'SQL',
  ANGULAR: 'ANGULAR',
  VUE: 'VUE',
  SASS: 'SASS',
  JSON: 'JSON'
}

export const LANGUAGE_CODE = {
  VI: 'vi',
  EN: 'en',
  KO: 'ko'
}
export const MAPPING_LANGUAGE = {
  [LANGUAGE_CODE.VI]: 'Tiếng việt',
  [LANGUAGE_CODE.EN]: 'Tiếng anh',
  [LANGUAGE_CODE.KO]: 'Tiếng hàn'
}

export const COMPONENT_TYPE = {
  HEADER: 'HEADER',
  PARAGRAPH: 'PARAGRAPH',
  LIST: 'LIST'
}
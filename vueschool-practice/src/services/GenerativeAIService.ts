export async function  generateText(prompt: string) {
    try {
        const key = 'AIzaSyA0G-pGtxco6G95X4hheATrI5oLRAMmod8';
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"contents":[{"parts":[{"text":prompt}]}]})
          }
        );

        // Assuming the response contains the generated text
        if (response.ok) {
            const responseJson = await response.json();
            const value = responseJson.candidates?.[0].content?.parts?.[0]?.text;
            return JSON.parse(value?.substring(value.indexOf('{'), value.lastIndexOf('}') + 1));
          } else {
            console.error('Error calling the API:', response.status, response.statusText);
          }
      } catch (error) {
        console.error('Error calling the API:', error);
      }
}
const https = require('https');

exports.handler = async (event, context) => {
  // Parse the payload object from the input event body
  const payload = JSON.parse(event.body);

  // Construct a message object with a text field containing the issue URL
  const message = {
    text: `Issue Created: ${payload.issue.html_url}`
  };

  // Define options for the Slack API request
  const options = {
    hostname: process.env.SLACK_URL, // The Slack API URL
    method: 'POST', // The HTTP method to use
    headers: { // Headers to include in the request
      'Content-Type': 'application/json'
    }
  };

  // Make an HTTPS request to the Slack API using the defined options
  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    // When the response ends, log the data to the console
    res.on('end', () => {
      console.log(JSON.parse(data));
    });
  });

  // Log any errors that occur during the request
  req.on('error', (error) => {
    console.error(error);
  });

  // Send the message object as a JSON string in the request body
  req.write(JSON.stringify(message));

  // Close the request
  req.end();
};

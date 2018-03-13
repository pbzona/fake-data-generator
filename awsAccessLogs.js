const fs = require('fs');
const faker = require('faker');
const shortid = require('shortid');
const moment = require('moment');

// params for the fake log
const numberOfLines = 300;
const outfile = './awsAccessLogs.txt';

// FORMAT:
// timestamp elb client:port backend:port request_processing_time backend_processing_time response_processing_time elb_status_code backend_status_code received_bytes sent_bytes "request" "user_agent" ssl_cipher ssl_protocol
// for reference: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/access-log-collection.html

// STATIC VALUES
const timestamps = getTimestamps(numberOfLines);
const elb = 'myLoadBalancer';
const frontPort = '443';
const backPort = '80';
const backends = ['11.0.0.5', '11.0.1.5']
const frontStatusCode = 200;
const receivedBytes = 0;

// these are static values for the request generation
const method = 'GET';
const protocol = 'https://';
const host = 'travelsalmon.com';
const hostPort = frontPort;
const httpVersion = 'HTTP/1.1';

// no way am i faking ssl cipher options, sorry
const sslCipher = 'DHE-RSA-AES128-SHA';

// FUNCTIONS
// generate a sorted array of timestamps
function getTimestamps(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(faker.date.recent());
  }
  return arr.sort();
}

// generate a fake processing time (used for both elb request and backend for simplicity)
function getReqTime() {
  return Math.floor(Math.random() * 1000) / 100000;
}

// generate a fake status code, weighted heavily toward 200s, but throw in some 404 for realism
function getStatusCode() {
  // the function provides a 1 in N chance of generating a 404 - the "seed" is N
  let seed = 8;
  let failure = Math.floor(Math.random() * seed);
  return Math.floor(Math.random() * seed) !== failure ? '200' : '404';
}

// generate random sent bytes - this is pretty much arbitrary
function getSentBytes() {
  let max = 60000;
  return Math.floor(Math.random() * (max * .66)) + (max * .33);
}

// generates a path for the request
function getPath() {
  let seed = Math.floor(Math.random() * 4);
  switch (seed) {
    case 0:
      return '/';
    case 1:
      return '/about';
    case 2:
      return '/login';
    case 3:
      return `/images/${shortid.generate()}.jpg`;
    default:
      return '/';
  }
}

// generate a request - format: "HTTP Method + Protocol://Host header:port + Path + HTTP version"
function getRequest() {
  return `"${method} ${protocol}${host}:${hostPort}${getPath()} ${httpVersion}"`;
}

// MAIN
function generateAccessLog(n) {
  // reset on each run
  fs.writeFileSync(outfile, '');
  for (let i = 0; i < n; i++) {
    let row = `${moment(timestamps[i]).toISOString()} ${elb} ${faker.internet.ip()}:${frontPort} ${i % 2 === 0 ? backends[0] : backends[1]}:${backPort} ${getReqTime()} ${getReqTime()} ${getReqTime()} ${frontStatusCode} ${getStatusCode()} ${receivedBytes} ${getSentBytes()} ${getRequest()} "${faker.internet.userAgent()}" "${sslCipher}" TLSv1.${i % 6 !== 0 ? '2' : '1'}\n`;

    fs.appendFileSync(outfile, row)
  }
}

generateAccessLog(numberOfLines);
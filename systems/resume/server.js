import { exec as _exec } from 'node:child_process';
import fs from 'node:fs/promises';
// Import the built-in http module
import { createServer } from 'node:http';
import path from 'node:path';
import { promisify } from 'node:util';

import { fetchResumeJson, resumeToLatex } from './resume-to-latex.js';
import { generateResumeToPDF } from './resume-to-pdf.js';
import { PUBLIC_FOLDER } from './workspace.js';

const exec = promisify(_exec);
async function handleATSResumeToPDF(req, res) {
  const { headers, url } = req;
  const requestUrl = new URL(url, `http://${headers['host']}`);
  const tailorResumeId = requestUrl.searchParams.get('tailorResumeId');
  process.env['VITE_RESUME_SOURCE'] = `${tailorResumeId}.json`;
  const pdfPath = path.join(PUBLIC_FOLDER, `ats-${tailorResumeId}.pdf`);
  await fetchResumeJson()
    .then(resumeToLatex)
    .then(resumeLatex =>
      fs.writeFile(`${PUBLIC_FOLDER}/${tailorResumeId}.tex`, resumeLatex),
    );
  await exec(
    `(cd ${PUBLIC_FOLDER} && pdflatex -jobname="ats-${tailorResumeId}" ${tailorResumeId}.tex)`,
  );
  fs.readFile(pdfPath)
    .then(content => {
      res.writeHead(200, {
        'Content-Disposition': `attachment; filename="ats-${tailorResumeId}.pdf"`,
        'Content-Type': 'application/pdf',
      });
      res.end(content);
    })
    .catch(err => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: 'Could not read the generated PDF',
          message: err.message,
        }),
      );
    });
}

async function handleResumeToPDF(req, res) {
  const { headers, url } = req;
  const requestUrl = new URL(url, `http://${headers['host']}`);
  const tailorResumeId = requestUrl.searchParams.get('tailorResumeId');
  process.env['VITE_RESUME_SOURCE'] = `${tailorResumeId}.json`;
  const pdfPath = path.join(PUBLIC_FOLDER, `${tailorResumeId}.pdf`);
  await generateResumeToPDF(path.join(PUBLIC_FOLDER, `${tailorResumeId}.pdf`));
  fs.readFile(pdfPath)
    .then(content => {
      res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${tailorResumeId}.pdf"`,
        'Content-Type': 'application/pdf',
      });
      res.end(content);
    })
    .catch(err => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: 'Could not read the generated PDF',
          message: err.message,
        }),
      );
    });
}

// Create the HTTP server
const server = createServer(async (req, res) => {
  const { headers, method, url } = req;
  const requestUrl = new URL(url, `http://${headers['host']}`);
  // Set the default headers for the response
  res.setHeader('Content-Type', 'application/json');

  const routeExists =
    ['/api/resume/ats-resume-to-pdf', '/api/resume/resume-to-pdf'].includes(
      requestUrl.pathname,
    ) && method === 'GET';

  if (!routeExists) {
    // Handle 404 for unhandled routes
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
    return;
  }
  if (requestUrl.pathname === '/api/resume/resume-to-pdf') {
    await handleResumeToPDF(req, res);
  }
  if (requestUrl.pathname === '/api/resume/ats-resume-to-pdf') {
    await handleATSResumeToPDF(req, res);
  }
});

// Define the port to listen on
const PORT = 8080;

process.env['VITE_IS_TAILORED_RESUME'] = JSON.stringify(true);
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

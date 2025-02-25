import * as cheerio from 'cheerio';

const portfolioBaseUrl = 'https://neviaumi.github.io/';

function sanitizeHtml(html) {
  const $ = cheerio.load(html);
  $('script').remove();
  $('style').remove();
  return $.html();
}

function onlyAccept2XXResponse(resp) {
  if (!resp.ok) {
    throw new Error(`HTTP Error ${resp.status()}: ${resp.statusText()}`);
  }
  return resp;
}

export function loadResumeJSON() {
  return fetch(new URL('/portfolio/resume.json', portfolioBaseUrl))
    .then(onlyAccept2XXResponse)
    .then(resp => resp.json());
}

export function loadHomePage() {
  return fetch(new URL('/portfolio', portfolioBaseUrl))
    .then(resp => resp.text())
    .then(sanitizeHtml);
}

export function loadCoreValuePage() {
  const url = new URL('/portfolio/core-values', portfolioBaseUrl);
  return fetch(url)
    .then(onlyAccept2XXResponse)
    .then(resp => resp.text())
    .then(sanitizeHtml);
}

export function loadSkillPage() {
  return fetch(new URL('/portfolio/skills', portfolioBaseUrl))
    .then(onlyAccept2XXResponse)
    .then(resp => resp.text())
    .then(sanitizeHtml);
}

export function loadExperiencePage() {
  return fetch(new URL('/portfolio/experiences', portfolioBaseUrl))
    .then(onlyAccept2XXResponse)
    .then(resp => resp.text())
    .then(sanitizeHtml);
}

export function loadFAQPage() {
  return fetch(new URL('/portfolio/faq', portfolioBaseUrl))
    .then(onlyAccept2XXResponse)
    .then(resp => resp.text())
    .then(sanitizeHtml);
}

# Scraper Frontend

## Overview

Simple frontend to analyze webpages. Takes a link and finds the html version, title, headers, internal and external links. Also checks if the page is a login page or not.

## Features
- HTML Version Detection: Identifies the HTML version of the document.
- Page Title Extraction: Extracts the title of the web page.
- Headings Count: Counts the number of headings grouped by heading level (e.g., <h1>, <h2>, etc.).
- Hypermedia Links Analysis: Counts the number of internal and external links.
- Login Form Detection: Detects the presence of a login form on the page.
- Link Validation (Optional): Validates the availability of each linked resource and handles redirections.

## Installation

This installation assumes you already have a backend up and running, for testing purposes only the backend is hardcoded to [http://localhost:5000/api/analyzerHTML]

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
### Steps
Clone the repository:
`git clone https://github.com/Yagi91/Webylyzer`
`cd web-page-analyzer`

#### Install dependencies:
`npm install`

#### Usage
Start the server
`npm run dev`
Build the code
`npm run build`
The server will start on [http://localhost:5173]("Go to definition").

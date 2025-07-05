# Website Performance Analyzer

[![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Puppeteer](https://img.shields.io/badge/puppeteer-%2338B2AC.svg?logo=puppeteer&logoColor=white)](https://pptr.dev/)

A comprehensive web performance analysis tool that measures critical website metrics including load time, page size, and resource requests.

![Demo Screenshot](./screenshot.png)

## Features

- ⚡ **Real-time Performance Metrics**
  - Total page load duration
  - Aggregate resource size (HTML, CSS, JS, images)
  - Number of HTTP requests
- 📊 **Resource Breakdown**
  - Detailed analysis by resource type (scripts, images, stylesheets, etc.)
  - Size and request count per resource category
- 🔍 **Headless Browser Analysis**
  - Uses Puppeteer for accurate real-browser measurements
  - Captures lazy-loaded content and dynamic resources
- 🎨 **Modern UI**
  - Clean, responsive interface
  - Visual metrics cards
  - Color-coded resource breakdown

## How It Works

```mermaid
graph TD
    A[React Frontend] -->|Sends URL| B[Express Backend]
    B -->|Launches| C[Headless Chrome]
    C -->|Navigates to URL| D[Collects Metrics]
    D -->|Calculates| E[Performance Data]
    E -->|Returns| B
    B -->|Sends| F[Formatted Results]
    F -->|Displays| A
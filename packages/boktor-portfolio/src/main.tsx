import { PostHogProvider } from 'posthog-js/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './app/app';

import { PostHogConfig } from 'posthog-js';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const options = {
  api_host: process.env.NX_PUBLIC_POSTHOG_HOST,
} as PostHogConfig;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <PostHogProvider apiKey={process.env.NX_PUBLIC_POSTHOG_KEY ?? ''} options={options}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>,
);

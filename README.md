# Personal Portfolio Website

A responsive portfolio website starter built for the Internal Assessment Project. It includes Home, About, Skills, Projects, Contact, project search and category filters, a persistent light/dark theme switch, and an API-backed portfolio assistant.

## Profile details

The site is personalized for Abdul Quavi in Kota, a 12th Standard student at Indira International School. It lists Python, JavaScript, TypeScript, C++, and C, and uses the supplied GitHub and LinkedIn profiles and email address. The profile photo is loaded from the public GitHub avatar.

The assignment describes five course projects, but I could not match those project names to public repositories on the supplied GitHub profile. I checked the public repository list and confirmed that `Rent-read` is a clothing storefront, so it is not linked as the book reading list. The five assessment cards are present, with repository and live-app links left unconfigured until their correct URLs are known. Add those links in `profile.js`.

## Technologies and features

- HTML, CSS, and vanilla JavaScript
- Search across project names, descriptions, and technologies
- Category filters and live result counts
- Light/dark mode saved in browser storage
- Responsive layout for mobile and desktop
- Vercel serverless API route for the chatbot; the API key is kept server side
- Portfolio data supplied to the assistant as grounding context; the email and avatar are excluded from the API context

## Run locally

For the static pages, serve this folder with any local web server, for example `python -m http.server 8000`, then open `http://localhost:8000`. The chatbot route requires Vercel's local development server (`vercel dev`) and an `OPENAI_API_KEY` environment variable. Do not put a secret key in `profile.js` or any public file.

## Configure the chatbot

1. Add `OPENAI_API_KEY` to Vercel Project Settings → Environment Variables for Preview and Production.
2. Optionally set `OPENAI_MODEL`; the default in the function is `gpt-4.1-mini`.
3. Redeploy after adding or changing environment variables.

The browser calls `/api/chat`; the server function sends the visitor's question and relevant portfolio facts to the OpenAI Responses API. The API key stays in a server-side environment variable. Errors return a visitor-friendly message, and the function refuses to invent missing portfolio details. The default model is `gpt-6-luna`; set `OPENAI_MODEL` if you need another model available to your API project.

## Publish to GitHub and Vercel

1. Confirm the five assignment repository URLs and the book-list live URL; add them to `profile.js`. Descriptions are assignment-based and should be checked against your actual repos.
2. Create a GitHub repository, then from this folder run `git init`, `git add .`, `git commit -m "Build personal portfolio"`, `git branch -M main`, and `git remote add origin <your-repository-url>` followed by `git push -u origin main`.
3. Import the GitHub repository into Vercel. The project is a static site with a `api/chat.js` serverless function; no build command is required.
4. Set the chatbot environment variable in Vercel, deploy, and test the deployed page, mobile layout, project links, search, filters, theme toggle, and chatbot.

## Assignment checklist

- [ ] Replace all personal details with verified information
- [ ] Add a genuine profile image if required by the course
- [ ] Confirm each of the five project descriptions against its repository
- [ ] Add working links to all five GitHub repositories
- [ ] Add the reading-list deployed app link when available
- [ ] Push the portfolio to your GitHub account
- [ ] Deploy from GitHub to Vercel and enter the API key in Vercel settings
- [ ] Verify all links, API response, and mobile/desktop layouts

This folder has not been pushed to GitHub or deployed to Vercel because those actions require your accounts and verified URLs.
# prompt-portfolio-

# Levrx UI Assignment


## Overview

The app is navigated via React-Router and uses React/TS with Axios client-side and Express (to load the JSON) server-side. The Medication List is treated as the user's "homepage", there is no Navbar to navigate the site given the intended design for the project. The Pharmacy Comparison page is on a different route than the med list, although could be placed side-by-side. A list of additional features that was thought perhaps useful but too much to implement or niche for users is listed below:

- Medication List
-- Filter/list sort for type of tablet
-- Alert-like text shown when the user is not on the most cheap pharmacy
-- Put meds that user is not on the cheapest plan as an additional list sort


- Pharmacy Comparison
-- Search by pharmacy name
-- Sort by pharmacy distance to entered/stored user location
-- Additional details of pharmacy (PN, email) easy-to-contact

## Installation

AI confirms requirement of Node ^20.19.0 or >=22.12.0.

In the `demo-ui` directory, run the following command

```sh
npm ci
```

This should install the needed dependencies, including React, React-Router, Express.js, Axios, TypeScript. 


## Run locally

In the `demo-ui` directory, start the server and frontend in separate terminals:

```sh
npm run server
npm run dev
```

The client runs on localhost:5173. Server listens on port 3001 and provides:

- `GET /meds` — all medications with pharmacy data.
- `GET /meds/preview` — all medication fields except pharmacy data.
- `GET /med/:medID` — one medication, including pharmacy data; returns 404 if the ID is unknown.


## AI and Site Reference Usage

Generally used on tedious issues as well as on rarer occasions when I suspected an obvious way to improve (I coded 95% of this). I also referenced the Levrx site for general themes and neat designs.


- Server & Client
-- I put in the endpoints as well as setup (server start function)
-- I told it to generate the responses and error for each one since it was simple
-- Handled error cases on client, obvious try-catch and status errors
- Loading Pages
-- All of it, knew the logic and just wanted something decent to fill in the page.

- Alignment & Styles
-- Applied better usage of display grid vs flex, trying to apply flex with different justifying (notably in Pharmacy Compare component details vs price) and instead used grid-columns. Took advice by AI to do after failing with flex.
-- Some styles are leftover by the default Vite configuration, I don't remove all of it initially if I think some looks clean.


- Button
-- Color changing button inspired by Leverx main page, didn't duplicate it fully. 

- Colors
-- Theme of Leverx in some cases
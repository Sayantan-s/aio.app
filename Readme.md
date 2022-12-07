# Guidlines

Run `yarn start:scratch` to build the frontend and run the dev server.
<br />
<br />

# Design

<b>Took inspirations from the below designs</b>

![x](https://cdn.dribbble.com/users/268582/screenshots/19835281/media/dc80f1209beb1716a0d1ba363dd36588.png?compress=1&resize=1600x1200&vertical=top)
![y](https://cdn.dribbble.com/users/209146/screenshots/15739263/media/3f3a541b206c67346a43cf849fb506e1.jpg?compress=1&resize=1600x1200&vertical=top)
<br />
<br />

# Architecture

## Techstack

- <i><b>Vite</b></i>, the ESM based bundling tool provides with faster cold starts, better HMR in comparison to webpack and optimized Build <br />
- <i><b>Typescript</b></i> works like a band-aid on javascript which contributes to better code maintainability, fewer bugs and good DX.<br />
- <i><b>Tailwindcss</b></i>, a low level css framework with zero runtime which is highly customizable and build optimized by purgeCSS.<br />
- <i><b>Axios</b></i>,a very customisable data fetching solution with superpowers of creating multiple instances which might come in handy as the project scales.<br />

## Application Architechture

- Dataflow and Working: https://whimsical.com/7yBSx9BRcsHGNeeDXJV9DT
- Created a generic table component instead of using the semantics cause flexbox skills were mandatory in the JD, followed the "children as function" pattern to achieve it.
- Tried to modularise the code as much as possible.

# Improvements Required

- Its better to maintain a bi-directional connection, incase of the quotes page using websockets, cause when the quotes expire, if it becomes a 1000 clients and one server, the server might recieve a 1000 requests almost at the same time, which may crash the server if not properly load balanced. So, its better to maintain a p2p connection and handle the quotes expiry in the backend and whenever the quotes expires,emit a message with the new updated instrument quote data, which will be received from the frontend and potraited in the UI. Hence the data flows from server to the clients only.
- Better to use semantics in case of the table if the page needs to have SEO benefits or else keeping it generic but making the whole component polymorphic and leaving it to the developer to decide it's tag using the 'as'(convention) prop.

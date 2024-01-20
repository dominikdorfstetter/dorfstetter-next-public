# Dorfstetter.at | My personal website

This project is used to build my own personal [website](https://dorfstetter.at/).
Feel free to use any snippets you find interesting, or the whole project to build your own web-project.

## Project Structure

### /

The root of the project contains next-config, jest-config and other files needed to configure the project and it's tools.

### /src

Contains the logic of the project & our middleware.

#### /app

##### /

Contains global files & globally used utility functions.

##### /i18n

Files needed to resolve language based operations and initializing our translation.

#### /[lng]

The real logic behind every single page, global components and styles.

### /public

Assets used by the application, also includes language files for translation.

### /favicon

Favicon, Icons and web manifest.

### /fonts

Fonts are included directly in the project.

### /icons

Icons used for the application.

### /img

Logos, images that shouldn't be loaded from the cdn.

### /locales

The language files for the entire application.

## Prerequisites / Technologies Used

- [Next.js](https://nextjs.org/) as a frontend-technology
- [Strapi](https://strapi.io/) as a backend server/headless cms system
- [Jest](https://jestjs.io/) as a frontend test-runner
- [SCSS](https://sass-lang.com/documentation/) for stylesheets

## Installation

1. Clone the repo

   ```bash
   git clone https://github.com/dominikdorfstetter/dorfstetter-next-public.git
   ```

2. Install NPM packages
   ```bash
   npm install
   ```

## Usage / Getting Started

### Start the project in development mode.

```bash
npm run dev
```

### Build the project

```bash
npm run build
```

## Testing

Every new component or any existing component that gets refactored needs to have at least a test,
that creates the component and checks if it is created.

### How to run the tests

```bash
npm run test
```

### How to run the tests in watch mode

```bash
npm run test:watch
```

## License

MIT

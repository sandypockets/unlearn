
# Unlearn
Unlearn is a simple educational web application that challenges what you thought you knew. Using AI to explore facts through predefined categories, Unlearn helps illustrate that knowledge is not static.

![Unlearn](https://github.com/sandypockets/unlearn/blob/main/docs/unlearn.png?raw=true)

## How to Use

1. **Select a Year**: Use the year picker to choose the year you graduated high school.
2. **Choose a Category**: Pick a category to narrow down the types of facts you're interested in.
3. **Discover**: Hit the 'Find out what's changed' button and uncover a fact that has been discovered or significantly changed since the selected year.

## Tech Stack
* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [OpenAI API](https://beta.openai.com/)
* [react-datepicker](https://www.npmjs.com/package/react-datepicker)
* [framer-motion](https://www.framer.com/motion/)
* [prettier](https://prettier.io/)

## Installation
To set up the project locally, follow these steps:

1. Clone the project:
```bash
git clone https://github.com/sandypockets/unlearn.git
```
2. Change into the project directory:
```bash
cd unlearn
```
3. Install dependencies:
```bash
yarn
```
4. Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
5. Add your OpenAI API key to the `.env.local` file:
6. Start the application:
```bash
yarn dev
```

The application will start and be available at `http://localhost:3000`.

## License

MIT. See `LICENSE` for more information.
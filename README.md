## Scratch pad 📝

- Add note about usage of .env.example (don't forget your envs!) 
- Suggestion for telemetry errors


  Assumptions about the data:
  
  Stops by force:
  - 
  - 

## Police API shortfalls

1. Stops by force:

1.1. outcome_object: not explicitly mentioned in the API response description

1.2. Inconsistency in descriptions i.e. officer_defined_ethnicity doesn't mention being nullable in the description (like other property descriptions) however, in the example/responses it may be null. To be as type safe as possible, i've treated all the *Stop* type's keys were treated as nullable.

❗As of 12/08/25...

1.3. 05/25 is the last available month, yet 06/25 contradicts their docs (returns [] instead of the *latest* data)

- https://data.police.uk/api/stops-force?date=2025-06&force=leicestershire
		
1.4. 07/25 actually returns a 502 error instead of an empty array like above nor the latest data

- https://data.police.uk/api/stops-force?date=2025-07&force=leicestershire
		
1.5. Not passing the date search param doesn't default to the latest month (it's response is incorrect)

- https://data.police.uk/api/stops-force?force=leicestershire


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

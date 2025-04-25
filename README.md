# Ulearna Ecommerce Site

## Installation

```
npm install
npx prisma migrate reset
npx prisma db push
npm run dev
```

## Getting Started
- Route to the catalogue page
- Click the seed products button
- Refresh the page, and you'll see the seeded products, then you're good to go

### Testing errors
- Seed products again to check how I handled the error with file logging
- Try adding products to cart before creating a user to see how I handled errors with user friendly toast notifications

## Guide
- You can preview products by clicking on the right arrow icon on the top right of the product cards
- Zoom in and drage within the image to see detailed pictures
- To add products to cart, you need to choose user with the button <strong>Choose User</strong> on the top right corner of the page
- To check your cart click on the cart button on the top right
- Click on <strong>Confirm Order</strong> to save your cart
- You can navigate to the dashboard to see the analytics of with tables and chart

## Technical Description
- Tech Stack - Next js | next-safe-actions | Tanstack Query | Shadcn | Zod | Prisma | recharts
- There are unused custom fetching and mutation hooks to showcase how I'm used to using tanstack 

- From the advanced features I worked on Custom management to manage the user and cart data
- From the bonus points I've worked on Dark/Light mode and Custom persistent error logging to the /log folder of the project to make it easier to track the trace of logs and integrate tracking and logging services like winston

### PS:
      To showcase how I work with version control systems checkout my prs, commit messages, and branch naming



### Looking forward to explaining the project and showcasing my skills!  

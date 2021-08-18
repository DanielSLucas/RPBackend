# RP API - Rental of Materials

This system is intended to facilitate the management of a rental company that rents materials for parties such as fake cakes, artificial flower arrangements, etc.

***The user of this system will not be the end customer (lessor), but the manager and/or employee responsible** **for scheduling the rents.**

Among the functions:

- Stock of products;
- List of customers and addresses;
- Users with different roles;
- Listing of rentals.
- Creating a rental:
   - The rent takes place on a specific date, so the rented products are only unavailable on the specified day.
   - The rent belongs to a customer.
   - The rent can contain a delivery address, or use the same address as the customer. otherwise it will be
     considered that the products will be picked up from the company responsible for the rental.
   - Based on the date received, the available products are listed with the available quantity.
   - The product has a price at the time it is registered in the database, but the price for a rental may vary, so
     in addition to the quantity, it is possible to define the price of the product when adding it to the order.
   - Final amount, payment status and payment method must also be defined when creating a rental.

## Running project locally

**To run this project you should have nodejs and docker & docker-compose installed.**

```bash
  # Clone this project
  git clone https://github.com/DanielSLucas/RPBackend.git

  # Change to the project directory
  cd RPBackend

  # Install dependencies
  npm i
  # OR
  yarn

  # Run docker containers
  docker-compose up -d

  # Run dev script
  npm run dev:server
  # OR
  yarn dev:server

```

## Scripts

```bash
    # Creates the production version of the API, with all files converted from .ts to .js
    yarn build

    # To run the application localy
    yarn dev:server

    # To use typeorm CLI
    yarn typeorm

    # To create an ADM user in the database
    yarn seed:admin

    # To create the pickup address in the database
    yarn seed:address

    # To run all unit/integration tests and create coverage folder (databases should be runnin for this)
    yarn test
```

## Docs

This API is documentend with swagger. Once the server is up you can access the route
`/api-docs` to view this API documentation.

*Or access the file `docs.md`.

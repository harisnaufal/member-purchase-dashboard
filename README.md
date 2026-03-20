# Member Purchase Insights Dashboard

This is a small front-end project that displays and analyzes member purchase data for an internal admin use case.

The goal of this page is to allow users to:

- browse purchase records
- filter and sort the data
- quickly understand key insights through summary and aggregation

---

## Features

### 1. Purchase Table

- Displays all purchase records
- Includes columns: Transaction ID, Member Name, City, Category, Amount, Quantity, Date, Status
- Supports sorting by:
  - Amount
  - Date

### 2. Filters

- Search by member name
- Filter by:
  - City
  - Category
  - Status
- Filters can be combined
- Includes a **Reset Filters** button to return to default state

### 3. Summary Section

Based on the currently visible (filtered) data:

- Total number of transactions
- Total paid amount
- Total paid quantity
- Top category by paid amount

Only `paid` transactions are treated as revenue.

### 4. Aggregation

- Paid amount grouped by city
- Calculated from the currently visible data

---

## Tech Stack

- Next.js (App Router)
- React (with hooks)
- TypeScript
- CSS (global styles)

---

## Project Structure

app/
page.tsx

components/
aggregation/
filter/
summary/
table/
skeleton/

data/
purchase.ts

helpers/
aggregation.ts
filter.ts
summary.ts
utils.ts

types/
purchase.ts

---

## Assumptions & Notes

- Only paid transactions are counted as completed revenue
- Other statuses (pending, cancelled, refunded) remain visible in the table
- All calculations are done on the client side
- The dataset is static and stored locally

## Tradeoffs

- No pagination is implemented since the dataset is small
- No chart library is used to keep the implementation simple and focused
- Styling is kept minimal to prioritize clarity and functionality

## Possible Improvements

If extended further, the following could be added:

- Pagination for larger datasets
- Charts for visual insights
- Unit tests for filtering and aggregation logic
- API integration instead of static data

--

## How to Run

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Install dependencies

```bash
npm install
npm run dev

Then open:
http://localhost:3000

```

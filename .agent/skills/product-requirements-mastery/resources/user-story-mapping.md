# User Story Mapping Guide

How to break down a big feature into deliverable slices.

## The Concept
User Story Mapping avoids the "Flat Backlog" problem where context is lost. It visualizes the user's journey.

## Structure

### Level 1: The Backbone (User Activities)
The chronological high-level steps.
*Example for E-commerce:*
`Browse Products` -> `Add to Cart` -> `Checkout` -> `Track Order`

### Level 2: The Skeleton (User Tasks)
 Specific things the user does under each Activity.
*Under "Checkout":*
- Enter Address
- Select Payment Method
- Review Order
- Confirm

### Level 3: The Verticals (Release Slices)
Prioritize tasks into releases (MVP, v2, v3).

**Release 1 (MVP)**:
- [x] Enter Address (Manual entry)
- [x] Select Payment (Credit Card only)

**Release 2**:
- [ ] Address Auto-complete (Google Maps API)
- [ ] Paypal Support

## How to use this as an Agent
When a user gives you a complex task:
1. **Identify the Backbone**: What is the start and end of the user flow?
2. **List the Tasks**: Fill in the middle.
3. **Slice the MVP**: Ask the user "What is the absolute minimum we need for v1?"

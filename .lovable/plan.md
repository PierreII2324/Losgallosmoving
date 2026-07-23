# Los Gallos Movers — Website Plan

A multi-page marketing site with a shared header/footer, bold Colorado-inspired branding (sunset coral → red rooster accent, deep navy text), and separate routes so each page is SEO-friendly.

## Design direction

- Palette: warm coral/sunset gradient accents, red primary (matching the rooster logo), off-white background, deep charcoal text.
- Typography: bold italic display for headings (echoing the uploaded flyer), clean sans for body.
- Header with logo + nav (Home, About, Gallery, Team, Reviews, Quote, Contact) + phone CTA "720-469-6078".
- Footer with contact info, phone numbers, email placeholder, service area.

## Routes

```text
src/routes/
  __root.tsx       (shared header + footer, updated meta)
  index.tsx        Home — hero with skyline + rooster, tagline, CTA to Quote, highlight strip (About/Team/Reviews teasers)
  about.tsx        Company story, mission, why choose us, service list
  gallery.tsx      "On the Job" photo grid (placeholder images, lightbox-style hover)
  team.tsx         Team member cards (placeholder photos, name, role, short bio)
  reviews.tsx      Customer review cards with star ratings (placeholder testimonials)
  quote.tsx        Free quote form (UI only): name, phone, email, move date, from/to ZIP, home size, notes → shows toast on submit
  contact.tsx      Phone (720-469-6078), dispatch phone placeholder, business email placeholder, service area, hours, contact form placeholder
```

## Shared components (`src/components/`)

- `SiteHeader.tsx` — logo mark + nav + phone CTA, mobile hamburger via shadcn Sheet.
- `SiteFooter.tsx` — contact summary, nav, copyright.
- `SectionHeading.tsx` — reusable eyebrow + heading pattern.

## Content placeholders

- Team: 4 members with generated portrait-style images.
- Gallery: 6–8 generated moving/job photos.
- Reviews: 6 fabricated testimonials with 5-star ratings, clearly swappable.
- Contact: phone `720-469-6078`, dispatch `(add second number)`, email `info@losgallosmovers.com` — all clearly marked as placeholders for you to replace.

## Design system

- Update `src/styles.css` tokens: primary red (rooster), sunset gradient variable, warm neutral background, dark foreground. Keep dark mode tokens sensible but design targets light mode.
- All colors via semantic tokens (no hardcoded hex in components).

## SEO / meta

- Update `__root.tsx` defaults to Los Gallos Movers branding.
- Each route sets its own `head()` with unique title, description, og:title, og:description.
- Home hero image also wired as og:image on `/`.

## Assets

- Generate: hero skyline+rooster composite, rooster logo mark (transparent PNG), 4 team portraits, 6 job photos. Stored as Lovable Assets and imported.

## Out of scope (this pass)

- No backend: quote form is UI only (toast confirmation, no email/db).
- No CMS: content is hardcoded placeholders you can edit later.
- No blog/booking system.

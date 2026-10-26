# Editing the site

All the words on the site live in the `content/` folder. You never need to touch
anything else to change the text.

You can edit these files directly on github.com — open the file, click the pencil
icon, make the change, and click "Commit changes". The site redeploys itself in
about a minute.

## Which file is which

| File | What it controls |
|---|---|
| `content/profile.ts` | Your name, the two-line wordmark in the top-left, your role, the intro paragraphs, and the city/timezone in the footer |
| `content/projects.ts` | The projects: title, the small grey line next to it, the images, and the paragraphs that appear when someone clicks the `+` |
| `content/experiences.ts` | The job history rows |
| `content/expertise.ts` | The list under "expertise" |
| `content/contact.ts` | The links at the bottom |

## The rules

Text always sits between quote marks, and every line ends with a comma:

```ts
"I'm a systems thinker.",
```

If your text contains an apostrophe, that's fine — the quotes are double quotes,
so `"I'm"` works. Just don't delete the quote marks or the comma.

To remove something, delete its whole line. To add one, copy an existing line and
change the words.

## Things marked TODO

A few places say `TODO`. Those are things I couldn't find and didn't want to
invent — mostly your job dates and titles. Search the `content/` folder for
"TODO" and replace them with the real thing.

## Adding a project image

1. Put the image file in `public/work/<project>/`
2. In `content/projects.ts`, copy one of the `import` lines at the top and point
   it at your new file
3. Add it to that project's `media` list with a short `alt` description

Images can be any shape — the strip sizes each one to its own proportions.

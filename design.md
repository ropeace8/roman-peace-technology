# Pax Romana Tech Design

## Requirements
- Minimalist clean design (dark theme)
- Logo
- About Me Page 
- All posts page (grid style view)
    - Shown by timestep
- Posts by Project tab
    - Lists posts by project type, where I might have multiple posts for a project.
    - Ex. similar to a playlist view on Youtube.
- Easter eggs perhaps
    - Cool ascii eyes that follow the cursor on main page. 
- All posts written in Markdown
    - Markdown renderer
    - Should be able to include images and sytax highlighted code in posts.

## Technical Design
- React App
 - SPA
 - Sass for styling
- Github Pages for hosting

## Visual Design
- Name + logo in top left
- About me link on the top right, followed by linkedin and email links (icons)
 - Little eye thing is in the top right
- Nice image
 - Header for All Posts vs Posts by Project
 - Grid display of articles
  - Thumbnail
  - Category
  - Title
  - Date 
  - Links to Article page
- Article page renders markdown (all images centered)
 - Content nicely centered in the page.
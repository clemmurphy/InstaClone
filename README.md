# InstaClone
### A full-stack Instagram clone built on the MERN stack

[Live on Heroku](https://clems-instaclone.herokuapp.com/)

![Capture](https://user-images.githubusercontent.com/25615907/141794787-a4979af9-f6db-4c5c-9ee5-c5bae7d5dafc.PNG)

## Brief
To create a full-stack web application using a relational MongoDB database, Express and NodeJS back end, and React front end.

## Technology
- React
- Express
- MongoDB
- NodeJS
- Cloudinary
- Heroku

## Overview
I wanted to create an Instagram clone that allowed users to register for an account, create posts by uploading media from their devices, follow and unfollow users, comment and like posts, and view posts in a timeline.

The key features are:
- User account registration and login
- Post and profile picture uploading to Cloudinary
- Adding comments to posts
- Liking posts
- Following and unfollowing users
- Viewing posts in three different timeline modes: most recent from your followed users, most popular globally, and most recent globally
- Mobile responsiveness

## Approach
### Back End
The main part of this project's functionality come from building relationships between users and posts, posts and likes or comments, and ensuring the data is correctly populated for each of these to be displayed. I created a custom Express API that routed my requests and provided the required information to the front end.

### React
Using React's states and modular components, I tracked each post's like status and ownership per user, ensuring that a user could not like a post more than once and that once a user liked a post, it showed up as liked in the UI immediately. This really helps the site feel more dynamic and easy to use.

### Mobile Responsive
As this app was created as a clone of Instagram, I had to ensure the design was responsive and everything worked well on smaller screens. I designed mobile-first, and added CSS rules for desktop afterwards.

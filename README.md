# Angular Blog Platform

A full-featured blog platform built with Angular and Firebase Firestore.
The project consists of two separate Angular applications:

1.  Blog Website (Blog-App)
2.  Admin Dashboard (ang-blog-dashboard)

------------------------------------------------------------------------

## Overview

This platform allows administrators to manage blog posts and categories
through a dedicated dashboard, while users can browse posts, filter by
category, and view individual articles on the public website.

The backend is powered by Firebase Firestore with real-time data
updates.

------------------------------------------------------------------------

## Applications

### 1. Blog Website (Blog-App)

Public-facing Angular application responsible for:

-   Displaying featured posts
-   Displaying latest posts ordered by creation date
-   Viewing posts by category
-   Viewing single post details
-   Counting post views
-   Subscribing via email
-   Static pages (About, Contact, Terms)

Routing Structure:

-   `/` → Home
-   `/category/:category/:id` → Posts by category
-   `/post/:id` → Single post
-   `/about`
-   `/contact`
-   `/term-conditions`

------------------------------------------------------------------------

### 2. Admin Dashboard (ang-blog-dashboard)

Angular-based admin panel for managing content.

Features:

-   Create new blog posts
-   Update existing posts
-   Delete posts
-   Mark / unmark posts as featured
-   Manage categories (create, update, delete)
-   Admin login form
-   Real-time Firestore integration

------------------------------------------------------------------------

## Technologies Used

-   Angular 18
-   Angular Router
-   Firebase Firestore (AngularFire)
-   RxJS
-   ngx-toastr (notifications)
-   Bootstrap (UI styling)

------------------------------------------------------------------------

## Firestore Collections

posts: - title - excerpt - postImgPath - category (object) - isFeatured
(boolean) - createdAt (timestamp) - views (number)

categories: - categoryName

subscribers: - email

------------------------------------------------------------------------

## Installation

### Run Blog Website

cd Blog-App npm install ng serve

Default URL: http://localhost:4200

------------------------------------------------------------------------

### Run Admin Dashboard

cd ang-blog-dashboard npm install ng serve

------------------------------------------------------------------------

## Firebase Setup

Update Firebase configuration inside:

src/environments/environment.development.ts

Ensure your Firebase project includes:

-   Firestore Database
-   Authentication (if required)
-   Proper security rules

------------------------------------------------------------------------

## Future Improvements

-   Implement persistent comment system
-   Add route guards for admin authentication
-   Add pagination and search
-   Improve Firestore security rules
-   Deploy using Firebase Hosting

------------------------------------------------------------------------

## License

This project is intended for educational and portfolio purposes.

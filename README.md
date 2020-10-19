# EldoCare

This project represents a medical portal where users can login/register and make appointments with doctors registered within the service.
I used JavaScript, React, HTML, CSS and Material-UI to build this front-end only application.

## Heroku Webpage

You can see it live here: https://eldorado-material.herokuapp.com/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Database

You will find a mock database file on /src/database/database.js were you can see, delete, or add new data using the same format of the object lists already there.

## App Usage

### Login/Register

You can sign in into the system using the credentials:
- E-mails:
  - rein@email.com
  - winston@email.com
- Password:
  - 1234

- Or, you can sign up for the system selecting the "Sign Up" option on the bottom of the page.
Once you finish registering you'll be automatically logged in.

![alt text](https://i.imgur.com/5Hjkx3k.png)

### See Doctors / Make Appointments

You can see the service's doctors that are available by selecting the "Doctors" section on the side-bar menu.

![alt text](https://i.imgur.com/td0gkkb.png)

- On the Doctors page, you will see the available doctors grouped by their medical field. 
  - Once you find the medic you want you can schedule an appointment with them by clicking on "Schedule" and selecting a date and time.
  
![alt text](https://i.imgur.com/2CdMFeo.png)

- Finally, you can add doctors by clicking on the button on the bottom of the page.
  - Add the name of the doctor and select one of our available specialties before saving their info on the system.
  
![alt text](https://i.imgur.com/6IXCFhr.png)

### See Appointments

- By selecting the "Appointments" section on the side-bar menu, you will see a table with all the upcoming appointments for the user logged in.
  - Go to the Doctors page, schedule a new appointment and come back to see it live on the table.

![alt text](https://i.imgur.com/KZ9vEGl.png)  

### Sign Out

- Once you're satisfied you can select the "Sign Out" section of the side-bar menu to sign out of the page and go back to the Sign In page.


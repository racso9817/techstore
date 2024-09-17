# Techstore

## steps to run the DJango REST API
- on the root folder:
  - run "docker compose up -d --build". Make sure you have ports 16001 and 3310 available
  - in case the database is not migrated, inside the container djangoapp-1 run "python manage.py makemigrations" and then "python manage.py migrate"
  - use http://localhost:16001/api/ to test the API

## steps for the Angular project
- go inside the folder techstore-front
- run "npm install"
- run "ng serve"
- use http://localhost:4200 to test the interface
- the frontend can toggle between dark and light themes, switch your browser theme to test this feature

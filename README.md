# Serverless DIARY

A simple DIARY application using AWS Lambda and Serverless framework.

# Functionality of the application

Pick your mood like(rad, good, meh, bad, or awful) and add activities like (friends, date, exercise, sport, relax, movies, gaming, reading, cleaning, sleep early, eat healthy or shopping) you have been doing during the day and also add notes.

This application allows creating/removing/updating/fetching DIARY items. Each DIARY item can optionally have an attachment image. Each user only has access to DIARY items that he/she has created.

# DIARY items

The application should store DIARY items, and each DIARY item contains the following fields:

* `diaryId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `mood` (string) - mood of the user (e.g. "Good")
* `activities` (string) - user writes the activites he did through the day (e.g. "Play tennis")
* `dayGoalDone` (boolean) - true if the user complete the day goal that he decided for that day, false otherwise
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a DIARY item

I also store an id of a user who created a DIARY item.

## Prerequisites

* <a href="https://manage.auth0.com/" target="_blank">Auth0 account</a>
* <a href="https://github.com" target="_blank">GitHub account</a>
* <a href="https://nodejs.org/en/download/package-manager/" target="_blank">NodeJS</a> version up to 12.xx 
* Serverless 
   * Create a <a href="https://dashboard.serverless.com/" target="_blank">Serverless account</a> user
   * Install the Serverless Framework’s CLI  (up to VERSION=2.21.1). Refer to the <a href="https://www.serverless.com/framework/docs/getting-started/" target="_blank">official documentation</a> for more help.
   ```bash
   npm install -g serverless@2.21.1
   serverless --version
   ```
   * Login and configure serverless to use the AWS credentials 
   ```bash
   # Login to your dashboard from the CLI. It will ask to open your browser and finish the process.
   serverless login
   # Configure serverless to use the AWS credentials to deploy the application
   # You need to have a pair of Access key (YOUR_ACCESS_KEY_ID and YOUR_SECRET_KEY) of an IAM user with Admin access permissions
   sls config credentials --provider aws --key YOUR_ACCESS_KEY_ID --secret YOUR_SECRET_KEY --profile serverless
   ```

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

# Postman collection

To run APIs, you can use the Postman collection that contains sample requests. You can find "DIARY.postman_collection.json" Postman collection in this project.

# AUTH Token 
Please use this auth token in postman eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImpLTkpfVWNScGtXMnQwQzdETmstYiJ9.eyJpc3MiOiJodHRwczovL2Rldi1lOXV5ODhxYS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTc0NDUxMzk3NzUyNjAyMjAyMjMiLCJhdWQiOiJ2UklLY1gyblUybnR5RzdPa211Y2JrU251ZTM4Y1l5bCIsImlhdCI6MTYyOTIzMzI0MSwiZXhwIjoxNjI5NjY1MjQxLCJhdF9oYXNoIjoiRVBpbG5FWTU4SjJESU5Ta3BwZTYwdyIsIm5vbmNlIjoia1FLM2dxMFphSFBqbFU2dzhRQUVwT2xYLTYuS1FvTGUifQ.oPlHIED_4NfDdpExz4_6C7_KmKiGzAowblDi8oML89UorMlpCEZ9U_94mDt2lQMdeDUEDf9DzEDhhgpf1lMNEjFUOLiJH1Nze3kVsFqScGeQTpEJGRtQAhnYbdnB6SZRHFCarEtzooRFucsIWMjtGRMZ_XMzXP2x1YUonGJEJhOLWjBkZekdJkjPI1gY3Ha5sHJ5pC6adyYeuT6COpNPaeDPnZuL_1oZ0E79PzRj2-FbelWoDZ3JSOiUzdIRqgsWt5K-65N3cgOARvh62HlQjb5vRCXhkm7kgjddXc5g8YexyqKeIe_CiotWo9I41dgHvVRtP_PCnvGdbVj4ngfImQ

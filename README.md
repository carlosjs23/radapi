# REST API Server for FreeRADIUS
A simple REST Server for the FreeRadius rlm_rest module based on node.js and Express.js Framework.

## Intro
This is a complete working API for the rlm_rest module that enables Freeradius to authenticate via http. In this particular case I used MySQL as the data storage, but essencialy any DB could be used. Logic for authentication is completely executed by the API. 

## Installation

#### Basics
Basicly we only need NodeJS, NestJS, MySQL and FreeRadius.

## The API in depth
All details, addicional info, endpoints an how the API works are described below.

### What can I do with it and how it works?
This API enables you to create and manipulate users and access profiles that can be authenticated with FreeRADIUS. It verifies information provided by the NAS to the radius server to decide if the user is authorized to authenticate and, if it's the case, passes attributes to the server (like max download speed, etc...).

This API comes ready to be used in a ISP scenario where you can add users, upload and download speed policies. But can be expanded to cover much more by simply expanding the DB schema and authentication logic.

### Endpoint
The API has two main categories as enpoints:

* Radius - *Used to communicate with the FreeRADIUS server.*
* DB Manipulation - *Used to create, edit and remove entries in the database.*

##### Radius endpoints

```/radius/check``` (GET) | Checks if the user exists in the DB, if true, 'Authorize' in FreeRADIUS succeeds and sets Auth-Type to REST.

```/radius/auth``` (GET) | Checks if password is correcct and executes login logic. If ok, send attributes to FreeRadius and authenticates the user.

```/radius/accounting``` (POST) | Receives accounting info from FreeRADIUS and logs it to DB.  *TODO*


##### DB endpoints

```/users``` (GET, POST) | GET: Lists all users in the DB | POST: Creates user

```/users/:userID``` (PUT, DELETE) | Updates or removes user.
	
```/profiles``` (GET, POST) | GET: Lists all profiles in the DB | POST: Creates profile
	
```/profiles/:profileID``` (PUT, DELETE) | Updates or removes profile.

### Securing your setup
This API doesn't have any security built-in. If you'll use it somewhere please modify it to include some sort of authentication.

This work is based on @fgsants [API](https://github.com/fgsants/REST-API-FreeRADIUS).
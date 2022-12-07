# Dog Social Networking App

This app is for dogs and their humans to make new friends! 

Moved to a new city and need to make new friends? Meet other people in your area with your furry best friend by your side! Create a profile about your dog and browse other dog profiles.

## Functionalities:
* Create user profile with user info and profile pic
* Add profile for your dog 
* See dogs in your area 
* Ability to click on other dog profiles and suggest meetups (and update on database)
* Ability to save other dogs to a favorites list (and update on database)
* If no available dogs in your area, see a randomly generated photo of a dog 
* stretch goal: filter dogs to display by gender, spayed/neutered status, breed

## AppUser model (for each user account)
* id (PK)
* email (username)
* name
* birthdate 

## Profile model (for each user profile)
* id (PK)
* user_id (OneToOne relationship with AppUser) 
* image

## Pet model (for each pet profile)
* id (PK)
* name
* birthdate
* breed
* gender 
* spayed/neutered status 
* personality 
* favorite activities 
* location (city) 
* user_id FK referencing AppUser id (OneToMany relationship)

# SentRequest model 
* (tracks meet up requests that a user sends)
* a user can have multiple sent requests but only one for each outside account  
* id (PK)

# ReceivedRequest model 
* (tracks meet up requests received from other users)
* (when a user sends another dog a meetup request, the request should be visible for both parties)
* a user can have multiple received requests but only one for each outside account  
* id (PK)

# Favorite model 
* (when a user's dog profile saves another dog's profile, it should show up on favorites list)
* a user's dog profile can have multiple dogs on their favorite list 
* a user's dog can be on multiple favorites lists 
* id (PK)

# Photo model
* (a user can upload photos of their dog onto their dog's profile)
* a photo can only belong to one user/dog profile
* a user can have many photos in their photo model 
* id (PK)

## (Tentative) Third party APIs: 
* Google photos API https://developers.google.com/photos (to upload photos of your dog) 
* The noun project https://thenounproject.com/ (for profile icons) ?
* The Dog API https://thedogapi.com/ (display random photo of a dog if no friends available) 

## Goals for next time:
* Location feature - have a populated list of cities people can choose from, or use zipcode that allows for certain radius
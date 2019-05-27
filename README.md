# FitnessAPP
fitness app built with React native
##notice
should never let the state of the redux to be an array!!!

## To be done
### bugs to be fixed
* sets of cardio 
* each library can not be empty(add problems);
* adjust to different smartphones (iPhone 8 ... Android)

### new functions
* change UI of the ExerciseList
* change ranks in currentWorkout  ？？？
* select month & year in calendar //calendar
* back to today in calendar   //calendar
* finish & congrats page
* dropdown -> selection & input 
* slide effects in swiping pics
* the main focus of exercise (chest/back ....)
* allow to add sets records for days before 

### etc
* consider the construct of the TabPage (whether display customWorkout firstly or not)

## completed
### functions
* deletable set data ✔️
* keep refreshing exercise category ✔️
* add more exercise ✔️
* delete exercise ✔️
* editable weight/reps list ✔️
* touchable search results ✔️
* week/month/6 months/year analysis ✔️
* swipe photos in progress ✔️
* deletable pics ✔️
* deletable exercise category ✔️
* exercise category validation (no duplication) ✔️
* loading icon in progress pics ✔️
* step counts -> HEALTH ✘
* position -> GPS ✘
* lazy loading of pics ✘
* delete function in each pic  ✔️
 (refresh after deleting
  after deleting the last pic return to Progress)
* delete one pic modal -> confirm modal✔️
* default empty page of progress ✔️
* editable sets in currentWorkout ✔️
* can't add the same exercise twice  -> reminderModal ✔️
* saved selection of exercises ✔️
* disable sets(back, chest...) button after adding(confirming) ✔️
* refresh addable icons after adding to currentWorkout/ clicking "finish" ✔️
* touch to add reps/weights in EditLibraryForSets ✔️
(give options: whether add to  the library or currentWorkout)  
* deletable category in EditLibrary and CustomWorkout ✔️
* editable library(add exercise to each sets from common ExerciseList
 give options: whether add to the library or currentWorkout) ✔️
* add new Category in EditLibrary ✔️
* different UI in EditLibrary and CustomWorkout ✔️
* update library once adding new exercise to specific category ✔️

### bugs
* position of photoModal ✔️
* blur on editSets (keys must be unique and can not be random)✔️
* refresh analysis when update today's workouts ✔️
  (newAllExerciseList-->redux
  completed-> change newAllExerciseList directly)
* headerTitle of PictureModal ✔️
* disable completed when there are no exercises in currentWorkout
(when delete all exercises)✔️
* white screen in calendar✔️
* avoid duplicated exercise when adding exercise sets from CustomWorkout ✔️
* white header when clicking back in stackNavigator ✔️
* avoid duplicated category ✔️
* upper and lower case of category ✔️
* transparency in PhotoModal ✔️

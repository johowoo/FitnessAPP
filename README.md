# FitnessAPP
fitness app built with React native
##notes
* should never let the state of the redux to be an array!!!
* use setParams to refresh state in NavigatorOptions(eg: header)

## main functions
* set scheduled notifications for workouts
* log workout history
* log and edit record weight/reps/sets data
* editable categories in exercises library (Chest, Back, Cardio ...)
* add a whole category of exercises to current workout in one time
* editable library
* Calendar component to record/edit workout history/plan
* analysis function
* weight/body fat rate charts
* progress photo(add data and photo at the same time)
* link data inputted with progress photo with weight/BFR charts


## To be done
### bugs to be fixed
//PickerCamera Line 82 (put showModal in redux)
* notification timing bugs
* sets of cardio 
* adjust to different smartphones (iPhone 8 ... Android)

* back button in congrats page

### new functions
* select month & year in calendar //calendar
* back to today in calendar   //calendar

* widget
* add custom workout to editHistory
* slide effects in swiping pics
* change ranks in currentWorkout  ？？？

* dropdown -> selection & input 
* the main focus of exercise (chest/back ....)??
* shadow of button in CurrentWorkout ?

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
* change UI of the ExerciseList ✔️
* allow to add sets records for days before ✔️
* illustrate the meaning of different markedDates on the top of Calendar ✔️
* finish & congrats page ✔️
* instructions in CurrentWorkout ✔️
* notification (set notifications for workout); ✔️

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
* check whether the pressedDate is before today  ✔️
* check wether the editHistory is empty before finish ✔️
* each library can not be empty, before added to CurrentWorkout(add problems)
(need to check that the library has exercises); ✔️
* set all Addable sets to true once the currentWorkout is empty(in delete case ); ✔️
* return to Progress instead of reminding it is the first pic ✔️
* sets of analysis (convert to int before calculation) ✔️
* update finish button in componentDidMount of CurrentWorkout ✔️
* clear all scheduled notification before setting new ones ✔️

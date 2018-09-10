### Required Setup:
<!-- Install Dependencies -->
1. Node Package Manager: `npm init`
2. React JS: `npm install react`
3. React DOM: `npm install react-dom`
4. React Router: `npm install react-router-dom`
5. Firebase (backend): `npm install firebase`
6. Yarn Package Manager: `yarn`

### Running the App
1. Open up command line interface
2. `cd` into the `src` folder
3. Type `yarn start`, press enter 
4. An instance of the application should load on your local host. 

### Using the App
1. Initally, there won't be any recordings. Enter in a recording title and click the `create` button.
2. You may not use spaces in your names otherwise the database has issues when retreiving. If you try to use a space, an alert message should drop-down. 
3. Once you create a recording, you may press the `view` button to view additional options
4. If there is no recording in the database, the `play` button will be faded out, indicating that the user should make a recording or delete the specific recording space from the database.
5. A user may record by pressing the `record` button. When recording, the button will turn red, and the x,y coordinates of the cursor will be stored on state in an array. 
6. A user may replay the recording by pressing `play`. If they want to redo it, they may press `record` to re-record their mouse movements. 
7. If the user wants to save the recording, they may press `save`. 
8. If the user wants to delete the recording or the title of the recording, they may press `delete`.
9. Once saved, the coordinate arrays are pushed to the firebase database and may be retreived when loading again, even if the localhost is disconnect and reloaded. 

### Notes about Firebase
1. There is a `50,000` daily cap on the reads and writes to the database. As of this commit, the quota for Monday 9/10 is at ~65% due to previous testing. 
2. Should you desire to test it yourself, be careful of how long each recording is, since you will not be able to view the data should you reach the daily cap. 
3. The cap resets at 12:00 am PST / 3:00 am EST.





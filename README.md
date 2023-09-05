# Control-System
Demonstration of fan coil units control within a building control management system

Running the project 

After running the "clone" command and downloading the files from GitHub, please enter the command "npm i" in the backend folder. 
Once the installation is complete, run the command "npm start". Then, open your browser and go to http://localhost:3030.

If you want to access through the frontend, you can run "npm i" followed by "npm start" in the frontend folder. 
The browser will automatically open with a request to port 3000.


General

The control system application - "Fan Coil Units", describes a part of a building control system, providing control and regulation 
of temperatures in various areas of the facility, including receiving alerts for abnormalities.

The application simulates a complex of four towers, each consisting of forty floors. each floor contains different areas and rooms 
with fan coil units, all connected via communication to the main control system.


Room control

The purpose of the system is to allow the operator to control climate and operate the fan coil units, in every room, in every floor, 
in every building at the complex.

Each fan coil unit has an operation line that shows the room temperature and the unit operation status. In the operation line, 
you can turn the unit on and off, set desired temperature, select the mode (cooling, heating, etc.), and select fan intensity.

All on-screen displays are received from database and all commands are sent to database, which simulates inputs and outputs 
that connect to real conditioning systems.

In addition, the system warns of a significant deviation between set desired temperature and room temperature, which indicates 
a malfunction that requires examination from the maintenance team. For this purpose, you need to define on the operation line, 
temperature deviation and duration until an alarm is started.

For example: if we set a desired temperature of 20 ℃, a temperature deviation of 3 ℃, and time to alarm of 20 seconds, 
when the room temperature is 23 ℃ for more then 20 seconds, the system will set off an alarm, an allarm display will show up 
on the operation line and a new alarm will be added to the events summary. When the temperature returns to desired range, 
the alarm display will be hidden, and the alarm in the events summary will change to closed status.

Important: because this is a virtual system, namely the database is not connected to a real air conditioning system, 
the room temperatures shown are obtained using a smart temperature generator algorithm, which simulates a changing temperature situation 
like real air-conditioned areas.


Login user

The system is provided with three user groups:

View only: Users for viewing only, are not authorized to make any changes.

Operation: Users authorized to operate the system fully but not authorized to perform editing changes, such as adding or deleting users."

Administration: a user with total authorization for all the application functions.

The list of users in the system, includes three fixed users who cannot be deleted or edited through the browser.

View: used for viewing only.
Login details: user name: "view", password: "1111"

Operator: authorized to operate the system.
Login details: user name: "operator" password: "2222"

Admin: a user with total authorization.
Login details: user name: "admin", password: "3333".

User login to the system is performed by clicking the 'Login user' button on the right side of the top menu on the screen.


User management

User Management Screen displays the complete list of registered users in the system. 
a user with appropriate permission will be able to define new users, permanently remove existing users, 
and also update passwords or permission levels for existing users.

Important: The three fixed default users cannot be modified or removed.

Adding a user: In the 'Add User' window, you need to set a username and password, select a permission level, and click 'Apply'.

Update user details: Clicking 'Update' on the user row will open the update window. you should change the desired details, 
such as password, permission level, or both, and click 'Apply'.

Permanently removing a user: Clicking 'Delete' on the user row will result in their deletion from the system.


Event summary

In this log, the last 3000 registered events are displayed, documenting temperature anomalies in different rooms within the facility.

Triggering an alarm: When there is a temperature deviation in a specific area that exceeds the defined threshold for a certain duration, 
an alarm will be triggered and logged with a timestamp indicating the start of the alarm.

Closing Alarm: When the temperature returns to the desired range, the alarm status changes to closed, 
with a timestamp indicating the closure timing.

Alarm Acknowledgement: When the user confirms receiving the alarm, the status changes to acknowledged, 
with a timestamp indicating the acknowledgement time.

Background Colors - The background color of the notification bar changes based on the status:
Open Alarm without Acknowledgement - Red background.
Open Alarm with Acknowledgement - Purple background.
Closed Alarm without Acknowledgement - Green background.
Closed Alarm with Acknowledgement - deleted from the log.

Event Management - Clicking on the alarm bar will open the Event Management window with the following options:

Ack selected - Acknowledge the selected alarm. Performing an Acknowledgement on a alarm that is already in a "Closed" status 
will permanently remove it from the event log.

Force End - Changing the status of the alarm to Closed forcefully, even if the temperature has not returned to the desired range yet. 
Forcing the closure of a alarm that is already in the "Acknowledged" status will permanently remove it from the event log.

Ack all alarms: Changing the status of all alarms in the log to "Acknowledged". This action will cause all alarms that are already 
in the "Closed" status to be deleted from the log. The alarms that are in an "Open" status will all be changed to a purple background color.



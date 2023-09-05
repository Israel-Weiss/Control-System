import { ReactElement } from "react"

interface Props { language: (val: boolean) => void }

export function AboutEn({ language }: Props): ReactElement {

    const scrol = (top: number): void => {
        window.scrollTo({
            top,
            behavior: "smooth",
        })
    }

    return <section>
        <section className='title'>
            <button className="button language" onClick={() => language(true)}>עברית</button>
            About System</section>
        <section className="screen-continer ">
            <div className="side-bar">
                <ul className="list">
                    <li><div className="key" onClick={() => scrol(20)}>General</div></li>
                    <li><div className="key" onClick={() => scrol(260)}>Room Control</div></li>
                    <li><div className="key" onClick={() => scrol(930)}>Login Users</div></li>
                    <li><div className="key" onClick={() => scrol(1520)}>User Manage</div></li>
                    <li><div className="key" onClick={() => scrol(1940)}>Event Summary</div></li>
                </ul>
            </div>
            <div className="text-continer">
                <p className="subtitle">General</p>
                <p className="txt">
                    The control system application - "Fan Coil Units", describes a part of a
                    building control system, providing control and regulation of temperatures
                    in various areas of the facility, including receiving alerts for abnormalities.
                    <br />
                    <br />
                    The application simulates a complex of four towers, each consisting of forty floors.
                    each floor contains different areas and rooms with fan coil units,
                    all connected via communication to the main control system.
                </p>

                <p className="subtitle">Room control</p>
                <p className="txt">The purpose of the system is to allow the operator to control climate
                    and operate the fan coil units, in every room,
                    in every floor, in every building at the complex.
                    <br />
                    <br />Each fan coil unit has an operation line that shows the room temperature
                    and the unit operation status.
                    In the operation line, you can turn the unit on and off, set desired temperature,
                    select the mode (cooling, heating, etc.), and select fan intensity.
                    <br />
                    <br />All on-screen displays are received from database and all commands are sent
                    to database, which simulates inputs and outputs that connect to real conditioning
                    systems.
                    <br />
                    <br />In addition, the system warns of a significant deviation between set desired
                    temperature and room temperature, which indicates a malfunction that requires
                    examination from the maintenance team. For this purpose,
                    you need to define on the operation line, temperature deviation and duration until an alarm is started.
                    <br />
                    <br />For example: if we set a desired temperature of 20 ℃, a temperature deviation
                    of 3 ℃, and time to alarm of 20 seconds, when the room temperature is 23 ℃
                    for more then 20 seconds, the system will set off an alarm, an allarm display will show up
                    on the operation line and a new alarm will be added to the events summary. When the temperature
                    returns to desired range, the alarm display will be hidden, and the alarm in
                    the events summary will change to closed status.
                    <br />
                    <br />Important: because this is a virtual system, namely the database is not connected to a
                    real air conditioning system, the room temperatures shown are obtained using a smart
                    temperature generator algorithm, which simulates a changing temperature situation
                    like real air-conditioned areas.
                </p>

                <p className="subtitle">Login user</p>
                <div className="txt">The system is provided with three user groups:
                    <ul>
                        <li>View only: Users for viewing only, are not authorized to make any changes.</li>
                        <br />
                        <li>Operation: Users authorized to operate the system fully
                            but not authorized to perform editing changes,
                            such as adding or deleting users."
                        </li>
                        <br />
                        <li>Administration: a user with total authorization for all the application functions.
                        </li>
                    </ul>
                    The list of users in the system, includes three fixed users who cannot be
                    deleted or edited through the browser.
                    <ul>
                        <li>View: used for viewing only.
                            <br />Login details: user name: "view", password: "1111"
                        </li>
                        <br />
                        <li>Operator: authorized to operate the system.
                            <br />Login details: user name: "operator" password: "2222"
                        </li>
                        <br />
                        <li>Admin: a user with total authorization.
                            <br />Login details: user name: "admin", password: "3333".
                        </li>
                    </ul>
                    User login to the system is performed by clicking the 'Login user' button
                    on the right side of the top menu on the screen.
                </div>

                <p className="subtitle">User management</p>
                <p className="txt">
                    User Management Screen displays the complete list of registered users in the system.
                    a user with appropriate permission will be able to define new users,
                    permanently remove existing users, and also update passwords or
                    permission levels for existing users.
                    <br />
                    <br />
                    Important: The three fixed default users cannot be modified or removed.
                    <br />
                    <br />
                    Adding a user: In the 'Add User' window, you need to set a username and password,
                    select a permission level, and click 'Apply'.
                    <br />
                    <br />
                    Update user details: Clicking 'Update' on the user row will open the update window.
                    you should change the desired details, such as password,
                    permission level, or both, and click 'Apply'.
                    <br />
                    <br />
                    Permanently removing a user: Clicking 'Delete' on the user row will result in their
                    deletion from the system.
                </p>
                <p className="subtitle" >Event summary</p>
                <p className="txt">
                    In this log, the last 3000 registered events are displayed,
                    documenting temperature anomalies in different rooms within the facility.
                    <br />
                    <br />
                    Triggering an alarm: When there is a temperature deviation in a specific area
                    that exceeds the defined threshold for a certain duration,
                    an alarm will be triggered and logged with a timestamp indicating the start
                    of the alarm.
                    <br />
                    <br />
                    Closing Alarm: When the temperature returns to the desired range,
                    the alarm status changes to closed, with a timestamp indicating the closure
                    timing.
                    <br />
                    <br />
                    Alarm Acknowledgement: When the user confirms receiving the alarm,
                    the status changes to acknowledged, with a timestamp indicating the acknowledgement
                    time.
                    <br />
                    <br />
                    Background Colors - The background color of the notification bar
                    changes based on the status:
                    <br />
                    <br />
                    Open Alarm without Acknowledgement - Red background.
                    <br />
                    Open Alarm with Acknowledgement - Purple background.
                    <br />
                    Closed Alarm without Acknowledgement - Green background.
                    <br />
                    Closed Alarm with Acknowledgement - deleted from the log.                    <br />
                    <br />
                    <br />
                    Event Management - Clicking on the alarm bar will open the Event Management
                    window with the following options:
                    <br />
                    <br />
                    Ack selected - Acknowledge the selected alarm.
                    Performing an Acknowledgement on a alarm that is already in a "Closed"
                    status will permanently remove it from the event log.
                    <br />
                    <br />
                    Force End - Changing the status of the alarm to Closed forcefully,
                    even if the temperature has not returned to the desired range yet.
                    Forcing the closure of a alarm that is already in the "Acknowledged" status
                    will permanently remove it from the event log.
                    <br />
                    <br />
                    Ack all alarms: Changing the status of all alarms in the log
                    to "Acknowledged". This action will cause all alarms that are already
                    in the "Closed" status to be deleted from the log.
                    The alarms that are in an "Open" status will all be changed to a purple background color.
                </p>

                <section className="summary">
                    In conclusion: I hope that the application operation and various functions
                    are user-friendly and clear. If you have any feedback, comments, or suggestions,
                    please don't hesitate to contact us at 052-7635935.
                </section>
            </div>
        </section>
    </section>
}
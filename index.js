/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
// Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Convert arrays of employee data into records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Record the time when an employee checks in
function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    });
    return this;
}

// Record the time when an employee checks out
function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    });
    return this;
}

// Calculate the hours an employee worked on a given date
function hoursWorkedOnDate(date) {
    let inEvent = this.timeInEvents.find(event => event.date === date);
    let outEvent = this.timeOutEvents.find(event => event.date === date);
    return (outEvent.hour - inEvent.hour) / 100;
}

// Calculate the wages earned by an employee on a given date
function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// Calculate the total wages for an employee
function allWagesFor() {
    let eligibleDates = this.timeInEvents.map(event => event.date);
    return eligibleDates.reduce((memo, date) => memo + wagesEarnedOnDate.call(this, date), 0);
}

// Search and return an employee by their first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName);
}

// Calculate the total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((memo, record) => memo + allWagesFor.call(record), 0);
}

// Note: The use of 'call' in the functions is to ensure that we use the correct 'this' context, especially when the function is being invoked from another function.


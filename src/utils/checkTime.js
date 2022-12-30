const checkTime = () => {

    let startTime = '08:00:00';
    let endTime = '20:00:00';

    let currentDate = new Date()

    startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);

    endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);


    let valid = startDate < currentDate && endDate > currentDate

    return valid
}

export { checkTime }
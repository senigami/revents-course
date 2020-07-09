// <script>

//we have to wait for the dom to load because we are acting on hidden inputs/elements that are only available after load
document.addEventListener('DOMContentLoaded', function() {
  let etTimeField = document.getElementById('expiredDate');
  let utcTimeField = document.getElementById('createdDate');
  let contentEditPane = document.querySelector('#properties > div');

  utcTimeField.parentElement.style.display = 'none';

  // Adding several event listeners on both date fields - may be a better/cleaner way
  etTimeField.addEventListener('click', updateUtcValue);
  etTimeField.addEventListener('mouseout', updateUtcValue);
  etTimeField.addEventListener('mouseenter', updateUtcValue);

  contentEditPane.addEventListener('mouseout', updateUtcValue);

  // Selecting the date and time inputs to disable and manipulate below
  let utcDate = document.getElementById('eventDateUtcDate');
  let utcTime = document.getElementById('eventDateUtcTime');
  disableUtcInputs();

  function updateUtcValue() {
    //pass id of the top level eastern time date time to function to get utc
    let utcDateTime = convertEtDateTimeToUtc('eventDateEt');

    let utcDateField = document.getElementById('eventDateUtc');

    //setting the top level value because this seems to be what dotCMS actually saves
    utcDateField.value = formatFullDateTimeString(utcDateTime);

    //updating the two input values for display purposes
    utcDate.value = formatDateString(utcDateTime);
    utcTime.value = formatAmPm(utcDateTime);
  }

  function formatFullDateTimeString(date) {
    let year = date.getFullYear();
    let month = withLeadingZero(date.getMonth() + 1);
    let day = withLeadingZero(date.getDate());
    let hour = withLeadingZero(date.getHours());
    let minute = withLeadingZero(date.getMinutes());

    let dateTimeString =
      year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    return dateTimeString;
  }

  function formatDateString(date) {
    return (
      date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
    );
  }

  function formatAmPm(date) {
    let hours = date.getHours();
    let minutes = withLeadingZero(date.getMinutes());
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function withLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  function convertEtDateTimeToUtc(id) {
    let etDateTimeInput = document.getElementById(id);
    let etDateTimeValue = etDateTimeInput.value;
    let etDateTime = new Date(etDateTimeValue);
    return convertToUtc(etDateTime);
  }

  //we may want to detect the date and decide whether to add 4 or 5 - this would be the place to add that logic
  function convertToUtc(date) {
    date.setHours(date.getHours() + 4);
    return date;
  }

  function disableUtcInputs() {
    // Selecting the buttons to hide
    let utcDateButton = document.querySelector(
      '#widget_eventDateUtcDate > div.dijitReset.dijitRight.dijitButtonNode.dijitArrowButton.dijitDownArrowButton.dijitArrowButtonContainer'
    );
    let utcTimeButton = document.querySelector(
      '#widget_eventDateUtcTime > div.dijitReset.dijitRight.dijitButtonNode.dijitArrowButton.dijitDownArrowButton.dijitArrowButtonContainer'
    );

    utcDate.disabled = true;
    utcDateButton.hidden = true;

    utcTime.disabled = true;
    utcTimeButton.hidden = true;
  }
});

//</script>

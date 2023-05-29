$(function () {
  // Display the current date in the header of the page.
  var currentDay = dayjs().format('dddd, MMMM D');
  $("#currentDay").text(currentDay);

  // Define business hours (9 AM to 5 PM)
  var businessHours = [];
  for (var i = 9; i <= 17; i++) {
    businessHours.push(dayjs().hour(i).minute(0).format('h A'));
  }

  // Get the current hour (in 24-hour format)
  var currentHour = dayjs().hour();

  // Generate time blocks for the business hours
  $.each(businessHours, function(index, hourValue) {
    var hour = dayjs(hourValue, "h A").hour(); // Convert hour to 24-hour format
    var timeBlockEl = $("<div>").addClass("time-block").attr("id", "hour-" + hour);

    // Apply the past, present, or future class to each time block by comparing the id to the current hour
    if (hour < currentHour) {
      timeBlockEl.addClass("past");
    } else if (hour > currentHour) {
      timeBlockEl.addClass("future");
    } else {
      timeBlockEl.addClass("present");
    }

    var timeLabelEl = $("<div>").addClass("time-label").text(hourValue);
    var eventEl = $("<textarea>").addClass("event");
    var saveBtnEl = $("<button>").addClass("save-btn").text("Save");
    timeBlockEl.append(timeLabelEl, eventEl, saveBtnEl);
    $("#timeBlocks").append(timeBlockEl);

    // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
    var savedEvent = localStorage.getItem("hour-" + hour);
    if (savedEvent) {
      eventEl.val(savedEvent);
    }
  });

  // Add a listener for click events on the save button
  $(document).on("click", ".save-btn", function() {
    // Save the user input in local storage using the id in the containing time-block as a key
    var timeBlockEl = $(this).parent();
    var eventEl = timeBlockEl.find(".event");
    var id = timeBlockEl.attr("id");
    var eventText = eventEl.val().trim();
    localStorage.setItem(id, eventText);
  });
});

document.addEventListener("DOMContentLoaded", function() {
// ***** MAIN LOGIC ***** //
    // --- PANEL LOGIC --- //
    var panels = document.querySelectorAll(".info");
    var items = document.querySelectorAll(".button");
    var lastVisiblePanel;

    for (var i=0; i<items.length; i++) {
        items[i].addEventListener("touchstart", function(evt) {cycleSlides(evt)}, false);
        items[i].addEventListener("click", function(evt) {cycleSlides(evt)}, false);
    }

    // --- Refresh the Traffic Map Every 60 Seconds ---//
    setInterval(refreshTrafficMap, 60000);
    
    // --- Refresh Button ---//
    //Refresh Button Event
    document.getElementById("refresh_button").addEventListener("click", function() {location.reload();}, false);

    //Enable the Refresh Button
    setTimeout(function() {
        document.getElementById("refresh_button").disabled = false;
    }, 30000);
    
// ***** END MAIN LOGIC ***** //
// ------=====----- //
// ***** AUX FUNCTIONS ***** //
    //Cycle Slides
    function cycleSlides (e) {
        e.preventDefault();

        //Get the clicked button's item number and use it to find the corresponding info panel
        var n = e.target.getAttribute("item"),
        targetPanel = document.querySelector(".item" + n);

        if (lastVisiblePanel === undefined) {
            //This is the first click
            panels[0].classList.add('fadeOut');
        } else {
            lastVisiblePanel.classList.add('fadeOut');
            lastVisiblePanel.classList.remove('fadeIn');
        }

        if (!targetPanel.classList.contains('fadeIn')) {
            targetPanel.classList.add('fadeIn');
            lastVisiblePanel = targetPanel; //Update the last panel
        }

    }

    //Reload the Traffic Map <iframe>
    function refreshTrafficMap () {
        document.getElementById('traffic-map-iframe').src = document.getElementById('traffic-map-iframe').src
    }
// ***** END AUX FUNCTIONS ***** //
});

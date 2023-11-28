   // Get queries
   let ticketHolder = document.querySelector('.ticketHolder')
   let ticket = document.querySelector('.ticket');
   let shiny = document.querySelector('.shiny');
   let spotlight = document.querySelector('.spotlight');
   let ticketNumber = document.querySelector('.ticketNumber');
   let ticketFooter = document.querySelector('.footer');
   let progressBarContainer = document.querySelector('.progressbar');
   let progressBarFill = document.querySelector('.fill');
   let border = document.querySelector('.border');
   let info = document.querySelector('.info')
 
 
 /* Time List */
 let updateTimeList = [
    {
        "time": "09:45",
        "time_remaining": 4,
        "is_fast_track": true
    },
    {
        "time": "09:53",
        "time_remaining": 12,
        "is_fast_track": false
    },
    {
        "time": "09:57",
        "time_remaining": 16,
        "is_fast_track": false
    },
    {
        "time": "10:16",
        "time_remaining": 30,
        "is_fast_track": false
    },
    {
        "time": "10:31",
        "time_remaining": 45,
        "is_fast_track": false
    }
]

let list = document.querySelector(".list");

updateTimeList.map((e) => {
    list.innerHTML += 
        `<div class="item">
            <p>${e.time}am - <span class="text-bold">${e.time_remaining > 9 ? e.time_remaining : "0" + e.time_remaining} mins</span></p>
            ${e.is_fast_track == true ? '<a class="button fastTrack">Fast Track</a>' : '<a class="button primary">Book</a>'}
        </div>`
})




// Get Gradient Value
var e = document.getElementById("gradientSelect");
function onChange() {
    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    return value;
}
e.onchange = onChange;
onChange();


ticketHolder.addEventListener('mousemove', controlCard, false)

ticketHolder.addEventListener('mouseleave', function() {
    ticket.style.transform = `rotateX(0deg) rotateY(0deg)`
    ticket.style.mixBlendMode = 'normal'
})

function countdown() {
    // Create a variable
    const countdown = document.querySelector('.countdown');

    // Set the date we're counting down to
    var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        countdown.innerHTML = `<span class="text-bold">${minutes}</span>m <span class="text-bold">${seconds > 9 ? seconds : "0" + seconds}</span>s`;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            countdown.innerHTML = "EXPIRED";
        }
    }, 1000);   
}

countdown();

function map(val, minA, maxA, minB, maxB) {
    return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
}

window.addEventListener("deviceorientation", handleOrientation, false);

function handleOrientation(event) {
    const absolute = event.absolute;
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    // Test
    document.querySelector('.alpha').innerHTML = alpha 
    document.querySelector('.beta').innerHTML = beta 
    document.querySelector('.gamma').innerHTML = gamma 

    // Rotate Ticket
    ticket.style.transform = `perspective(600px) rotateX(${alpha}deg) rotateY(${beta}deg)`;

}
 

function controlCard(e) {


    // Find the pointer
    let mouseX = e.offsetX; 
    let mouseY = e.offsetY;

    // Get percentages of x,y
    let percentageX = e.offsetX / ticket.offsetWidth * 100;
    let percentageY = e.offsetY / ticket.offsetHeight * 100;

    let rotateY = map(mouseX, 0, 380, -25, 25);
    let rotateX = map(mouseY, 0, 316, 25, -25);

    // Rotate the card
    ticket.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Shiny / iridescent effect
    switch(onChange()) {
    
        case 'version2':
            border.style.opacity = 0;

            info.style.padding = '1em 1em'

            progressBarContainer.style.background = "rgba(0,0,0,0.1)"
            progressBarFill.style.background = "#F16460"
    
            shiny.style.background = '#F8F6F0';

            ticket.style.color = `black`
            ticket.style.textShadow = `0px 0px transparent`;

            ticketFooter.style.borderTop = `2px dashed rgba(0,0,0,0.2)`;
            ticketFooter.style.padding = "1em 1em"

            ticketNumber.style = `
            text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
            background: 
                radial-gradient(ellipse farthest-corner at right bottom, 
                    hsl(49, 99%, ${61 + percentageY / 2 + "%"}) ${0 + percentageX / 2 + "%"}, 
                    hsl(40, 98%, ${59 + percentageY / 2 + "%"}) ${8 + percentageX / 2 + "%"}, 
                    hsl(41, 60%, ${39 + percentageY / 2 + "%"}) ${30 + percentageX / 2 + "%"}, 
                    hsl(42, 49%, ${36 + percentageY / 2 + "%"}) ${40 + percentageX / 2 + "%"}, 
                    transparent ${80 + percentageY / 2 + "%"}),
                radial-gradient(ellipse farthest-corner at left top, 
                    hsl(0, 0%, ${100 + percentageY / 2 + "%"}) ${0 + percentageX / 2 + "%"}, 
                    hsl(60, 100%, ${84 + percentageY / 2 + "%"}) ${8 + percentageX / 2 + "%"}, 
                    hsl(44, 54%, ${61 + percentageY / 2 + "%"}) ${25 + percentageX / 2 + "%"}, 
                    hsl(42, 50%, ${24 + percentageY / 2 + "%"}) ${62.5 + percentageX / 2 + "%"}, 
                    hsl(42, 50%, ${24 + percentageY / 2 + "%"}) ${100 + percentageX / 2 + "%"});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;`;        
            break;

      case 'version1':
        info.style.padding = '1em 2em'

        border.style.opacity = 1
        progressBarContainer.style.background = "rgba(0,0,0,0.2)"
        progressBarFill.style.background = "white"
        ticketFooter.style = `background:transparent;border:1px solid transparent`
        ticket.style.color = 'white'
        ticket.style.textShadow = '0px 2px 0px rgba(0, 0, 0, 0.1)';
        shiny.style = `
            background: linear-gradient(252.25deg, 
                hsl(${222 + (mouseY / 2)}, 85%, 30%) ${0 + percentageX / 2 + "%"}, 
                hsl(${239 + (mouseY / 2)}, 88%, 30%) ${39.52 + percentageX / 2 + "%"}, 
                hsl(${0 + (mouseY / 2)}, 0%, 30%) ${62.11 + percentageX / 2 + "%"}, 
                hsl(${290 + (mouseY / 2)}, 88%, 30%) ${74.53 + percentageX / 2 + "%"}, 
                hsl(${237 + (mouseY / 2)}, 86%, 30%) ${86.95 + percentageX / 2 + "%"}, 
                hsl(${227 + (mouseY / 2)}, 89%, 30%) ${99.38 + percentageX / 2 + "%"}, 
                hsl(${204 + (mouseY / 2)}, 52%, 30%) ${119.7 + percentageX / 2 + "%"}, 
                hsl(${0 + (mouseY / 2)}, 0%, 30%) ${138.9 + percentageX / 2 + "%"});`
        ticketNumber.style = `text-shadow: 0;background: transparentcolor:black;`     
        break;

        case 'default': 
            border.style.opacity = 0

            shiny.style.background = 'white';
            ticket.style.color = `black`;
            ticketNumber.style = `text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);`
            ticket.style.textShadow = `0px 0px transparent`;
            break;
    } 
   
                                        
    // Spotlight
    spotlight.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255,255,255,0.75) 0%, rgba(255, 255, 255, 0) 100%)`;

}
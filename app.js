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

function percentage(value, max, min) {
    // gamma [-90 to 90] = 180
    // beta [-180 to 180] = 360
  
    let positiveValue;

    //Turn the value into a positive value, otherwise add
    if(value <= -0.000001 ) {
        positiveValue = ((value * -1) - min) * -1 ;
    } else {
        positiveValue = value + min;
    }

    // Make it a percentage
    let percent = (positiveValue / max) * 100

    // return value
    return percent;
}

function phoneStandingUp(value) {
    if(value >= 70 && value <= 110) {
        return true
    } else {
        return false
    }
}

function handleOrientation(event) {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    // Limit the gamma to [-30, 30] so that it doesn't rotate too much
    if(gamma > 30) {
        gamma = 30
    }

    if(gamma < -30) {
        gamma = -30
    }

    // Allow the ticket to rotate
    ticket.style.transform = `perspective(800px) rotateX(${beta / 8}deg) rotateY(${gamma / 3}deg)`;

    // When tiled, increase the opacity
    if(gamma <= 0 && beta <= 0) {
        spotlight.style.opacity = (gamma * -1) / 30;
    } else {
        spotlight.style.opacity = gamma / 30;
    }

    if(beta < 0) {
        spotlight.style.opacity = (beta * -1) / 30;
    } else {
        spotlight.style.opacity = beta / 30;
    }

    // Selector
    switch(onChange()) {
    
        // Gold Ticket
        case 'version2':
            // Add classlist
            ticket.classList.add('gold');
                
            // Remove 
            ticket.classList.remove('no-gradient', 'iridescent')

            spotlight.style.background = `radial-gradient(circle at ${percentage(gamma, 60, 30)}% ${percentage(beta, 60, 30)}%, 
            rgba(0, 0, 0, 0.2) 0%, 
            rgba(0, 0, 0, 0) 100%)`;

            ticketNumber.style = `
            background: 
                radial-gradient(ellipse farthest-corner at right bottom, 
                    hsl(49, 99%, ${(61 + percentage(gamma, 180, 90)) / 1.5 + "%"}) ${0 + percentage(beta, 360, 180) * 5 + "%"}, 
                    hsl(40, 98%, ${(59 + percentage(gamma, 180, 90)) / 1.5 + "%"}) ${8 + percentage(beta, 360, 180) * 5 + "%"}, 
                    hsl(41, 60%, ${(39 + percentage(gamma, 180, 90)) / 1.5 + "%"}) ${30 + percentage(beta, 360, 180) * 5 + "%"}, 
                    hsl(42, 49%, ${(36 + percentage(gamma, 180, 90)) / 1.5 + "%"}) ${40 + percentage(beta, 360, 180) * 5 + "%"}, 
                    transparent ${(80 + percentage(gamma, 180, 90)) / 1.5 + "%"}),
                radial-gradient(ellipse farthest-corner at left top, 
                    hsl(0, 0%, ${(100 + percentage(gamma, 180, 90)) / 1.5  + "%"}) ${0 + percentage(beta, 360, 180) * 5 + "%"}, 
                    hsl(60, 100%, ${(84 + percentage(gamma, 180, 90)) / 1.5  + "%"}) ${8 + percentage(beta, 360, 180) * 5 + "%"}, 
                    hsl(44, 54%, ${(61 + percentage(gamma, 180, 90)) / 1.5  + "%"}) ${25 + percentage(beta, 360, 180) * 5 + "%"}, 
                    hsl(42, 50%, ${(24 + percentage(gamma, 180, 90)) / 1.5  + "%"}) ${62.5 + percentage(beta, 360, 180) * 5 + "%"}, 
                    hsl(42, 50%, ${(24 + percentage(gamma, 180, 90)) / 1.5  + "%"}) ${100 + percentage(beta, 360, 180) * 5 + "%"});
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;`;        
            break;

    // Iridescent
      case 'version1':

        // Add classlist
        ticket.classList.add('iridescent');
            
        // Remove 
        ticket.classList.remove('no-gradient', 'gold')

        spotlight.style.background = `radial-gradient(circle at ${percentage(gamma, 60, 30)}% ${percentage(beta, 180, 90)}%, 
        rgba(255,255,255,0.5) 0%, 
        rgba(255,255,255, 0) 100%)`;

        // Only needed when the previous selection was 'gold'
        ticketNumber.style = `background: white;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;        

        
       shiny.style = `       
       background: conic-gradient(from ${176.2 + gamma + "deg"} at 50% 50%, 
        hsl(0, 0%, 0%) ${-24.66 + gamma + "deg"}, 
        hsl(0, 0%, 100%) ${0.25 + gamma + "deg"}, 
        hsl(0, 0%, 0%) ${50.63 + gamma + "deg"}, 
        hsl(0, 0%, 0%) ${51.97 + gamma + "deg"}, 
        hsl(0, 0%, 100%) ${88.12 + gamma + "deg"}, 
        hsl(0, 0%, 0%) ${142.5 + gamma + "deg"}, 
        hsl(0, 0%, 100%) ${196.87 + gamma + "deg"}, 
        hsl(0, 0%, 0%) ${256.87 + gamma + "deg"}, 
        hsl(0, 0%, 100%) ${300 + gamma + "deg"}, 
        hsl(0, 0%, 0%) ${335.2 + gamma + "deg"}, 
        hsl(0, 0%, 0%) ${335.34 + gamma + "deg"} , 
        hsl(0, 0%, 100%) ${360.25 + gamma + "deg"}), 
        
        radial-gradient(95.11% 95.11% at 36.64% 4.89%, 
            hsl(${178 + beta}, 66%, 49%) 0%, 
            hsl(${69 + beta}, 89%, 68%) 22.92%, 
            hsl(${300 + beta}, 98%, 84%) 46.88%, 
            hsl(${234 + beta}, 93%, 83%) 68.23%, 
            hsl(${148 + beta}, 91%, 67%) 87.5%, 
            hsl(${199 + beta}, 90%, 65%) 100%);`
        break;

        case 'default': 
            
            // Add classlist
            ticket.classList.add('no-gradient');
             
            // Remove 
            ticket.classList.remove('iridescent', 'gold')

            // Only needed when the previous selection was 'gold'
            ticketNumber.style = `background: black;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;        

            // Spotlight
            spotlight.style.background = `radial-gradient(circle at ${percentage(gamma, 60, 30)}% ${percentage(beta, 60, 30)}%, 
            rgba(0,0,0,0.4) 0%, 
            rgba(0, 0, 0, 0) 100%)`;

            break;
    } 

}
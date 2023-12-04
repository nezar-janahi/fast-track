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
   let noise = document.querySelector('.noise');
 
   let enable3d = document.querySelector('#enable3d');


 
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
  

function handleOrientation(event) {
    // Device Orientation Values
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    // Limit the gamma to [-30, 30] so that it doesn't rotate too much
    gamma > 30 ? gamma = 30 : null;
    gamma < -30 ? gamma = -30 : null;


    // Allow the ticket to rotate
    if(enable3d.checked) {
        ticket.style.transform = `perspective(600px) rotateX(${beta / 8}deg) rotateY(${gamma / 3}deg)`;
    } else {
        ticket.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg)`;
    }
    
    // When tilt, increase the opacity
    //beta < 0 ? spotlight.style.opacity = (beta * -1) / 30 : spotlight.style.opacity = beta / 30;

    //Turn the value into a positive value, otherwise add
    if(gamma <= -0.000001 ) {
        positiveValueGamma = ((gamma * -1) - 30) * -1 ;
    } else {
        positiveValueGamma = gamma + 30;
    }

     //Turn the value into a positive value, otherwise add
     if(beta <= -0.000001 ) {
        positiveValueBeta = ((beta * -1) - 30) * -1 ;
    } else {
        positiveValueBeta = beta + 30;
    }

    // Make it a percentage
    let percentGamma = (positiveValueGamma / 60) * 100
    let percentBeta = (positiveValueBeta / 60) * 100

    // Spotlight
    //spotlight.style.background = `radial-gradient(circle at ${percentGamma}% ${percentBeta}%, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.1) 100%)`;

    // Selector
    switch(onChange()) {
    
        // Gold Ticket
        case 'gold-ticket':
            // Add classlist
            ticket.classList.add('gold');
                
            // Remove 
            ticket.classList.remove('no-gradient', 'iridescent-dark', 'iridescent-light');

            // Spotlight
            spotlight.style.background = `radial-gradient(circle at ${percentGamma}% ${percentBeta}%, rgba(0,0,0,1) 0%, #F8F6F0 100%)`;

            ticketNumber.style = `
            background: 
                radial-gradient(ellipse 100% 100% at ${100 - percentGamma}% ${100 - percentBeta}%, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse 100% 100% at ${percentGamma}% ${percentBeta}%, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;`        
            break;

    // Iridescent
      case 'iridescent-dark':

        // Add classlist
        ticket.classList.add('iridescent-dark');
            
        // Remove 
        ticket.classList.remove('no-gradient', 'gold', 'iridescent-light')

        // Only needed when the previous selection was 'gold'
        ticketNumber.style = `background: white;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;        

        // Spotlight
        spotlight.style.background = `radial-gradient(circle at ${percentGamma}% ${percentBeta}%, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.1) 100%)`;

        // Noise
        noise.style = `
        background-image: 
            url('https://assets.codepen.io/13471/silver-glitter-background.png'), 
            radial-gradient(50% 50% at ${100-percentGamma + "%"} ${100-percentBeta + "%"}, #FFFFFF 0%, #000000 100%);
        `
        
       shiny.style = `       
       background: conic-gradient(from ${176.2 + (gamma / 8) + "deg"} at 50% 50%, 
        hsl(0, 0%, 0%) ${-24.66 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${0.25 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${50.63 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${51.97 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${88.12 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${142.5 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${196.87 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${256.87 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${300 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${335.2 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${335.34 + (gamma / 8) + "deg"} , 
        hsl(0, 0%, 100%) ${360.25 + (gamma / 8) + "deg"}), 
        
        radial-gradient(95.11% 95.11% at 36.64% 4.89%, 
            hsl(${178 + (beta * 2)}, 66%, 49%) 0%, 
            hsl(${69 + (beta * 2)}, 89%, 68%) 22.92%, 
            hsl(${300 + (beta * 2)}, 98%, 84%) 46.88%, 
            hsl(${234 + (beta * 2)}, 93%, 83%) 68.23%, 
            hsl(${148 + (beta * 2)}, 91%, 67%) 87.5%, 
            hsl(${199 + (beta * 2)}, 90%, 65%) 100%);`
        break;

        case 'iridescent-light':

        // Add classlist
        ticket.classList.add('iridescent-light');
            
        // Remove 
        ticket.classList.remove('no-gradient', 'gold', 'iridescent-dark')

        // Only needed when the previous selection was 'gold'
        ticketNumber.style = `background: white;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;        

        // Spotlight
        spotlight.style.background = `radial-gradient(circle at ${percentGamma}% ${percentBeta}%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)`;

        // Noise
        noise.style = `background-image: url('https://assets.codepen.io/13471/silver-glitter-background.png'), radial-gradient(50% 50% at ${100-percentGamma + "%"} ${100-percentBeta + "%"}, #FFFFFF 0%, #000000 50%);`
        
       shiny.style = `background: conic-gradient(from ${176.2 + (gamma / 8) + "deg"} at 50% 50%, 
        hsl(0, 0%, 0%) ${-24.66 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${0.25 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${50.63 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${51.97 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${88.12 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${142.5 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${196.87 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${256.87 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${300 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${335.2 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${335.34 + (gamma / 8) + "deg"} , 
        hsl(0, 0%, 100%) ${360.25 + (gamma / 8) + "deg"}), 
        
        conic-gradient(from ${176.2 + (gamma / 8) + "deg"} at 50% 50%, 
        hsl(0, 0%, 0%) ${-24.66 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${0.25 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${50.63 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${51.97 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${88.12 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${142.5 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${196.87 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${256.87 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 100%) ${300 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${335.2 + (gamma / 8) + "deg"}, 
        hsl(0, 0%, 0%) ${335.34 + (gamma / 8) + "deg"} , 
        hsl(0, 0%, 100%) ${360.25 + (gamma / 8) + "deg"}), 

        radial-gradient(95.11% 95.11% at 36.64% 4.89%, 
            hsl(${178 + (beta * 2)}, 66%, 49%) 0%, 
            hsl(${69 + (beta * 2)}, 89%, 68%) 22.92%, 
            hsl(${300 + (beta * 2)}, 98%, 84%) 46.88%, 
            hsl(${234 + (beta * 2)}, 93%, 83%) 68.23%, 
            hsl(${148 + (beta * 2)}, 91%, 67%) 87.5%, 
            hsl(${199 + (beta * 2)}, 90%, 65%) 100%);`;
       
       break;

        //

        case 'default': 
            
            // Add classlist
            ticket.classList.add('no-gradient');
             
            // Remove 
            ticket.classList.remove('iridescent-light', 'iridescent-dark', 'gold')

            // Spotlight
            spotlight.style.background = `radial-gradient(circle at ${percentGamma}% ${percentBeta}%, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0.3) 100%)`;

            // Only needed when the previous selection was 'gold'
            ticketNumber.style = `background: black;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;        

            break;
    } 

}
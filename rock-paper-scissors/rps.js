// rock paper scissors
// 20230325


function get_computer_choice() {
    // random number between 0 and 2 (incl)
    let choice_num = Math.floor(Math.random() * 3)
    let choice = ""

    if (choice_num === 0) {
        choice = "rock"
    }
    else if (choice_num === 1) {
        choice = "paper"
    }
    else {
        choice = "scissors"
    }
    return choice
}

function get_player_choice() {
    const valid_choices = ["rock", "paper", "scissors"]
    let player_choice = ""
    let count = 0
    while (!valid_choices.includes(player_choice) && count < 10) {
        if (count > 0) {
            alert("THOU HATH CHOSEN POORLY \n" +
                "THOUST CHOICES BE ROCK, PAPER, OR SCISSORS")
        }
        player_choice = prompt("WHAT DOTH THE HUMAN CHOOSE?")
        //player_choice = player_choice.toLowerCase()
        count++
    }
    return player_choice
}

function play_round(player_choice, computer_choice) {
    let winner = ""
    
    switch (player_choice) {
        case "rock":
            switch (computer_choice) {
                case "rock":
                    winner = "draw"
                    break;
                case "paper":
                    winner = "computer"
                    break;
                case "scissors":
                    winner = "human"
            }
            break;
        case "paper":
            switch (computer_choice) {
                case "rock":
                    winner = "human"
                    break;
                case "paper":
                    winner = "draw"
                    break;
                case "scissors":
                    winner = "computer"
            }
            break;
        case "scissors":
            switch (computer_choice) {
                case "rock":
                    winner = "computer"
                    break;
                case "paper":
                    winner = "human"
                    break;
                case "scissors":
                    winner = "draw"
            }
    }
    return winner
}

function game() {
    alert("HELLO HUMAN\nTHE GAME IS ROCK, PAPER, SCISSORS\nBEST OF 5")
    let winner = ""
    let player_choice = ""
    let computer_choice = ""
    let c = 0
    let p = 0
    for (let i = 0; i < 5; i++) {
        player_choice = get_player_choice()
        computer_choice = get_computer_choice()
        winner = play_round(player_choice, computer_choice)
        if (winner === "human") {p++}
        else if (winner === "computer") {c++}
        alert("HUMAN CHOOSES " + player_choice.toUpperCase() +
                "\nCOMPUTER CHOOSES " + computer_choice.toUpperCase() +
                "\nROUND WINNER IS: " + winner.toUpperCase() +
                "\nSCORE IS: COMPUTER " + c.toString() + "  HUMAN: " + p.toString())
    }
    if (p > c) {
        alert("THOU HATH CONQUERED THE MACHINE")
    }
    else if (c > p) {
        alert("VERILY, THOU HATH EXPERIENCED A HUMILIATING DEFEAT")
    }
    else {
        alert("THOU HAST TIED WITH THE MACHINE,\nA SHAME WORSE STILL THAN DEFEAT")
    }
}

game()

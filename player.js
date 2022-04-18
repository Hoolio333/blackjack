class Player {
  constructor(id, playerName, wallet) {
    this.id = id
    this.playerName = playerName
    this.wallet = wallet
    this.hand = []
  }

  hit() {
    //user input to decide whether to hit
    //runs dealACard() from blackjack class
  }
}

module.exports = Player

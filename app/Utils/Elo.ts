/**
 * Calculates the rating delta of the game
 * @param myRating My rating before the game, e.g. 1600
 * @param opponentRating Opponent's rating before the game, e.g. 1700
 * @param myGameResult The result of the game, 1 if I won, 0 if I lost, or 0.5 if draw
 * @returns The rating delta of the game
 */
export function getRatingDelta(myRating: number, opponentRating: number, gameResult: 0 | 0.5 | 1) {
  if ([0, 0.5, 1].indexOf(gameResult) === -1) return null

  const myChanceToWin = 1 / (1 + Math.pow(10, (opponentRating - myRating) / 400))

  let kFactor = 32
  if (myRating >= 2100) kFactor = 24
  if (myRating >= 2400) kFactor = 16

  return Math.round(kFactor * (gameResult - myChanceToWin))
}

/**
 * Calculates my new rating
 * @param myRating My rating before the game, e.g. 1600
 * @param opponentRating Opponent's rating before the game, e.g. 1700
 * @param myGameResult The result of the game, 1 if I won, 0 if I lost, or 0.5 if draw
 * @returns The new rating
 */
export function getNewRating(myRating: number, opponentRating: number, gameResult: 0 | 0.5 | 1) {
  return myRating + Number(getRatingDelta(myRating, opponentRating, gameResult))
}

/**
 * Calculate gains of a game for both players
 * @param player1Rating Player 1's rating before the game, e.g. 1600
 * @param opponentRating Player 2's rating before the game, e.g. 1700
 * @param myGameResult The winner of the game
 * @returns An array containing rating points gained
 */
export function getResults(
  player1Rating: number,
  player2Rating: number,
  winner: 'PLAYER1' | 'PLAYER2' | null
) {
  return [
    Number(getRatingDelta(player1Rating, player2Rating, winnerToResult(winner))),
    Number(
      getRatingDelta(player2Rating, player1Rating, (1 - winnerToResult(winner)) as 0 | 0.5 | 1)
    ),
  ]
}

/**
 * Transform the winner as a result in number
 * @param winner Winner value as defined in the database
 * @returns The result as a number
 */
export function winnerToResult(winner: 'PLAYER1' | 'PLAYER2' | null) {
  switch (winner) {
    case 'PLAYER1':
      return 1
    case 'PLAYER2':
      return 0
    default:
      return 0.5
  }
}

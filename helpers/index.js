const LIMITS = [
  [0, 7, 14, 21, 28, 35],
  [6, 13, 20, 27, 34, 41],
  [0, 1, 2, 3, 4, 5, 6],
  [35, 36, 37, 38, 39, 40, 41]
]

const compareSlots = (
  limit,
  isDisconnected,
  count,
  addSlotPosition,
  slot,
  won,
  board,
  player
) => {
  if (!limit && !isDisconnected && !won) {
    slot += addSlotPosition
    if (board[slot] === player) {
      count++
      won = count === 3
    } else {
      isDisconnected = true
    }
  } else {
    isDisconnected = true
  }
  return { won, slot, isDisconnected, count }
}

export const checkWin = (index, board, player) => {
  let horizontalCount = 0,
    verticalCount = 0,
    diagonalRightCount = 0,
    diagonalLeftCount = 0,
    checkSlotHorizontalRight = index,
    checkSlotHorizontalLeft = index,
    checkSlotVertical = index,
    checkSlotDiagonalRightUp = index,
    checkSlotDiagonalRightDown = index,
    checkSlotDiagonalLeftUp = index,
    checkSlotDiagonalLeftDown = index,
    finishCheck = false,
    isDisconnectedHorizontalRight = false,
    isDisconnectedHorizontalLeft = false,
    isDisconnectedVertical = false,
    isDisconnectdDiagonalRightUp = false,
    isDisconnectdDiagonalRightDown = false,
    isDisconnectdDiagonalLeftUp = false,
    isDisconnectdDiagonalLeftDown = false,
    won = false

  do {
    // HORIZONTAL RIGHT

    const horizontalRightObject = compareSlots(
      LIMITS[1].includes(checkSlotHorizontalRight),
      isDisconnectedHorizontalRight,
      horizontalCount,
      1,
      checkSlotHorizontalRight,
      won,
      board,
      player
    )
    checkSlotHorizontalRight = horizontalRightObject.slot
    isDisconnectedHorizontalRight = horizontalRightObject.isDisconnected
    horizontalCount = horizontalRightObject.count
    won = horizontalRightObject.won

    // HORIZONTAL LEFT

    const horizontalLeftObject = compareSlots(
      LIMITS[0].includes(checkSlotHorizontalLeft),
      isDisconnectedHorizontalLeft,
      horizontalCount,
      -1,
      checkSlotHorizontalLeft,
      won,
      board,
      player
    )
    checkSlotHorizontalLeft = horizontalLeftObject.slot
    isDisconnectedHorizontalLeft = horizontalLeftObject.isDisconnected
    horizontalCount = horizontalLeftObject.count
    won = horizontalLeftObject.won

    // VERTICAL

    const verticalObject = compareSlots(
      LIMITS[3].includes(checkSlotVertical),
      isDisconnectedVertical,
      verticalCount,
      7,
      checkSlotVertical,
      won,
      board,
      player
    )
    checkSlotVertical = verticalObject.slot
    isDisconnectedVertical = verticalObject.isDisconnected
    verticalCount = verticalObject.count
    won = verticalObject.won

    // DIAGONAL RIGHT UP

    const diagonalRightUpObject = compareSlots(
      LIMITS[1].includes(checkSlotDiagonalRightUp) ||
        LIMITS[2].includes(checkSlotDiagonalRightUp),
      isDisconnectdDiagonalRightUp,
      diagonalRightCount,
      -6,
      checkSlotDiagonalRightUp,
      won,
      board,
      player
    )
    checkSlotDiagonalRightUp = diagonalRightUpObject.slot
    isDisconnectdDiagonalRightUp = diagonalRightUpObject.isDisconnected
    diagonalRightCount = diagonalRightUpObject.count
    won = diagonalRightUpObject.won

    // DIAGONAL RIGHT DOWN

    const diagonalRightDownObject = compareSlots(
      LIMITS[0].includes(checkSlotDiagonalRightDown) ||
        LIMITS[3].includes(checkSlotDiagonalRightDown),
      isDisconnectdDiagonalRightDown,
      diagonalRightCount,
      6,
      checkSlotDiagonalRightDown,
      won,
      board,
      player
    )
    checkSlotDiagonalRightDown = diagonalRightDownObject.slot
    isDisconnectdDiagonalRightDown = diagonalRightDownObject.isDisconnected
    diagonalRightCount = diagonalRightDownObject.count
    won = diagonalRightDownObject.won

    // DIAGONAL LEFT UP

    const diagonalLeftUpObject = compareSlots(
      LIMITS[0].includes(checkSlotDiagonalLeftUp) ||
        LIMITS[2].includes(checkSlotDiagonalLeftUp),
      isDisconnectdDiagonalLeftUp,
      diagonalLeftCount,
      -8,
      checkSlotDiagonalLeftUp,
      won,
      board,
      player
    )
    checkSlotDiagonalLeftUp = diagonalLeftUpObject.slot
    isDisconnectdDiagonalLeftUp = diagonalLeftUpObject.isDisconnected
    diagonalLeftCount = diagonalLeftUpObject.count
    won = diagonalLeftUpObject.won

    // DIAGONAL LEFT DOWN

    const diagonalLeftDownObject = compareSlots(
      LIMITS[1].includes(checkSlotDiagonalLeftDown) ||
        LIMITS[3].includes(checkSlotDiagonalLeftDown),
      isDisconnectdDiagonalLeftDown,
      diagonalLeftCount,
      8,
      checkSlotDiagonalLeftDown,
      won,
      board,
      player
    )
    checkSlotDiagonalLeftDown = diagonalLeftDownObject.slot
    isDisconnectdDiagonalLeftDown = diagonalLeftDownObject.isDisconnected
    diagonalLeftCount = diagonalLeftDownObject.count
    won =
      horizontalLeftObject.won ||
      horizontalRightObject.won ||
      verticalObject.won ||
      diagonalRightDownObject.won ||
      diagonalRightUpObject.won ||
      diagonalLeftDownObject.won ||
      diagonalLeftUpObject.won
    finishCheck =
      isDisconnectedHorizontalLeft &&
      isDisconnectedHorizontalRight &&
      isDisconnectedVertical &&
      isDisconnectdDiagonalRightDown &&
      isDisconnectdDiagonalRightUp &&
      isDisconnectdDiagonalLeftDown &&
      isDisconnectdDiagonalLeftUp
  } while (!won && !finishCheck)
  return won
}

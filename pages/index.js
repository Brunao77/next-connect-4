import Head from 'next/head'
import { useState } from 'react'
import { AppLayout } from '../components/AppLayout'

const LIMITES = [
  [0, 7, 14, 21, 28, 35],
  [6, 13, 20, 27, 34, 41],
  [0, 1, 2, 3, 4, 5, 6],
  [35, 36, 37, 38, 39, 40, 41]
]

export default function Home() {
  const [board, setBoard] = useState(new Array(42).fill(''))
  const [player, setPlayer] = useState('X')
  const [win, setWin] = useState(false)

  const repeat = (limit, isDisconnected, count, addSlotPosition, slot, won) => {
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

  const checkWin = (index) => {
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
      const horizontalRightObject = repeat(
        LIMITES[1].includes(checkSlotHorizontalRight),
        isDisconnectedHorizontalRight,
        horizontalCount,
        1,
        checkSlotHorizontalRight,
        won
      )
      checkSlotHorizontalRight = horizontalRightObject.slot
      isDisconnectedHorizontalRight = horizontalRightObject.isDisconnected
      horizontalCount = horizontalRightObject.count
      won = horizontalRightObject.won
      const horizontalLeftObject = repeat(
        LIMITES[0].includes(checkSlotHorizontalLeft),
        isDisconnectedHorizontalLeft,
        horizontalCount,
        -1,
        checkSlotHorizontalLeft,
        won
      )
      checkSlotHorizontalLeft = horizontalLeftObject.slot
      isDisconnectedHorizontalLeft = horizontalLeftObject.isDisconnected
      horizontalCount = horizontalLeftObject.count
      won = horizontalLeftObject.won
      const verticalObject = repeat(
        LIMITES[3].includes(checkSlotVertical),
        isDisconnectedVertical,
        verticalCount,
        7,
        checkSlotVertical,
        won
      )
      checkSlotVertical = verticalObject.slot
      isDisconnectedVertical = verticalObject.isDisconnected
      verticalCount = verticalObject.count
      won = verticalObject.won
      won =
        horizontalLeftObject.won ||
        horizontalRightObject.won ||
        verticalObject.won
      finishCheck =
        isDisconnectedHorizontalLeft &&
        isDisconnectedHorizontalRight &&
        isDisconnectedVertical
    } while (!won && !finishCheck)
    /* do {
      // HORIZONTAL RIGHT CHECK
      if (
        !LIMITES[1].includes(checkSlotHorizontalRight) &&
        !isDisconnectedHorizontalRight &&
        !won
      ) {
        checkSlotHorizontalRight++
        if (board[checkSlotHorizontalRight] === player) {
          horizontalCount++
          won = horizontalCount === 3
        } else {
          isDisconnectedHorizontalRight = true
        }
      } else {
        isDisconnectedHorizontalRight = true
      }
      // HORIZONTAL LEFT CHECK
      if (
        !LIMITES[0].includes(checkSlotHorizontalLeft) &&
        !won &&
        !isDisconnectedHorizontalLeft
      ) {
        checkSlotHorizontalLeft--
        if (board[checkSlotHorizontalLeft] === player) {
          horizontalCount++
          won = horizontalCount === 3
        } else {
          isDisconnectedHorizontalLeft = true
        }
      } else {
        isDisconnectedHorizontalLeft = true
      }
      // VERTICAL
      if (
        !LIMITES[3].includes(checkSlotVertical) &&
        !won &&
        !isDisconnectedVertical
      ) {
        checkSlotVertical += 7
        if (board[checkSlotVertical] === player) {
          verticalCount++
          won = verticalCount === 3
        } else {
          isDisconnectedVertical = true
        }
      } else {
        isDisconnectedVertical = true
      }
      // DIAGONAL RIGHT UP
      if (
        !(
          LIMITES[1].includes(checkSlotDiagonalRightUp) ||
          LIMITES[2].includes(checkSlotDiagonalRightUp)
        ) &&
        !isDisconnectdDiagonalRightUp &&
        !won
      ) {
        checkSlotDiagonalRightUp -= 6
        if (board[checkSlotDiagonalRightUp] === player) {
          diagonalRightCount++
          won = diagonalRightCount === 3
        } else {
          isDisconnectdDiagonalRightUp = true
        }
      } else {
        isDisconnectdDiagonalRightUp = true
      }
      // DIAGONAL RIGHT DOWN
      if (
        !(
          LIMITES[0].includes(checkSlotDiagonalRightDown) ||
          LIMITES[3].includes(checkSlotDiagonalRightDown)
        ) &&
        !won &&
        !isDisconnectdDiagonalRightDown
      ) {
        checkSlotDiagonalRightDown += 6
        if (board[checkSlotDiagonalRightDown] === player) {
          diagonalRightCount++
          won = diagonalRightCount === 3
        } else {
          isDisconnectdDiagonalRightDown = true
        }
      } else {
        isDisconnectdDiagonalRightDown = true
      }
      // DIAGONAL LEFT UP
      if (
        !(
          LIMITES[0].includes(checkSlotDiagonalLeftUp) ||
          LIMITES[2].includes(checkSlotDiagonalLeftUp)
        ) &&
        !isDisconnectdDiagonalLeftUp &&
        !won
      ) {
        checkSlotDiagonalLeftUp -= 8
        if (board[checkSlotDiagonalLeftUp] === player) {
          diagonalLeftCount++
          won = diagonalLeftCount === 3
        } else {
          isDisconnectdDiagonalLeftUp = true
        }
      } else {
        isDisconnectdDiagonalLeftUp = true
      }
      // DIAGONAL LEFT DOWN
      if (
        !(
          LIMITES[1].includes(checkSlotDiagonalLeftDown) ||
          LIMITES[3].includes(checkSlotDiagonalLeftDown)
        ) &&
        !won &&
        !isDisconnectdDiagonalLeftDown
      ) {
        checkSlotDiagonalLeftDown += 8
        if (board[checkSlotDiagonalLeftDown] === player) {
          diagonalLeftCount++
          won = diagonalLeftCount === 3
        } else {
          isDisconnectdDiagonalLeftDown = true
        }
      } else {
        isDisconnectdDiagonalLeftDown = true
      }
      finishCheck =
        isDisconnectedHorizontalLeft &&
        isDisconnectedHorizontalRight &&
        isDisconnectedVertical &&
        isDisconnectdDiagonalRightUp &&
        isDisconnectdDiagonalRightDown &&
        isDisconnectdDiagonalLeftUp &&
        isDisconnectdDiagonalLeftDown
    } while (!won && !finishCheck) */

    setWin(won)
  }

  const handleClick = (slotSelected) => {
    console.log(slotSelected)
    if (board[slotSelected] === '') {
      let slotColumn = slotSelected
      let finish = false
      do {
        if (
          board[slotColumn + 7] !== '' ||
          board[slotColumn + 7] === undefined
        ) {
          const newBoard = board
          newBoard[slotColumn] = player
          setBoard(newBoard)
          finish = true
        }
        slotColumn += 7
      } while (!finish)
      checkWin((slotColumn -= 7))
      setPlayer(player === 'X' ? 'O' : 'X')
    }
  }
  return (
    <>
      <Head>
        <title>Connect 4</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <section>
          {board.map((slot, index) => (
            <div
              key={index}
              className={slot === '' ? 'empty' : slot === 'X' ? 'blue' : 'red'}
              onClick={() => handleClick(index)}
            ></div>
          ))}
          {win && <h1>Winner</h1>}
        </section>
      </AppLayout>
      <style jsx>{`
        section {
          background: #444444;
          padding: 10px;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-gap: 10px;
          border-radius: 10px;
        }
        div {
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 999px;
          margin: 5px;
        }
        .empty {
          background: #e5e1e1;
        }
        .red {
          background: #ff5b5b;
        }
        .blue {
          background: #5b80ff;
        }
      `}</style>
    </>
  )
}

import Head from 'next/head'
import { useState } from 'react'
import { AppLayout } from '../components/AppLayout'

export default function Home() {
  const [board, setBoard] = useState(new Array(42).fill(1))

  const handleClick = (index) => {
    console.log(index)
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <section>
          {board.map((slot, index) => (
            <div key={index} onClick={() => handleClick(index)}>
              {slot}
            </div>
          ))}
        </section>
      </AppLayout>
      <style jsx>{`
        section {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-gap: 10px;
        }
        div {
          width: 100px;
          height: 100px;
          background: red;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}

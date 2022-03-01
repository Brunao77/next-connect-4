import { fonts } from '../../styles/theme'

export const AppLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <style jsx global>
        {`
          main {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: ${fonts.base};
            background-color: black;
            color: white;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </>
  )
}

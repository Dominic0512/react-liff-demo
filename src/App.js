import React from 'react';
import './App.css';
import liff from '@line/liff'

const LIFF_ID = '1654949300-KRyrEX5D'
const LINE_ADD_FRIEND_URI = 'https://line.me/R/ti/p/@685cokrk'

function App() {
  const [isReady, setIsReady] = React.useState(false)
  const [isSignUp, setIsSignUp] = React.useState(false)
  const [friendShip, setFriendShip] = React.useState(false)
  
  const openAddFriendModal = React.useCallback(() => {
    if (!isReady) return;
    liff.openWindow({ url: LINE_ADD_FRIEND_URI })
  }, [isReady])

  React.useEffect(() => {
    (async () => {
      try {
        await liff.init({ liffId: LIFF_ID });
        const { friendFlag } = await liff.getFriendship()
        setFriendShip(friendFlag)
        setIsReady(true)
      } catch (error) {
        alert(error.code, error.message);
      }
    })();
  }, [])

  React.useEffect(() => {
    if (!isReady) return;
    if (isSignUp && !friendShip) {
      openAddFriendModal()
    }
  }, [isReady, isSignUp, friendShip, openAddFriendModal])

  return (
    <div className="App">
      {isReady ? (
        <>
          <div>
            {`Friendship: ${friendShip}`}
          </div>
          <div>
            <button onClick={() => setIsSignUp(true)}>完成註冊</button>
            {
              !friendShip && (
                <button onClick={() => openAddFriendModal()}>加入好友</button>
              )
            }
          </div>
        </>
      ): (<>Loading...</>)}
    </div>
  );
}

export default App;

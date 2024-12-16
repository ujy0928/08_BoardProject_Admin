import logo from './logo.svg';
import './css/App.css';
import DashBoard from './components/DashBoard';
import Login from './components/Login';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './components/AuthContext';
import { BrowserRouter } from 'react-router';


// Context API 사용하는 방법 2가지


// 1. 컴포넌트 분리하여 하위 컴포넌트에서 useContext 이용하는 방법
function App() {

  return (
    <AuthProvider>
      <AppComponet />
    </AuthProvider>
  )
}


function AppComponet() {

  // 로그인을 했다면 DashBoard 렌더링
  // 로그인을 안했다면 Login 렌더링
  // -> 조건 : 로그인 여부
  // ->        로그인을 했는지 안했는지를 기억해줄 상태값 (user)
  // ->        user 상태에는 로그인 한 사람에 대한 정보를 세팅.
  // ->        전역 관리 해야함 -> user 라는 상태는 App 에서 뿐만 아니라
  // ->        App 의 자식(하위) 컴포넌트에서도 이용 가능해야함.
  //           -> Context API 사용 해야함!!!
  
  const {user} = useContext(AuthContext);

  return (
    <>
      {user ? 
      (
        <div className='body-container'>
          <BrowserRouter>
            <DashBoard />
          </BrowserRouter>
        </div>
      ) : (
        <div className='login-section'>
          <Login />
        </div>
      ) 
    }
    </>
  );
}

// 2. <AuthProvider> 안에서 <AuthContext.Consumer> 이용하는 방법
// -> <AuthContext.Consumer> 안에서 익명함수 형태로 전역 상태를 꺼내어 사용

// function App() {
//   return (
//     <AuthProvider>
//       <AuthContext.Consumer>
//         {({ user }) =>
//           user ? (
//             <div className="body-container">
//               <DashBoard />
//             </div>
//           ) : (
//             <div className="login-section">
//               <Login />
//             </div>
//           )
//         }
//       </AuthContext.Consumer>
//     </AuthProvider>
//   );
// }

export default App;

// import ContentText from './components/component/ContentText';
import Footer from './components/component/Footer';
import PasswordGeneration from './components/PasswordGenerator';

function App() {

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 grid overflow-hidden box-border">
      {/* <div className="flex row justify-center items-center gap-4 h-90 px-6"> */}
        {/* <ContentText /> */}
        <PasswordGeneration />
      {/* </div> */}
      <Footer />
    </div>
  );

}

export default App

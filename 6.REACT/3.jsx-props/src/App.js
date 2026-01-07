import Header from './Header';
import Footer from './Footer';

function App() {
  const pageTitle = "Welcome to my WebSite";
  const copyrightYear = 2026;

  return (
    <div>
      <Header title={pageTitle} />
      <main>
        <p>Hello1122</p>
      </main>
      <Footer year={copyrightYear} />
    </div>
  );
}

export default App;

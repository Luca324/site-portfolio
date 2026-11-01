import Header from './components/Header.jsx'
import Contacts from './components/Contacts.jsx'
import Projects from './components/Projects.jsx'
import Footer from './components/Footer.jsx'
import css from './App.module.css'

export default function App() {
    return (
    <div className={css.container}>
      <Header />
      <Contacts />
      <Projects />
      <Footer />
    </div>
    )
}

import Header from './components/Header'
import Contacts from './components/Contacts'
import Projects from './components/Projects'
import Footer from './components/Footer'
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

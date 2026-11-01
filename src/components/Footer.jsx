import css from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={css.root}>
      <p>
        Хостинг предоставлен <a href="https://rsars.ru/" target="_blank">rsars.ru</a>
      </p>
    </footer>
  )
}

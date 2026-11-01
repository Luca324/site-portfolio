import css from './Contacts.module.css'

export default function Contacts() {
  return (
    <section className={css.section}>
      <h2 className={css.heading}>Контакты</h2>
      <div className={css.list}>
        <div className={css.item}>
          <a href="https://habr.com/ru/users/Luca324/" target="_blank">Habr</a>
        </div>
        <div className={css.item}>
          <a href="https://t.me/ppkk134" target="_blank">Telegram</a>
        </div>
        <div className={css.item}>
          <a href="https://github.com/Luca324" target="_blank">GitHub</a>
        </div>
      </div>
      <a href="https://disk.yandex.ru/i/v1aJ0SkVuxjdvw" target="_blank" className={css.resume}>Скачать резюме</a>
    </section>
  )
}

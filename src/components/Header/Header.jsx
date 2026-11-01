import { assetUrl } from '../../assetUrl.js'
import css from './Header.module.css'

export default function Header() {
    return (
    <header className={css.root}>
      <img src={assetUrl('me.jfif')} alt="Татьяна Мосолова" className={css.photo} />
      <h1 className={css.title}>Татьяна Мосолова</h1>
      <p className={css.subtitle}>Frontend Developer</p>
    </header>
    )
}

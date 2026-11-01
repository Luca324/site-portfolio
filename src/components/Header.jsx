import { assetUrl } from '../assetUrl.js'

export default function Header() {
  return (
    <header>
      <img src={assetUrl('me.jfif')} alt="Татьяна Мосолова" className="profile-photo" />
      <h1 className="title">Татьяна Мосолова</h1>
      <p className="subtitle">Frontend Developer</p>
    </header>
  )
}

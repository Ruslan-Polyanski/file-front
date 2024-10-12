import { FC } from "react"
import { Home } from "../../pages/home/Home"

const Layout: FC = () => {
  return <>
    <header>
      <div>Logo</div>
      <nav>
        <ul>
          <li>Отметить сотрудников</li>
          <li>Забронировать автомобиль</li>
          <li>Ссылка 3</li>
        </ul>
      </nav>
    </header>
    <main>
      <aside>
        <ul>
          <li>Сотрудники</li>
          <li>Объекты</li>
          <li>Оборудование</li>
          <li>Профиль</li>
        </ul>
      </aside>
      <section>
        <Home />
      </section>
    </main>
    <footer>footer</footer>
  </>
}

export { Layout }
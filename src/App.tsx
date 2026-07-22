import { foods } from './food'
import { t } from './content/strings'
import MenuGrid from './components/MenuGrid'

function App() {
  return (
    <main>
      <h1>{t('menuHeading')}</h1>
      <MenuGrid foods={foods} />
    </main>
  )
}

export default App

import BuilderPanel from './BuilderPanel';
import OutcomePanel from './OutcomePanel';
import './App.css'

export default function App() {

  return (
    <>
      <header>
        <div className="text-block-wrapper">
          <div className="text-block">Gradient Image Builder</div>
        </div>
      </header>
      <main>
        <BuilderPanel />
        <OutcomePanel />
      </main>
      <footer></footer>
    </>
  )
}

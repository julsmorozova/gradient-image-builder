// import { useState } from "react";
import BuilderPanel from './BuilderPanel';
import OutcomePanel from './OutcomePanel';
import './App.css'

export default function App() {

  return (
    <>
      <header>Gradient Builder</header>
      <main>
        <BuilderPanel />
        <OutcomePanel />
      </main>
      <footer></footer>
    </>
  )
}

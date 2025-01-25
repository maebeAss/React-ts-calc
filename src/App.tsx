import './App.css'
import { MenuItem } from './types'
import Menu from './layouts/Menu'
import Calculator from './layouts/Calculator'
import History from './layouts/History'
import { useState } from 'react'

const menuItems = [MenuItem.CALCULATOR, MenuItem.HISTORY]

function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem>(MenuItem.CALCULATOR);
  //CREATE A TIMER
  // let selectedItem: MenuItem = MenuItem.HISTORY as MenuItem;
  // let renderedElement: JSX.Element;
  // if (selectedItem === MenuItem.CALCULATOR) {
  //   renderedElement = <Calculator></Calculator>;
  // } else {
  //   renderedElement = <History></History>;
  // }

  function hamdeMenuSelection(menuItem: MenuItem) {
    setSelectedItem(menuItem);
    console.log('selected', selectedItem);
  }
  return (
    <>
      <h1>My first React app</h1>
      <h1>My Calculator</h1>
      <Menu menuItems={menuItems} onClick={hamdeMenuSelection}></Menu>
      {selectedItem === MenuItem.CALCULATOR ? (
        <Calculator></Calculator>
      ) : (
        <History></History>
      )}
    </>
  )
}

export default App

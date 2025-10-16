import { useState, useRef } from "react";
import Masonry from "react-masonry-css";
import "./cardsPage.css";
import Calculator from "../pages/Calculator";
import Weather from "../pages/Weather";
import CurrenctConverter from "../pages/CurrencyConverter";
import LanguageTranslator from "../pages/LanguageTranslator";
import BudgetTracker from "../pages/BudgetTracker";

const initialToolsData = [
  { id: 1, title: "Calculator", desc: "Smart number tool" },
  { id: 2, title: "Currency Converter", desc: "Convert currencies" },
  { id: 3, title: "Weather", desc: "Check today's weather" },
  { id: 4, title: "Language Translator", desc: "Connect with other people" },
  { id: 5, title: "Budget Calculator", desc: "Track your budget here" }
];

const componentMap = {
  Calculator,
  CurrencyConverter: CurrenctConverter,
  Weather,
  LanguageTranslator,
  BudgetTracker
};

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
};

function CardsPage(props) {
  const [toolsData, setToolsData] = useState(initialToolsData);
  const [openCards, setOpenCards] = useState({});
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleToggle = (id) => setOpenCards(prev => ({ ...prev, [id]: !prev[id] }));
  const handleDragStart = (position) => (dragItem.current = position);
  const handleDragOver = (e, position) => { e.preventDefault(); dragOverItem.current = position; };
  const handleDrop = () => {
    const listCopy = [...toolsData];
    const draggedItem = listCopy[dragItem.current];
    listCopy.splice(dragItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggedItem);
    setToolsData(listCopy);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className={`${props.mode ? "darkcardsPage" : "cardspage"} ${props.collapsed ? "expanded" : ""}`}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="tools-container"
        columnClassName="tools-column"
      >
        {toolsData.map((tool, index) => {
          const ToolComponent = componentMap[tool.title] || componentMap[tool.title.replace(" ", "")];
          const isOpen = openCards[tool.id];

          return (
            <div
              key={tool.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={handleDrop}
              onClick={() => handleToggle(tool.id)}
            >
            {isOpen && ToolComponent ? (
                <div onClick={(e) => e.stopPropagation()}>
                    <ToolComponent
                    title={tool.title}
                    description={tool.desc}
                    />
                </div>
                ) : (
                <div className="card">
                    <div className="first-content"><h3>{tool.title}</h3></div>
                    <div className="second-content"><p>{tool.desc}</p></div>
                </div>
            )}

            </div>
          );
        })}
      </Masonry>
    </div>
  );
}

export default CardsPage;

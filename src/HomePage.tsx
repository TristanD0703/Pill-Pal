import React, { useState, useRef } from "react";
//import CheckinPage from './CheckinPage.jsx'
import checkbox from "./HomePageIcons/checkbox.svg";
import pill from "./HomePageIcons/pill.svg";
import stats from "./HomePageIcons/stats.svg";
import calendar from "./HomePageIcons/calender.svg";
import mascot from "./HomePageIcons/idle.gif";
import flag from "./HomePageIcons/flag.svg";

import DrugForm from "./DrugForm.tsx";

const CircleLayout = ({ children, characterImageUrl }) => {
  const itemCount = React.Children.count(children);
  // Semi-major (a) and semi-minor (b) axes of the ellipse
  const a = 400; // Horizontal radius
  const b = 200; // Vertical radius
  const angleStep = Math.PI / (itemCount - 1);

  const calculateTransform = (index) => {
    const angle = angleStep * index;
    // Calculate the x and y coordinates based on the ellipse equation
    const x = a * Math.cos(angle);
    const y = b * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="m-0 p-0  rounded-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={characterImageUrl} alt="Character" className="h-100" />
      </div>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(${calculateTransform(index).x}px, ${
              calculateTransform(index).y
            }px) translate(-50%, -50%)`,
            transformOrigin: "center",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

const Icon = ({ favicon, title, onClick }) => (
  <button
    className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-2xl text-gray-700"
    onClick={onClick}
  >
    <img
      src={favicon}
      alt="Icon"
      style={{ height: "1.5em", verticalAlign: "middle" }}
    />
    <span style={{ marginLeft: "0.5em" }}>{title}</span>
  </button>
);

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Close modal if the click is outside the modal content
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className=" absolute inset-0 bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick} // Listener for the overlay click
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose} className="absolute top-2 right-2 text-lg">
          &times;
        </button>
      </div>
    </div>
  );
};

const CheckinDropdown = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.id]: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .database()
      .ref("path/to/your/data")
      .set(checkedItems)
      .then(() => console.log("Data sent to Firebase"))
      .catch((error) => console.error(error));
  };

  return (
    <div className=" bg-white border border-gray-200 rounded shadow-md mt-2 w-full">
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`checkbox-${index}`}>{item}</label>
            <br />
          </div>
        ))}
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const ProgressBar = ({ progress, color }) => {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(100, Math.max(0, progress));
  return (
    <div className="relative py-2">
      <div className="flex items-center">
        <div
          className="absolute rounded-full h-4 w-4"
          style={{ left: `${safeProgress - 1}%`, backgroundColor: color }}
        ></div>
        <div className="overflow-hidden h-2 text-xs flex bg-blue-100 w-full">
          <div
            style={{ width: `${safeProgress}%`, background: color }}
            className=" shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
          ></div>
        </div>
        <div className="rounded-full bg-blue-100 h-4 w-4"></div>
      </div>
    </div>
  );
};

const ProgressBarHolder = () => {
  const [progressBars, setProgressBars] = useState([]);
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33F5", "#FFC300"];

  const addProgressBar = () => {
    const newProgress = Math.floor(Math.random() * 100) + 1; // Random progress value
    const colorIndex = progressBars.length % colors.length;
    const newProgressBar = { progress: newProgress, color: colors[colorIndex] };
    setProgressBars([...progressBars, newProgressBar]);
  };

  return (
    <div>
      <button
        onClick={addProgressBar}
        className="px-4 py-2 rounded bg-blue-500 text-white my-2"
      >
        Add Progress Bar
      </button>
      {progressBars.map((bar, index) => (
        <ProgressBar key={index} progress={bar.progress} color={bar.color} />
      ))}
    </div>
  );
};

function HomePage() {
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isPillFormModalOpen, setIsPillFormModalOpen] = useState(false);

  const openCheckinModal = () => setIsCheckinModalOpen(true);
  const closeCheckinModal = () => setIsCheckinModalOpen(false);
  const openPillFormModal = () => setIsPillFormModalOpen(true);
  const closePillFormModal = () => setIsPillFormModalOpen(false);

  return (
    <div className ="">
      <h1 className="absolute m-4  top-0 left-0 text-6xl font-bold text-gray-800">
        Pill Pal
      </h1>
      <h1 className=" m-4 top-0 absolute right-0 text-6xl font-bold text-gray-800">
        Username
      </h1>
      <div>
        <CircleLayout characterImageUrl={mascot}>
          <Icon
            onClick={openCheckinModal}
            favicon={calendar}
            title=" Calendar"
          />

          <Icon onClick={openCheckinModal} favicon={checkbox} title="Checkin" />

          <Icon onClick={openCheckinModal} favicon={stats} title="Progress" />
          <Icon
            onClick={openPillFormModal}
            favicon={pill}
            title="Add Medication"
          />
        </CircleLayout>
      </div>

      <div className="absolute bottom-0 w-full px-2 flex ">
        <div className="w-full">
          <ProgressBarHolder />
        </div>

        <img src={flag} alt="Little Pill Guy Carrying flag" className="h-20" />
      </div>
      
      <Modal isOpen={isPillFormModalOpen} onClose={closePillFormModal}>
        <DrugForm />
      </Modal>
      
      <Modal isOpen={isCheckinModalOpen} onClose={closeCheckinModal}>
        <CheckinDropdown items={["Item 1", "Item 2", "Item 3"]} />
      </Modal>
    </div>
  );
}

export default HomePage;

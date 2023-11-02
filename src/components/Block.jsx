import * as React from "react";
import "../styles.css";

const CheckBox = ({ isClicked, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        className="checkbox"
        checked={isClicked}
        onChange={onChange}
      />
    </div>
  );
};

const Block = ({ label, ...props }) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleCheckBoxChange = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="block-wrapper" onClick={handleClick} {...props}>
      <CheckBox isClicked={isClicked} onChange={handleCheckBoxChange} />
    </div>
  );
};

export default Block;
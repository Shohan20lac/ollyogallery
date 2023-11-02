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

  export default CheckBox
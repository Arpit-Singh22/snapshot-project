function NavButton(props) {
    console.log(props);
    return (
      <button onClick={() => props.onClick(props.label)}>{props.label}</button>
    );
  }

export default NavButton
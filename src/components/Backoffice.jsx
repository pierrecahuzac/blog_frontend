import "../assets/CSS/Backoffice.css";

export default function Backoffice({ isLogged, setIslogged }) {
  console.log(isLogged);
  return (
    <div className="backoffice_container">
      <div className="backoffice_title">
        <h2>Mon Backoffice</h2>
      </div>

      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
      <div>{isLogged}</div>
    </div>
  );
}

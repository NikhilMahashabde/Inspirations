import { useNavigate } from "react-router-dom";

export default function AuthHomepage() {
  const navigate = useNavigate();
  navigate("/trips");

  return (
    <>
      <h1>welcome to inspirations</h1>
      <p>
        Continue where you left off || you do not have any active planned trips!
        start exploring today!{" "}
      </p>
      <p>Trip data here</p>
      <h1> See what our users are getting up to </h1>
      <p> latest trips </p>
      <h1> Getting started </h1>
      go to trips userdata
    </>
  );
}

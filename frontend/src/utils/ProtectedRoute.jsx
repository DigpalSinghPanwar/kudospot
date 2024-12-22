import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  let login = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;

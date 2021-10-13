import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Pagination } from '@mui/material';

const Questions = ({ setMdShow }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    user: {},
    profile: {},
    settings: {}
  });

  function goNextPage() {
    if (page === 4) return;
    setPage((page) => page + 1);
  }

  function updateData(type, newData) {
    setData((data) => {
      return { ...data, [type]: newData };
    });
  }

  function submit() {
    fetch("/api/form", { method: "POST", body: JSON.stringify(data) });
  }

  function OnboardingOne({ data, update }) {
    const newData = {};
  
    return(
      <div>
          <h6 id="primera">¿Buscas unirte a un emprendimiento?</h6>
          <div>
          <Button className="btn-questions afirmative" onClick={() => console.log('a')} variant="success" size="lg">
              Sí
          </Button>
          <Button className="btn-questions" onClick={() => setMdShow(false)} variant="secondary" size="lg">
              No
          </Button>
          </div>
      </div>
    )
  }
  
  function OnboardingTwo({ data, update }) {
    return(
      <div>
          <h6 id="primera">¿Deseas conformar un equipo de trabajo?</h6>
          <div>
          <Button className="btn-questions afirmative" onClick={() => console.log('a')} variant="success" size="lg">
              Sí
          </Button>
          <Button className="btn-questions" onClick={() => setMdShow(false)} variant="secondary" size="lg">
              No
          </Button>
          </div>
      </div>
    )
  }
  
  function OnboardingThree({ data, update }) {
      return(
          <div>
              <h6 id="primera">¿Es tu primer acercamiento a la vida laboral?</h6>
              <div>
              <Button className="btn-questions afirmative" onClick={() => console.log('a')} variant="success" size="lg">
                  Sí
              </Button>
              <Button className="btn-questions" onClick={() => setMdShow(false)} variant="secondary" size="lg">
                  No
              </Button>
              </div>
          </div>
        )
  }
  
  return (
    <div className="">
      {/* the progress bar goes here */}
      {/* <div>
        <progress max="4" value={page} />
      </div> */}

      {/* the content goes here */}
      <div>
        {page === 1 && <OnboardingOne data={data.user} update={updateData} />}
        {page === 2 && (
          <OnboardingTwo data={data.profile} update={updateData} />
        )}
        {page === 3 && (
          <OnboardingThree data={data.settings} update={updateData} />
        )}

      </div>

      {page !== 3 && <Pagination className="mt-5 d-flex justify-content-center" hidePrevButton count={3} onChange={goNextPage} />}
      {/* {page === 3 && (
        <button type="submit" onClick={submit}>
          Submit
        </button>
      )} */}
    </div>
  );
}


export default Questions

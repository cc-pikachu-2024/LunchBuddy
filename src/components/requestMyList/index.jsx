import { createButtonStatus } from "../StatusButton";

const RequestMyList = () => {
  const requestInfoList = () => {
    return (
      <ul>
        <li className="menuText">
          <img src="" />
        </li>
        <li className="requesterComment">
          <img src="" />
        </li>
        <li className="maxPrice">
          <img src="" />
        </li>
        <li className="Gratitude">
          <img src="" />
        </li>
      </ul>
    );
  };

  return (
    <>
      <div>RequestMyList</div>
      <div className="progressBar"></div>
      {requestInfoList}
      <menuImages />
      <createButtonStatus />
    </>
  );
};

export default RequestMyList;

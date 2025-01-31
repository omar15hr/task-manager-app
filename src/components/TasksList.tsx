import { CircleSvg } from "./Svg";

export const TasksList = () => {
  return (
    <main>

      <div className="container">
        <div className="col">
          <div className="col-header">
            <CircleSvg size={10} color="#ff0000" />
            <h3>Backlog (2)</h3>
          </div>
        </div>
        <div className="col">
          <div className="col-header">
            <CircleSvg size={10} color="#F3CD48" />
            <h3>In Progress (3)</h3>
          </div>
        </div>
        <div className="col">
          <div className="col-header">
            <CircleSvg size={10} color="#B787F5" />
            <h3>In Review (2)</h3>
          </div>
        </div>
        <div className="col">
          <div className="col-header">
            <CircleSvg size={10} color="#77DC88" />
            <h3>Completed (2)</h3>
          </div>
        </div>
      </div>

      <div>
        
      </div>


    </main>
  );
};

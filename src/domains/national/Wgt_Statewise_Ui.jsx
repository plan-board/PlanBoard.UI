import { Link } from "react-router-dom";

const Wgt_Statewise_Ui = ({ data }) => {
  return (
    <>  

         <tr>   
            <td> <Link className="link" to={`/Statewise/${data.id}`}>  {data.state} </Link> </td>
             <td>{data.ly} L  <i className="w3-text-gray"> </i></td>
             <td> {data.target} L <i className="w3-text-gray">({data.target_percentage}%)</i></td>  
            <td> {data.achieved} L <i className="w3-text-gray">({data.achieved_percentage}%)</i></td>  
          </tr> 

    </>
  );
};


export default Wgt_Statewise_Ui;
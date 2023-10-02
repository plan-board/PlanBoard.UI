import { Link } from "react-router-dom";

const Wgt_Territory_Table_Data = ({ data }) => {
  return (
    <>  

         <tr>   
            <th> 
            <Link className="link  w3-text-indigo" to={`/Statewise/${data.id}`}>  {data.depot} </Link> 
            <br />
            <span className="w3-small h6 w3-text-gray" >  
            Dealers .({data.dealers}) 
            </span> 
            </th> 
             <td>{data.ly} L  <i className="w3-text-gray"> </i></td>
             <td>{data.ly} L  <i className="w3-text-gray"> </i></td>
             <td> {data.target} L <i className="w3-text-gray">({data.target_percentage}%)</i></td>  
            <td> {data.achieved} L <i className="w3-text-gray">({data.achieved_percentage}%)</i></td>  
          </tr> 

    </>
  );
};


export default Wgt_Territory_Table_Data;
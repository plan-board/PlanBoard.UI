  import { Link } from "react-router-dom";

  const Wgt_Depotwise_Ui = ({ data }) => {
    return (
      <>  

          <tr>   
              <th> 
              <Link className="link  w3-text-indigo" to={`/Statewise/${data.id}`}>  {data.depot} </Link> 
              <br />
              <span className="w3-small h6 w3-text-gray" > 
              T.({data.territorys})
              Dlrs.({data.dealers}) 
              </span> 
              </th> 
                <td>{data.lly} L  <i className="w3-text-gray"> </i></td>
              <td>{data.ly} L  <i className="w3-text-gray"> </i></td>

              <td> {data.target_v1} L <i className="w3-text-gray">({data.target_percentage}%)</i> </td>  

              <td> {data.target_v2} L <i className="w3-text-gray">({data.target_percentage}%)</i>
              <br />
                <input className="" />  </td>  
              <td> {data.achieved} L <i className="w3-text-gray">({data.achieved_percentage}%)</i></td>  
            </tr> 

      </>
    );
  };


  export default Wgt_Depotwise_Ui;
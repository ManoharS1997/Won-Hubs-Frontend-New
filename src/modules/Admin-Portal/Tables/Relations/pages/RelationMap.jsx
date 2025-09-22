import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import renderIcons from "../../../../../shared/functions/renderIcons";
import { useNavigate, useParams } from "react-router-dom";
import HorizontalFlow from "../components/MapView";
import { GetCIRelationData } from "../../../../../utils/CheckAndExecuteFlows/CRUDoperations";


const RelationMap = () => {
  const [mapData, setMapData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const Navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getRelationData()
  }, [])

  const getRelationData = async () => {
    try {
      const data = await GetCIRelationData(id);
      // Process the fetched relation data
      if (data?.success) {
        // You can set the data to state or handle it as needed
        // console.log("Fetched relation data:", data.data);
        setMapData(data.data);
      } else {
        console.error("Failed to fetch relation data:", data.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to fetch relation data",
        });
        setErrMsg(data.message || "Failed to fetch relation data");
      }
    } catch (error) {
      console.error("Error fetching relation data:", error);
      // Handle error appropriately, e.g., show a notification or log it
    }
  }

  return (
    <div className="w-full h-full overflow-auto flex flex-col pb-2">
      <h2 className="h-[10%] m-0 flex items-center gap-4 py-2">
        <button type="button" onClick={() => Navigate(-1)} className="!bg-transparent">
          {renderIcons("IoIosArrowBack", 30)}
        </button>
        CI Relations Graph
      </h2>

      {mapData ? <div className="w-[95%] !h-[90%] border self-center">
        <HorizontalFlow data={mapData} />
      </div> :
        <div className="w-full h-full flex items-center justify-center">
          {loading ? (
            <div className="text-lg">Loading...</div>
          ) : (
            <div className="text-lg text-red-500">{errMsg || "No data available"}</div>
          )}
        </div>
      }
    </div>
  );
};

export default RelationMap;
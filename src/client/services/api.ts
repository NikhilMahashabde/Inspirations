// import { useMutation } from "react-query";
// import { MyTripsInterface, TripData, UpdateTripResponse } from "../interfaces/interfaces.types";
// import axios from "axios";

// export const updateTripMutation = () => (

//   useMutation(
//     (data: MyTripsInterface) =>
//       axios.put<UpdateTripResponse>(`/api/trip/${data._id}`, {
//         data,
//       }),
//     {
//       onSuccess: (res) => {
//         setTripData(res.data.updatedTrip);
//       },
//       onError: (res: { error: string }) => {
//         console.log(res);
//       },
//     }
//   );

// )

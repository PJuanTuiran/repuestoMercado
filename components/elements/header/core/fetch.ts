import axios from "axios";
import { FormattedVehicle } from "~/types/Filter";

export interface VehicleWithId extends FormattedVehicle {
    id: number;
}

export const getAllFilters = () =>
    axios.get("https://gimcloud.com.co/mrp/api/997");

export const findVehiclesByUserId = (id: number) =>
    axios({
        method: "post",
        url: "https://gimcloud.com.co/mrp/api/29",
        params: { idusuario: id },
    });

export const submitVehicle = (vehicle: FormattedVehicle) => {
    const params = {
        ...vehicle,
    };

    return axios({
        method: "post",
        url: "https://gimcloud.com.co/mrp/api/27",
        params,
    });
};

export const deleteVehicleById = (id: number) =>
    axios({
        method: "post",
        url: "https://gimcloud.com.co/mrp/api/31",
        params: { id: id },
    });

export const updateVehicleById = (vehicle: VehicleWithId) => {
    const params = {
        ...vehicle,
    };

    return axios({
        method: "post",
        url: "https://gimcloud.com.co/mrp/api/30",
        params,
    });
};

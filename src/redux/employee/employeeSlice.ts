
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";

export interface Employee {
  _id: string ;
  name: string;
  email: string;
  mobile_number: string,
  designation: string;
  gender: string;
  course: string;
  image: string;
  createdAt: string
  id:string
  status: string
}
export interface EmployeeState {
  employees: Employee[]
  totalCount: number; 
  isSuccess: boolean
}

const initialState: EmployeeState = {
  employees: [],
  totalCount: 0, 
  isSuccess: false
}
interface Delete {
  employeeId: string
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    fetchData: (state, action: PayloadAction<{ employees: Employee[], totalCount: number }>) => {
      state.employees = action.payload.employees;
      state.totalCount = action.payload.totalCount;
    },
    addData: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    editData: (state, action: PayloadAction<Employee>) => {
      // const updatedEmployee = action.payload;
      // const index = state.employees.findIndex(emp => emp._id === updatedEmployee._id);
      // if (index !== -1) {
      //   state.employees[index] = updatedEmployee;
      // }
    },
    deleteData: (state, action: PayloadAction<Employee>) => {

    }
  }
})


 interface Params {
  q:string;
  createdAt: string
 }
export const fetchEmployee = (params: Params): AppThunk<Promise<void>> => async (dispatch) => {
  const storedToken = localStorage.getItem("access_token")

  const response = await axios.post('http://localhost:7100/employee/list',
  params,
  {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  const { data } = response;
  const { employees, totalCount } = data.data;
  dispatch(fetchData({ employees, totalCount }))
  
}

export const addEmployee = ( formData: FormData ): AppThunk =>  async dispatch => {
  const storedToken = localStorage.getItem("access_token")

  const response = await axios.post('http://localhost:7100/employee/add', formData, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  const { data} = response;
  const addEmployees = data.data
  localStorage.setItem("isStatus",data.isStatus)  
  dispatch(addData(addEmployees))

}

export const editEmployee = ( employeeData: FormData ): AppThunk => async (dispatch) => {
  const storedToken = localStorage.getItem("access_token")


      const response = await axios.patch("http://localhost:7100/employee/edit", employeeData, {
          headers: {
              Authorization: `Bearer ${storedToken}`,
          }
      });
      dispatch(editData(response.data));

};


export const deleteEmployee = (employeeId: Delete): AppThunk => async (dispatch) => {

  const response = await axios.patch("http://localhost:7100/employee/delete",employeeId)
}

export const { fetchData, addData, deleteData, editData } = employeeSlice.actions;
export default employeeSlice.reducer
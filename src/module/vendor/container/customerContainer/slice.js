import { createSlice, current } from '@reduxjs/toolkit';


const customerSlice = createSlice({
    name: 'customers',
    initialState: {
      customerData: [],
      loading: false,
      error: null,
      customerByIdData: {}
   
    },
    reducers:{
      addCustomer: (state) => {
        state.loading = true;
        state.error = null;
      },
      addCustomerSuccess: (state, action) => {  
        state.loading = false;
        state.customerData = action.payload;
      },
      addCustomerFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
        getCustomer: (state, action) => {

          console.log("==========actiob==============",action)
            state.loading = true;
            state.error = null;
          },
        getCustomerSuccess: (state, action) => {
            state.loading = false;
            state.customerData = action.payload;
           
          },
      
        getCustomerFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            
          },
          getCustomerById: (state) => {
            state.loading = true;
            state.error = null;
          },
          getCustomerByIdSuccess: (state, action) => {
            state.loading = false;
            state.customerByIdData = action.payload;

            console.log("======customerIdData========",action.payload)
          },
          getCustomerByIdFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          updateCustomer: (state) => {
            state.loading = true;
            state.error = null;
          },
      
          updateCustomerSuccess: (state, action) => {
            if (action.payload && action.payload.success) {
              state.loading = false;
              state.customerData = current(state).customerData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
              console.log('================customerData====================', state.customerData);
            } else {
              // Handle the case where the update was not successful
              console.error('Update unsuccessful');
            }
          },
          updateCustomerFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          deleteCustomer: (state) => {
            state.loading = true;
            state.error = null;
          },
          deleteCustomerSuccess: (state, action) => {
            state.loading = false;
            state.customerData =
              action.payload === undefined
                ? current(state.customerData)
                : current(state.customerData).filter((option) => option.id !== action.payload);
   
          },
          deleteCustomerFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          }
    }
  
})


export const{

    getCustomer,
    getCustomerSuccess,
    getCustomerFail,
    addCustomer,
    addCustomerSuccess,
    addCustomerFail,
    getCustomerById,
    getCustomerByIdSuccess,
    getCustomerByIdFail,
    updateCustomer,
    updateCustomerSuccess,
    updateCustomerFail,
    deleteCustomer,
    deleteCustomerSuccess,
    deleteCustomerFail

   
} = customerSlice.actions;

export default customerSlice.reducer;
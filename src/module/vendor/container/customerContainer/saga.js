// import { takeEvery, call } from 'redux-saga/effects';
// import 'react-toastify/dist/ReactToastify.css';
import {put,  call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify'; 
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';


function* fetchCustomer(action) {
    try {
 
      const filter = action.payload;
    console.log("===========Customerdataaa=====",action.payload);
     let page = (filter && filter.page) || 1;
     console.log("page",page);
      let searchVal = (filter?.searchVal && filter?.searchVal) || '';
      let limit = (filter?.limit && filter?.limit) || 10;
  
      // console.log('++++++++++++++filtervalues++++++++++++', filter);
      let params = {
        // api: `${config.Ip}/customerProf`,
        api: `${config.Ip}/customerProf?&limit=${limit}&page=${page}&q=${searchVal}`,
        method: 'GET',
        successAction: actionType.getCustomerSuccess(),
        failAction: actionType.getCustomerFail(),
        authourization: 'token'
       
      };
      let res =yield call(auth.basicApi, params);
  
      console.log("========Customerdata=====", res);
    } catch (error) {
      console.log(error);
    }
  
  }



  function* fetchCustomerById(action) {
    const filter = action.payload;
    console.log('=============filterId=======================', filter);
    try {
      let params = {
        api: `${config.Ip}/customerProf/${action.payload}`,
        method: 'GET',
        successAction: actionType.getCustomerByIdSuccess(),
        failAction: actionType.getCustomerByIdFail(),
        authourization: 'token'
      };
      yield call(auth.basicApi, params);
    } catch (error) {
      console.log(error);
    }
  }


  
function* addCustomer(action) {
 

    console.log('=========action.payload===========', action.payload);


  try {
    let params = {
      api: `${config.Ip}/customerProf`,
      method: 'POST',
      successAction: actionType.addCustomerSuccess,
      failAction: actionType.addCustomerFail,
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

 
    if (res) {
      // yield put(actionType.getCustomer());
      yield put({ type: actionType.getCustomer().type })
      // yield put({ type: actionType.getCustomer().type });
     yield call(() => toast.success('Add Customer  successful', { autoClose: 3000 }));

    }
  } catch (error) {
    console.log(error);
  }
}



function* updateCustomerById(action) {
  console.log('================actin.paylad====================', action.payload);

  try {
    let params = {
      api: `${config.Ip}/customerProf/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateCustomerSuccess(),
      failAction: actionType.updateCustomerFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    console.log('=================updateresponse===================', res);

  } catch (error) {
    console.log(error);
  }
}



function* deleteCustomer(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/customerProf/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteCustomerSuccess(),
      failAction: actionType.deleteCustomerFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    if (res && res.status === 204) {
      //  yield put({ type: actionType.getCountry().type });
    //  yield call(() => toast.success('Delete successful', { autoClose: 3000 }));

      // yield put({
      //   type: actionType.totalCount().type,
      //   payload: { 'where=': {} }
      // });
    }
  } catch (error) {
    console.log(error);
  }
}

  export default function* CustomerActionWatcher() {
    yield takeEvery('customers/getCustomer', fetchCustomer);
     yield takeEvery('customers/addCustomer', addCustomer);
    yield takeEvery('customers/getCustomerById', fetchCustomerById);
    yield takeEvery('customers/updateCustomer', updateCustomerById);
    yield takeEvery('customers/deleteCustomer', deleteCustomer);
  }
  

























































  


//   import { takeEvery, call } from 'redux-saga/effects';
// import 'react-toastify/dist/ReactToastify.css';
// import config from 'config';
// import auth from 'container/auth';

// import * as actionType from './slice';


// function* fetchCustomer(action) {
//     try {
 
//       const filter = action.payload;
//     console.log("===========Customerdataaa=====",action.payload);
//      let page = (filter && filter.page) || 1;
//      console.log("pageeeeeeeeeeeee",page);
//       // let searchVal = (filter?.searchVal && filter?.searchVal) || '';
//       // let limit = (filter?.limit && filter?.limit) || 10;
  
//       console.log('++++++++++++++filtervalues++++++++++++', filter);
//       let params = {
//         api: `${config.Ip}/customerProf`,
//         method: 'GET',
//         successAction: actionType.getCustomerSuccess(),
//         failAction: actionType.getCustomerFail(),
//         authourization: 'token'
       
//       };
//       let res =yield call(auth.basicApi, params);
  
//       console.log("========Customerdata=====", res);
//     } catch (error) {
//       console.log(error);
//     }
  
//   }



//   function* fetchCustomerById(action) {
//     const filter = action.payload;
//     console.log('=============filterId=======================', filter);
//     try {
//       let params = {
//         api: `${config.Ip}/customerProf/${action.payload}`,
//         method: 'GET',
//         successAction: actionType.getCustomerByIdSuccess(),
//         failAction: actionType.getCustomerByIdFail(),
//         authourization: 'token'
//       };
//       yield call(auth.basicApi, params);
//     } catch (error) {
//       console.log(error);
//     }
//   }


  
// function* addCustomer(action) {
 

//     console.log('=========action.payload===========', action.payload);


//   try {
//     let params = {
//       api: `${config.Ip}/customerProf`,
//       method: 'POST',
//       successAction: actionType.addCustomerSuccess(),
//       failAction: actionType.addCustomerFail(),
//       authourization: 'token',
//       body: JSON.stringify(action.payload)
//     };
//     let res = yield call(auth.basicApi, params);

//     console.log('=========res===========', res);

//     if (res) {
//       yield put({ type: actionType.getCustomer().type });
//      yield call(() => toast.success('Add Customer  successful', { autoClose: 3000 }));

//     }
//   } catch (error) {
//     console.log(error);
//   }
// }



// function* updateCustomerById(action) {
//   console.log('================actin.paylad====================', action.payload);

//   try {
//     let params = {
//       api: `${config.Ip}/customerProf/${action.payload.id}`,
//       method: 'PUT',
//       successAction: actionType.updateCustomerSuccess(),
//       failAction: actionType.updateCustomerFail(),
//       authourization: 'token',
//       body: JSON.stringify({ ...action.payload, id: undefined }),
//       payload: action.payload
//     };

//     let res = yield call(auth.basicApi, params);

//     console.log('=================updateresponse===================', res);

//   } catch (error) {
//     console.log(error);
//   }
// }




// function* deleteCustomer(action) {
//   console.log(' payload============================', action.payload);
//   try {
//     let params = {
//       api: `${config.Ip}/customerProf/${action.payload}`,
//       method: 'DELETE',
//       successAction: actionType.deleteCustomerSuccess(),
//       failAction: actionType.deleteCustomerFail(),
//       authourization: 'token',
//       // body: JSON.stringify(action.payload),
//       payload: action.payload
//     };

//     let res = yield call(auth.basicApi, params);

//     if (res && res.status === 204) {
//       //  yield put({ type: actionType.getCountry().type });
//     //  yield call(() => toast.success('Delete successful', { autoClose: 3000 }));

//       // yield put({
//       //   type: actionType.totalCount().type,
//       //   payload: { 'where=': {} }
//       // });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

//   export default function* CustomerActionWatcher() {
//     yield takeEvery('customer/getCustomer', fetchCustomer);
//     yield takeEvery('customer/addCustomer', addCustomer);
//     yield takeEvery('customer/getCustomerById', fetchCustomerById);
//     yield takeEvery('customer/updateCustomer', updateCustomerById);
//     yield takeEvery('customer/deleteCustomer', deleteCustomer);
//   }
  
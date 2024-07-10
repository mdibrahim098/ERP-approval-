using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using DBS.Models;
using DBS.Service.Sales.Interfaces;
using DBS.Service.Sales.Factories;
using Newtonsoft.Json;
using DBS.Models.ViewModel.Sales;
using DBS.Models.ViewModel.SystemCommon;
using DBS.Web.Attributes;
using System.Threading.Tasks;
using DBS.Service.SystemCommon.Factories;
using DBS.Service.SystemCommon.Interfaces;
using DBS.Web.Areas.SystemCommon.Hubs;
using PBSConnLib;
using System.Collections;
using System.Data;

namespace DBS.Web.Areas.Production.api
{

   
    public class BeamCanEntryApproveController : ApiController
    {
         //private iPIMgt objPIService = null;
        private PIMgt objPIService = null;
        private PBSDBUtility ABS_IDB = new PBSDBUtility();
       
        public BeamCanEntryApproveController()
        {
            objPIService = new PIMgt();
           
                    
        }



        //For approval purposes
        [HttpPost]
        public IHttpActionResult GetPIMasterPendingApproval(object[] data)
        {
            IEnumerable<vmPIMaster> objVmPIMaster = null;
            vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[0].ToString());
            int status = JsonConvert.DeserializeObject<int>(data[1].ToString());
            int recordsTotal = 0;
            try
            {
                objVmPIMaster = objPIService.GetBeamCanPendingApproval(objcmnParam, status, out recordsTotal);
            }
            catch (Exception e)
            {
                e.ToString();
            }
            return Json(new
            {
                recordsTotal,
                objVmPIMaster
            });
        }


        [HttpPost]
        public IHttpActionResult GetBeamCanSummary(object[] data)
        {

            IEnumerable<vmPIMaster> objVmPI = null;
            vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[0].ToString());
            Int64 ID = JsonConvert.DeserializeObject<Int64>(data[1].ToString());

            try
            {
                objVmPI = objPIService.GetBeamCanSummary(objcmnParam, ID);
            }
            catch (Exception e)
            {
                e.ToString();
            }
            return Json(new
            {
                objVmPI
            });
        }


        [HttpPost]
        public HttpResponseMessage ApproveBeamCanIMaster(object[] data)
        {
            vmPIMaster itemMaster = JsonConvert.DeserializeObject<vmPIMaster>(data[0].ToString());
            vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[1].ToString());
            SalPIMaster obj = new SalPIMaster();
            string result = "";
            try
            {

                result = objPIService.ApproveBeamCanEntryIMaster(itemMaster, objcmnParam);

            }
            catch (Exception e)
            {
                // e.ToString();
                result = "";
                VmErroLog _obj = new VmErroLog();
                if (e.InnerException != null)
                {
                    _obj.MessageBody = e.ToString();//e.InnerException.Message;
                }
                else
                {
                    _obj.MessageBody = e.ToString(); //e.Message;
                }
                _obj.Module = "Production";
                _obj.Page = "BeamCanEntryApproveController";
                _obj.Method = "ApprovePIIMaster";
                _obj.ID = (int)itemMaster.ID;
                _obj.CompanyId = itemMaster.CompanyID;
                IErrorLogMgt objIErrorLog = new ErrorLogMgt();
                int loResult = objIErrorLog.Save(_obj);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


    }

}

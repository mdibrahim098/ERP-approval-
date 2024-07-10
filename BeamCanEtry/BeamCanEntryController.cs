using DBS.Models;
using DBS.Models.ViewModel.Production;
using DBS.Models.ViewModel.SystemCommon;
using DBS.Service.Production.Factories;
using DBS.Service.Production.Interfaces;
using DBS.Service.SystemCommon.Factories;
using DBS.Service.SystemCommon.Interfaces;
using DBS.Utility;
using DBS.Web.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;


namespace DBS.Web.Areas.Production.api
{
    public class BeamCanEntryController : ApiController
    {


        private iSlubStyleComposition igenericobj = null;
        private iYarnSetUpComposition igenericobjForYarnType = null;
        private iFinishingProcessEntryMgt igenericobj1 = null;




        public HttpResponseMessage SaveUpdateMasterDetail(object[] data)
        {

           

                string result = "";
                vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[0].ToString());
                vmBeamCan BeamCanEntry = JsonConvert.DeserializeObject<vmBeamCan>(data[1].ToString());
                int a = Convert.ToInt32(BeamCanEntry.ID);
               
                try
                {
                     string spQuery = "";
                    igenericobj = new SlubStyleCompositionMgt();
                    Hashtable ht = new Hashtable();
                     if (a== 0)
                {
                 
                    spQuery = "[sp_InsertBeamCanEntry]";
                    
                    //ht.Add("ID", BeamCanEntry.ID);
                    ht.Add("BeamCanNo", BeamCanEntry.CmnBeamNO);
                    ht.Add("Type", BeamCanEntry.Type);
                }else {

                    spQuery = "[sp_UpdateBeamCanEntry]";
                    ht.Add("ID", BeamCanEntry.ID);
                    ht.Add("BeamCanNo", BeamCanEntry.CmnBeamNO);
                    ht.Add("Type", BeamCanEntry.Type);
                     }

                    result = igenericobj.SaveUpdateMasterDetail(spQuery, ht);
                     
                }
                catch (Exception e)
                {
                    result = "";
                    VmErroLog _obj = new VmErroLog();
                    if (e.InnerException != null)
                    {
                        _obj.MessageBody = e.ToString(); //e.InnerException.Message;
                    }
                    else
                    {
                        _obj.MessageBody = e.ToString(); //e.Message;
                    }
                    _obj.Module = "Rnd";
                    _obj.Page = "BeamCanEntryController";
                    _obj.Method = "SaveUpdateMasterDetail";

                    IErrorLogMgt objIErrorLog = new ErrorLogMgt();
                    int loResult = objIErrorLog.Save(_obj);
                    e.ToString();
                }
                return Request.CreateResponse(HttpStatusCode.OK, result);

            }

      
        
        /// //new   
        [HttpGet]
        public IHttpActionResult LoadList(object[] data)
        {
            List<vmFinishProcess> lst = null;
            int recordsTotal = 0;
            ///  vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[0].ToString());

            try
            {
                igenericobj1 = new FinishingProcessEntryMgt();
                lst = igenericobj1.LoadListDataBeamCan(out recordsTotal).ToList();
            }
            catch (Exception e)
            {
                e.ToString();
            }
            return Json(new
            {
                recordsTotal,
                lst
            });

        }


        //[HttpPost]
        //public IHttpActionResult Delete(object[] data)
        //{
        //    vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[0].ToString());
        //    vmBeamCan BeamCanEntry = JsonConvert.DeserializeObject<vmBeamCan>(data[1].ToString());
        //    ///  vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[0].ToString());
        //    int a = Convert.ToInt32(BeamCanEntry.ID);
        //    try
        //    {
        //        igenericobj1 = new FinishingProcessEntryMgt();
        //        lst = igenericobj1.DataBeamCanDelete(a);
        //    }
        //    catch (Exception e)
        //    {
        //        e.ToString();
        //    }
        //    return Json(new
        //    {
        //        recordsTotal,
        //        lst
        //    });

        //}
        [HttpPost]
     public IHttpActionResult Delete(object[] data) {
    //if (data == null || data.Length != 2) {
    //    return BadRequest("Invalid data");
    //}

    try {
        
        vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[0].ToString());
        vmBeamCan BeamCanEntry = JsonConvert.DeserializeObject<vmBeamCan>(data[1].ToString());
        int idToDelete = Convert.ToInt32(BeamCanEntry.ID);

        
        igenericobj1 = new FinishingProcessEntryMgt();
        string  lst = igenericobj1.DataBeamCanDelete( idToDelete).ToString();

      
       // int recordsTotal = lst?Count??0;

      
        return Json(new {
           // recordsTotal,
            lst
        });
    } catch (Exception e) {
       
        Console.WriteLine(e.ToString());
        return InternalServerError(e);
    }
}
        
      
       /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       
        [HttpGet]
        public IHttpActionResult LoadListData(object[] data)
        {
            List<vmPrdSlubStyleComposition> lst = null;
            int recordsTotal = 0;
            ///  vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[0].ToString());

            try
            {
                igenericobj = new SlubStyleCompositionMgt();
                lst = igenericobj.LoadYarnSlubStyleListData(out recordsTotal).ToList();
            }
            catch (Exception e)
            {
                e.ToString();
            }
            return Json(new
            {
                recordsTotal,
                lst
            });

        }




        [HttpGet]
        public IHttpActionResult GetAllYarnType(object[] data)
        {
            List<vmPrdYarnSetUpComposition> lst = null;
            int recordsTotal = 0;
            ///  vmCmnParameters objcmnParam = JsonConvert.DeserializeObject<vmCmnParameters>(data[0].ToString());

            try
            {
                igenericobjForYarnType = new YarnSetUpCompositionMgt();
                lst = igenericobjForYarnType.LoadListData(out recordsTotal).ToList();
            }
            catch (Exception e)
            {
                e.ToString();
            }
            return Json(new
            {
                recordsTotal,
                lst
            });

        }





    }
}

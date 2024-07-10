/*
*    Created By: Yasin Sumon;
*    Create Date: 14-09-2022 (dd-mm-yy); Updated Date:14-09-2022 (dd-mm-yy);
*    Name: 'configurationController';
*    Type: $scope;
*    Purpose: Fabric Declaration For RND;
*    Service Injected: '$scope', 'ItemGroupService','conversion','uiGridConstants','uiGridGroupingConstants';
*/


app.controller('BeamCanCtrl', ['$scope', 'ProductionCrudService', '$filter', 'conversion', 'uiGridConstants', 'uiGridGroupingConstants', 'PublicService',
    function ($scope, ProductionCrudService, $filter, conversion, uiGridConstants, uiGridGroupingConstants, PublicService) {
        //**************************************************Start Vairiable Initialize**************************************************
        // dropdown
       
        var baseUrl = '/Production/api/BeamCanEntry/';

        $scope.NonApprovalButtonShow = true;
        $scope.ApprovalButtonShow = true;
        $scope.btnMrrShowText = "Show List";
        $scope.btnMrrSaveText = "Save";
        $scope.btnCompositionSaveText = "Save";
        $scope.operation = "";
        $scope.compositionID = 0;
        $scope.ListTitle = "List of Beam Can Type"
        $scope.PageTitle = "Beam Can Info";
        $scope.id = 0;
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //new function
        $scope.beamcanList = [
               { Name: "Warping", Value: "Warping" },
               { Name: "Sectional warping", Value: "Sectional warping" },
               { Name: "Dyeing", Value: "Dyeing" },
               { Name: "LCB", Value: "LCB" },
               { Name: "Sizing", Value: "Sizing" }
        ];
        $scope.list = true;
        $scope.ListItemBeamCan = [];
        //add function
        $scope.Add = function () {
            $scope.list = false;
            $scope.ListItemBeamCan.push({
                'Name': $scope.Beamdrop,
                'BeamNo': $scope.Beamfield

            });

        };

        // delete function
        $scope.delete = function (index) {
           
            $scope.ListItemBeamCan.splice(index, 1);
        };


        //save function

        $scope.Save = function () {
            objcmnParam = {
                pageNumber: page,
                pageSize: pageSize,
                IsPaging: isPaging,
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID,

            };

            var cmnFabricComposition = {
                ID: $scope.id,
                Type: $scope.Beamdrop,
                CmnBeamNO: $scope.Beamfield,
          
            };
          
            var apiRoute = baseUrl + 'SaveUpdateMasterDetail/';
            var cmnParam = "[" + JSON.stringify(objcmnParam) + "," + JSON.stringify(cmnFabricComposition) + "]";

            var yarncCompositionSave = ProductionCrudService.GetPost(apiRoute, cmnParam);

            yarncCompositionSave.then(function (response) {
              
                if (response.data == "1") {
                    Command: toastr["success"]("Save Successfully !!!");
                    $scope.clear();
                
                } else if (response.data == "2") {
                    Command: toastr["success"]("Update Successfull!!!!");
                    $("#save").prop("disabled", false);
                }
                
                else if (response.data == "") {
                        Command: toastr["warning"]("Save Not Successfull!!!!");
                    $("#save").prop("disabled", false);
                }
      
            },
            function (error) {
                console.log("Error: " + error);
            });
            location.reload();
        
        };

        //  Edit function

        //$scope.Edit = function (entity) {
            
        //    $scope.selectedEntity = angular.copy(entity);

        //    $uibModal.open({
        //        templateUrl: 'editEntityModal.html',
        //        controller: 'BeamCanEntryController',
        //        resolve: {
        //            entity: function () {
        //                return $scope.selectedEntity;
        //            }
        //        }
        //    }).result.then(function (updatedEntity) {
             
        //        for (let i = 0; i < $scope.gridOptions.data.length; i++) {
        //            if ($scope.gridOptions.data[i].id === updatedEntity.id) {
        //                $scope.gridOptions.data[i] = updatedEntity;
        //                break;
        //            }
        //        }
        //    }, function () {
        //        // Handle the modal dismissal (if necessary)
        //        console.log('Modal dismissed at: ' + new Date());
        //    });
        //};



        $scope.Edit = function (dataModel) {
            //$scope.btnMrrShowText = "Show List";//
            //$scope.btnMrrSaveText = "Update";
            $scope.cmnbtnShowHideEnDisable(0);//0=default/reset, 1=Create, 2=Update, 3=Unchange on Update mode btn text, 4=only disable save button, 5=only enable save button
            $scope.IsShow = true;
            $scope.IsHidden = true;
            $scope.list = true;
            $scope.id = dataModel.id;
            //$("reset").show();
            //$("Show").show();
            //$("saveupdate").show();
            //$scope.total = true;
          
          
            //isExisting = dataModel.ItemID;
            //$("#YarnItemGroupID").select2("data", { id: dataModel.ItemGroupID, text: dataModel.ItemGroupName });
            //$scope.YarnItemGroupID = dataModel.ItemGroupID;
            //$("#yarnCompositionID").select2("data", { id: dataModel.YarnOriginID, text: dataModel.YarnOriginName });
            //$scope.yarnCompositionID = dataModel.YarnOriginID;
            //$("#YarnCountNameId").select2("data", { id: dataModel.CountInfoId, text: dataModel.CountName });
            //$scope.YarnCountNameId = dataModel.CountInfoId;
            //$scope.countNo = dataModel.Count;
            //$("#slubStyleId").select2("data", { id: dataModel.SlubStyleId, text: dataModel.SlubStyleName });
            // $scope.Beamdrop = dataModel.Type;
            //$("#DyingProcessId").text = dataModel.Type;
            alert('Editing: ' + JSON.stringify(dataModel));
            // $("#DyingProcessId").val(dataModel.Type);

 
            //$("#DyingProcessId option[value='" + dataModel.Type + "']").text(dataModel.Type);
           
            $scope.Beamdrop = dataModel.Type;
            $("#DyingProcessId").select2("data", { data: dataModel.Type, text: dataModel.Type });
            $scope.Beamfield = dataModel.BeamCanNo;
            //$scope.Beamdrop = dataModel.Type;
          
           
            
           
        };

        //  Delete function


        //$scope.delete = function (entity) {
            
        //    if (alert('Deleting: ' + JSON.stringify(entity))) {
                
        //        let index = $scope.gridOptions.data.indexOf(entity);
        //        if (index > -1) {
        //            $scope.gridOptions.data.splice(index, 1);
        //        }

                
        //        $http.delete('/Production/api/BeamCanEntry/Delete/').then(function (response) {

        //             console.log('Entity deleted successfully');
        //         }, function(error) {
        //             console.error('Error deleting entity:', error);
                  
        //             $scope.gridOptions.data.splice(index, 0, entity);
        //         });
        //    }
        //};

        //$scope.Delete = function (entity) {
        //    alert('Deleting: ' + JSON.stringify(entity));

        //    var objcmnParam = {
        //        pageNumber: page,
        //        pageSize: pageSize,
        //        IsPaging: isPaging,
        //        loggeduser: $scope.UserCommonEntity.loggedUserID,
        //        loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
        //        menuId: $scope.UserCommonEntity.currentMenuID,
        //        tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
        //    };

           
        //    var cmnFabricComposition = {
        //        ID: $scope.id,
        //        Type: $scope.Beamdrop,
        //        CmnBeamNO: $scope.Beamfield
        //    };

            
        //    var cmnParam = [objcmnParam, cmnFabricComposition];

        //    var apiRoute = baseUrl + 'Delete/';

        //    var yarncCompositionSave = ProductionCrudService.GetPost(apiRoute, cmnParam);

        //    yarncCompositionSave.then(function (response) {
        //        if (response.data.recordsTotal > 0) {
        //            Command: toastr["success"]("Delete Successfully !!!");
        //            $scope.clear();
        //        } else {
        //            Command: toastr["warning"]("Delete Not Successful!!!!");
        //        }
        //    }, function (error) {
        //        console.log("Error: " + error);
        //    });
        //};


        $scope.Delete = function (entity) {
            alert('Deleting: ' + JSON.stringify(entity));

           
            var objcmnParam = {
                pageNumber: page,
                pageSize: pageSize,
                IsPaging: isPaging,
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
            };

           
            var cmnFabricComposition = {
                ID: entity.id
                //$scope.id = entity.id,
                //ID: $scope.id,
                //Type: $scope.Beamdrop,
                //CmnBeamNO: $scope.Beamfield
            };
            //var cmnFabricComposition = $scope.id;
          
            //var cmnParam = [objcmnParam, cmnFabricComposition];

           
            var apiRoute = baseUrl + 'Delete/';

            var cmnParam = "[" + JSON.stringify(objcmnParam) + "," + JSON.stringify(cmnFabricComposition) + "]";
            var yarncCompositionSave = ProductionCrudService.GetPost(apiRoute, cmnParam);

            yarncCompositionSave.then(function (response) {
                if (response.data.lst === "1") {
                    Command: toastr["warning"]("Delete Successfully !!!");
                    $scope.clear();
                } else if (response.data.lst === "") {
                        Command: toastr["warning"]("Delete Not Successful!!!!");
                }
            }, function (error) {
                console.log("Error: " + error);
            });

            location.reload();
        };

    

        //$scope.delete = function (rowEntity) {
         
        //    alert('Deleting: ' + JSON.stringify(rowEntity));
           
        //};





        //list function

        function LoadList(isPaging) {
            $scope.ListItemBeamCan = null;
            $scope.list = true;
            $scope.Beamfield = "";
            //$scope.Beamdrop = "";
            document.getElementById("DyingProcessId").innerText = '';
           
                
           
            /// alert("check");
          

            $scope.grdListData.enableFiltering = true;
            $scope.grdListData.enableGridMenu = true;

            // For Loading
            if (isPaging == 0)
                $scope.pagination.pageNumber = 1;

            //For Loading
            $scope.loaderMoreMrrMaster = true;
            $scope.lblMessageForMrrMaster = 'loading please wait....!';
            $scope.result = "color-red";

            //Ui Grid
            objcmnParam = {
                pageNumber: (($scope.pagination.pageNumber - 1) * $scope.pagination.pageSize),
                pageSize: $scope.pagination.pageSize,
                IsPaging: isPaging,
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
            };


            $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
                if (col.filters[0].term) {
                    return 'header-filtered';
                } else {
                    return '';
                }
            };

            $scope.grdListData = {
            
                useExternalPagination: true,
                useExternalSorting: true,

                enableFiltering: true,
                enableRowSelection: true,
                enableSelectAll: true,
                showFooter: true,
                enableGridMenu: true,

                columnDefs: [

                    { name: "Type", displayName: "Type", title: "Type", width: '40%', headerCellClass: $scope.highlightFilteredHeader },
                     { name: "BeamCanNo", displayName: "BeamCanNo", title: "BeamCanNo", width: '40%', headerCellClass: $scope.highlightFilteredHeader },
                     //new

               // { name: 'IsApproved', displayName: "Status", title: "Status", width: '30%', headerCellClass: $scope.highlightFilteredHeader },

                    {
                        name: 'Action',
                        displayName: "Action",

                        enableColumnResizing: false,
                        enableFiltering: false,
                        enableSorting: false,
                        pinnedRight: true,

                        width: '20%',
                        headerCellClass: $scope.highlightFilteredHeader,
                        cellTemplate: '<span class="label label-info label-mini" style="text-align:center !important;">' +
                                      '<a href="" title="Edit" ng-click="grid.appScope.Edit(row.entity)">' +
                                        '<i class="icon-edit" aria-hidden="true"></i> Edit' +
                                      '</a>' +
                                      '</span>' +

                                      '<span class="label label-warning label-mini" style="text-align:center !important;">' +
                                      '<a href="" title="Delete" ng-click="grid.appScope.Delete(row.entity)">' +
                                        '<i class="icon-glyphicon glyphicon-trash" aria-hidden="true"></i> Delete' +
                                      '</a>' +
                                      '</span>'
                            }
                                  //{
              //    name: 'Action',
              //    displayName: "Action",
              //    enableColumnResizing: false,
              //    enableFiltering: false,
              //    enableSorting: false,
              //    pinnedRight: true,
              //    width: '20%',
              //    headerCellClass: $scope.highlightFilteredHeader,
              //    cellTemplate: '<span class="label label-info label-mini">' +
              //      '</span>' + $scope.UserCommonEntity.cellTemplate

              //    //+

              //    //'<span class="label label-warning label-mini" style="text-align:center !important;">' +
              //    //'<a href="" title="Delete" ng-click="grid.appScope.delete(row.entity)">' +
              //    //  '<i class="icon-glyphicon glyphicon-trash" aria-hidden="true"></i> Delete' +
              //    //'</a>' +
              //    //'</span>'

              //}


                
                ],

                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                enableFiltering: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterCsvFilename: 'Mrr.csv',
                exporterPdfDefaultStyle: { fontSize: 9 },
                exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
                exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
                exporterPdfHeader: { text: "Mrr", style: 'headerStyle' },
                exporterPdfFooter: function (currentPage, pageCount) {
                    return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
                },
                exporterPdfCustomFormatter: function (docDefinition) {
                    docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                    docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                    return docDefinition;
                },
                exporterPdfOrientation: 'portrait',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 500,
                exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            };

            objcmnParam = {
                pageNumber: page,
                pageSize: pageSize,
                IsPaging: isPaging,
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
            };
            var apiRoute = baseUrl + 'LoadList/';

            var cmnParam = "[" + JSON.stringify(objcmnParam) + "]";

            var listOfYarnComposition = ProductionCrudService.GetAll(apiRoute, cmnParam);

           
            /// console.log(listOfYarnComposition);
            listOfYarnComposition.then(function (response) {
                ///   console.log(response.data);

                $scope.pagination.totalItems = response.data.recordsTotal;
                $scope.grdListData.data = response.data.lst;
                $scope.loaderMoreMrrMaster = false;
            },
            function (error) {
                console.log("Error: " + error);
            });
        };


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        $scope.IsShow = true;
        $scope.IsHidden = true;
        var isExisting = 0;
        var page = 0;
        var pageSize = 100;
        var isPaging = 0;
        var totalData = 0;

        $scope.grdListData = [];
      
        $scope.IsHidden = true;
        $scope.IsShow = true;
        $scope.IsHiddenDetail = true;
        $scope.ShowHide = function () {
            $scope.IsHidden = $scope.IsHidden == true ? false : true;
            $scope.IsHiddenDetail = true;
            if ($scope.IsHidden == true) {
                $scope.btnMrrShowText = "Show List";
                $scope.IsShow = true;

                $scope.IsCreateIcon = false;
                $scope.IsListIcon = true;
            }
            else {
                $scope.btnMrrShowText = "Create";
                $scope.IsShow = false;
                $scope.IsHidden = false;

                $scope.IsCreateIcon = true;
                $scope.IsListIcon = false;
                LoadList(0);
            }
        }




        /////
        //$scope.UserCommonEntity = $scope.menuManager.LoadPageMenu(window.location.pathname);
        //console.log($scope.UserCommonEntity);
        //***************************************************End Vairiable Initialize***************************************************
        //$scope.CmnMethod = function (FuncEntity, CmnNum) { $scope.CmnEntity = {}; $scope.CmnEntity = conversion.ExecuteCmnFunc(FuncEntity, CmnNum); if (CmnNum != 0 && CmnNum != 2) { $scope[$scope.CmnEntity.MethodName]($scope.CmnEntity.rowEntity); } if (CmnNum == 2) { for (var i = 0; i < $scope.CmnEntity.MethodName.length; i++) { $scope[$scope.CmnEntity.MethodName[i]]($scope.CmnEntity.rowEntity); } } if (CmnNum == 3) { $scope.cmnbtnShowHideEnDisable(num = (toast = $('.toast-warning').attr("style")) == undefined ? $scope.CmnEntity.num : 7); } }
        //***************************************************Start Common Task for all**************************************************
        frmName = 'frmBrandingColor'; DelFunc = ''; DelMsg = ''; EditFunc = 'Edit';
        $scope.UserCommonEntity = conversion.UserCmnEntity($scope.menuManager.LoadPageMenu(window.location.pathname), frmName, DelFunc, DelMsg, EditFunc);
        $scope.HeaderToken = conversion.Tokens($scope.tokenManager); $scope.DelParam = {};
        $scope.cmnParam = function () { objcmnParam = conversion.cmnParams(); }
        $scope.CmnMethod = function (FuncEntity, CmnNum) { $scope.CmnEntity = {}; $scope.CmnEntity = conversion.ExecuteCmnFunc(FuncEntity, CmnNum); if (CmnNum != 0 && CmnNum != 2 && CmnNum != 6) { $scope[$scope.CmnEntity.MethodName]($scope.CmnEntity.rowEntity); } if (CmnNum == 2) { for (var i = 0; i < $scope.CmnEntity.MethodName.length; i++) { $scope[$scope.CmnEntity.MethodName[i]]($scope.CmnEntity.rowEntity); } } if (CmnNum == 3) { conversion.SaveUpdatBehave($scope.CmnEntity.num); } }
        $scope.cmnbtnShowHideEnDisable = function (num) { $scope.UserCommonEntity = conversion.btnBehave(num, $scope.UserCommonEntity.IsbtnSaveDisable); }
        $scope.cmnbtnShowHideEnDisable(0);//0=default/reset, 1=Create, 2=Update, 3=Unchange on Update mode btn text, 4=only disable save button, 5=only enable save button
        //****************************************************End Common Task for all***************************************************        

        ////get company name
        //$scope.loadCompany=function()
        //{
        //    objcmnParam = {

        //        companyID : $scope.UserCommonEntity.loggedCompnyID,

        //    };

        //    var apiRoute = baseUrl + 'GetCompanyName/';
        //    var cmnParam = "[" + JSON.stringify(objcmnParam) + "]";

        //    var companyName = crudService.GetCompanyForComposition(apiRoute, cmnParam);

        //    companyName.then(function(response)
        //    {
        //        ///alert(response.data.Message);
        //        ///console.log(response.data.Message);
        //        $scope.cmpName = response.data.Message;

        //    }
        //    )
        //}

        //$scope.loadCompany();

        //**********----Pagination----***************
        $scope.pagination = {
            paginationPageSizes: [15, 25, 50, 75, 100, 500, 1000, "All"],
            ddlpageSize: 15, pageNumber: 1, pageSize: 15, totalItems: 0,

            getTotalPages: function () {
                return Math.ceil(this.totalItems / this.pageSize);
            },
            pageSizeChange: function () {
                if (this.ddlpageSize == "All")
                    this.pageSize = $scope.pagination.totalItems;
                else
                    this.pageSize = this.ddlpageSize

                this.pageNumber = 1
                loadUnitOfMeasurementRecords(1);
            },
            firstPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber = 1
                    loadUnitOfMeasurementRecords(1);
                }
            },
            nextPage: function () {
                if (this.pageNumber < this.getTotalPages()) {
                    this.pageNumber++;
                    loadUnitOfMeasurementRecords(1);
                }
            },
            previousPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                    loadUnitOfMeasurementRecords(1);
                }
            },
            lastPage: function () {
                if (this.pageNumber >= 1) {
                    this.pageNumber = this.getTotalPages();
                    loadUnitOfMeasurementRecords(1);
                }
            }
        };

        ///create new record

        //$scope.Save = function () {
        //    objcmnParam = {
        //        pageNumber: page,
        //        pageSize: pageSize,
        //        IsPaging: isPaging,
        //        loggeduser: $scope.UserCommonEntity.loggedUserID,
        //        loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
        //        menuId: $scope.UserCommonEntity.currentMenuID,
        //        tTypeId: $scope.UserCommonEntity.currentTransactionTypeID,

        //    };

        //    var cmnFabricComposition = {


        //        companyID: 1,
        //        createBy: 1,
        //        ItemGroupName: $scope.fabricType,
        //        Description: $scope.remark,
        //        isDeleted: 0

        //    };
        //    //$scope.beamcanList = [
        //    //    { Name: "Warping", Value: "Warping" },
        //    //    { Name: "Sectional warping", Value: "Sectional warping" },
        //    //    { Name: "Dyeing", Value: "Dyeing" },
        //    //    { Name: "LCB", Value: "LCB" },
        //    //    { Name: "Sizing", Value: "Sizing" }
        //    //    ];

        //    var apiRoute = baseUrl + 'SaveUpdateMasterDetail/';
        //    var cmnParam = "[" + JSON.stringify(objcmnParam) + "," + JSON.stringify(cmnFabricComposition) + "]";

        //    var yarncCompositionSave = ProductionCrudService.GetPost(apiRoute, cmnParam);

        //    yarncCompositionSave.then(function (response) {
        //        ///   console.log(response.data);
        //        ////alert(response.data);
        //        if (response.data == "1") {
        //            Command: toastr["success"]("Save Successfully !!!");
        //            $scope.clear();
        //            //  $scope.HGRRNo = response.data;


        //        }
        //        else if (response.data == "Duplicate Fabric Type") {
        //                Command: toastr["warning"]("Duplicate Fabric Type");
        //            $("#save").prop("disabled", false);
        //        }
        //        else if (response.data == "") {
        //                Command: toastr["warning"]("Save Not Successfull!!!!");
        //            $("#save").prop("disabled", false);
        //        }

        //    },
        //    function (error) {
        //        console.log("Error: " + error);
        //    });
        //};



        //**********----Get All Composition Records----***************
        //function LoadListData(isPaging) {
        //    /// alert("check");


        //    $scope.grdListData.enableFiltering = true;
        //    $scope.grdListData.enableGridMenu = true;

        //    // For Loading
        //    if (isPaging == 0)
        //        $scope.pagination.pageNumber = 1;

        //    //For Loading
        //    $scope.loaderMoreMrrMaster = true;
        //    $scope.lblMessageForMrrMaster = 'loading please wait....!';
        //    $scope.result = "color-red";

        //    //Ui Grid
        //    objcmnParam = {
        //        pageNumber: (($scope.pagination.pageNumber - 1) * $scope.pagination.pageSize),
        //        pageSize: $scope.pagination.pageSize,
        //        IsPaging: isPaging,
        //        loggeduser: $scope.UserCommonEntity.loggedUserID,
        //        loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
        //        menuId: $scope.UserCommonEntity.currentMenuID,
        //        tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
        //    };


        //    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        //        if (col.filters[0].term) {
        //            return 'header-filtered';
        //        } else {
        //            return '';
        //        }
        //    };

        //    $scope.grdListData = {
        //        useExternalPagination: true,
        //        useExternalSorting: true,

        //        enableFiltering: true,
        //        enableRowSelection: true,
        //        enableSelectAll: true,
        //        showFooter: true,
        //        enableGridMenu: true,

        //        columnDefs: [





        //            { name: "ItemGroupName", displayName: "Fabric Type", title: "Fabric Type", width: '50%', headerCellClass: $scope.highlightFilteredHeader },
        //             { name: "remark", displayName: "Remarks", title: "Remarks", width: '50%', headerCellClass: $scope.highlightFilteredHeader }

        //            //{
        //            //    name: 'Action',
        //            //    displayName: "Action",

        //            //    enableColumnResizing: false,
        //            //    enableFiltering: false,
        //            //    enableSorting: false,
        //            //    pinnedRight: true,


        //            //    width: '10%',
        //            //    headerCellClass: $scope.highlightFilteredHeader,
        //            //    cellTemplate: '<span class="label label-info label-mini" style="text-align:center !important;">' +
        //            //                  '<a href="" title="Edit" ng-click="grid.appScope.Edit(row.entity)">' +
        //            //                    '<i class="icon-edit" aria-hidden="true"></i> Edit' +
        //            //                  '</a>' +
        //            //                  '</span>' +

        //            //                  '<span class="label label-warning label-mini" style="text-align:center !important;">' +
        //            //                  '<a href="" title="Delete" ng-click="grid.appScope.delete(row.entity)">' +
        //            //                    '<i class="icon-glyphicon glyphicon-trash" aria-hidden="true"></i> Delete' +
        //            //                  '</a>' +
        //            //                  '</span>'

        //            //}
        //        ],

        //        onRegisterApi: function (gridApi) {
        //            $scope.gridApi = gridApi;
        //        },
        //        enableFiltering: true,
        //        enableGridMenu: true,
        //        enableSelectAll: true,
        //        exporterCsvFilename: 'Mrr.csv',
        //        exporterPdfDefaultStyle: { fontSize: 9 },
        //        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        //        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        //        exporterPdfHeader: { text: "Mrr", style: 'headerStyle' },
        //        exporterPdfFooter: function (currentPage, pageCount) {
        //            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        //        },
        //        exporterPdfCustomFormatter: function (docDefinition) {
        //            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        //            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        //            return docDefinition;
        //        },
        //        exporterPdfOrientation: 'portrait',
        //        exporterPdfPageSize: 'LETTER',
        //        exporterPdfMaxGridWidth: 500,
        //        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        //    };

        //    objcmnParam = {
        //        pageNumber: page,
        //        pageSize: pageSize,
        //        IsPaging: isPaging,
        //        loggeduser: $scope.UserCommonEntity.loggedUserID,
        //        loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
        //        menuId: $scope.UserCommonEntity.currentMenuID,
        //        tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
        //    };
        //    var apiRoute = baseUrl + 'LoadListData/';

        //    var cmnParam = "[" + JSON.stringify(objcmnParam) + "]";

        //    var listOfYarnComposition = ProductionCrudService.GetAll(apiRoute, cmnParam);


        //    /// console.log(listOfYarnComposition);
        //    listOfYarnComposition.then(function (response) {
        //        ///   console.log(response.data);

        //        $scope.pagination.totalItems = response.data.recordsTotal;
        //        $scope.grdListData.data = response.data.lst;
        //        $scope.loaderMoreMrrMaster = false;
        //    },
        //    function (error) {
        //        console.log("Error: " + error);
        //    });
        //};

       // LoadList(0);


        $scope.clear = function () {
           
            $scope.IsHidden = true;
            $scope.IsShow = true;
            $scope.IsHiddenDetail = true

            $scope.IsCreateIcon = false;
            $scope.IsListIcon = true;

            $scope.btnMrrSaveText = "Save";
            $scope.btnMrrShowText = "Show List";
            $scope.fabricType = "";


            $scope.compositionID = 0;
            $scope.yarnType = "";
            $scope.remark = "";
            $scope.btnUnitOfMeasurementSaveText = "Save";


            LoadList(0);

            //$scope.Beamdrop = '';
            //$("#DyingProcessId").select2("data", '');
            //$scope.Beamfield = '';
            //Add();
        }





    }]);


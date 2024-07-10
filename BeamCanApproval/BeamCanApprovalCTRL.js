app.controller('PIApprovalCtrl', ['$scope', 'crudService', 'conversion', '$filter', '$localStorage', 'uiGridConstants',
    function ($scope, crudService, conversion, $filter, $localStorage, uiGridConstants) {
        //**************************************************Start Vairiable Initialize**************************************************
        var baseUrl = '/Production/api/BeamCanEntryApprove/';
        var deliveryController = '/Sales/api/HeadOfficeSalesDeliveryOrderEntry/';
        $scope.permissionPageVisibility = true;
        $scope.UserCommonEntity = {};
        $scope.HeaderToken = {};
        objcmnParam = {};

        $scope.ChkApprovalOrUpdateMode = false;
        $scope.IsApproveChoosen = false;
        $scope.IsDeclinChoosen = false;
        $scope.IsApprovalAsync = false;
        $scope.IsDeclinedAsync = false;
        $scope.CallApproveAfterSuccessUpdate = false;
        $scope.ApprovalButtonShow = false;
        $scope.NonApprovalButtonShow = true;
        $scope.IsDisabled = false;
        // End code for approval
        $scope.IsUpdateMode = false;
        $scope.LCTypeList = [];

        $scope.gridOptionsPID = [];
        $scope.gridOptionsActivePI = [];
        $scope.gridOptionslistItemMaster = [];
        $scope.btnMrrSaveText = "Save";
        $scope.btnMrrShowText = "Show List";

        $scope.IsCreateIcon = false;
        $scope.IsListIcon = true;
        $scope.IsDOCompleted = "";
        var isExisting = 0;
        var page = 0;
        var pageSize = 100;
        var isPaging = 0;
        var totalData = 0;
        var IsReviseClick = 0;
        var IsSplitClick = 0;

        $scope.PIDate = $filter('date')(new Date(), 'dd/MM/yyyy');

        $scope.FullFormateDate = [];
        $scope.ListCompany = [];
        $scope.bool = true;
        $scope.PIID = "0";
        $scope.ID = "0";
        var step = 1;
        $scope.TotalQuantity = 0.00;
        $scope.TotalAmount = 0.00;
        $scope.listLCType = [];

        $scope.btnPIReviseText = "Revise";
        $scope.btnPISplitText = "Split";
        $scope.IsbtReviseShow = false;
        $scope.IsbtSplitShow = false;

        $scope.NewSplittedPINo = '';
        $scope.PageTitle = 'BeamCan Entry Invoice';
        $scope.ListTitle = 'PI Records';
        $scope.ListTitleActivePIMasters = 'BeamCan Entry Information';
        // $scope.ListTitleSampleNo = 'Sample Info';
        $scope.ListTitlePIDeatails = 'Listed Item of Proforma Invoice (PI)';
        $scope.ConfirmationationModalTitle = '';

        $scope.ListPIDetails = [];
        $scope.ListActivePIMaster = [];
        $scope.Negotiation = 15;
        $scope.OverdueInterest = 14;
        $scope.lstlctype = 0;
        $scope.FreightCharge = 0.00;
        $scope.Discount = 0;
        $scope.listSalesPerson = [];
        $scope.showDtgrid = 0;
        $scope.listBuyer = [];
        $scope.lstBuyerList = '';
        $scope.ListPIProgressDetails = [];
        $scope.Changes = '';
        $scope.ReviseHistoryList = [];
        $scope.PIProgressList = [];
        $scope.Vendor = '';


        $scope.VendorHover = false;
        $scope.BuyerHover = false;


        //*************---Show and Hide Order---**********//
        $scope.IsContinue = '1';
        //$scope.IsHiddenDetail = true;
        //***************************************************End Vairiable Initialize***************************************************
        //$scope.CmnMethod = function (FuncEntity, CmnNum) { $scope.CmnEntity = {}; $scope.CmnEntity = conversion.ExecuteCmnFunc(FuncEntity, CmnNum); if (CmnNum != 0 && CmnNum != 2) { $scope[$scope.CmnEntity.MethodName]($scope.CmnEntity.rowEntity); } if (CmnNum == 2) { for (var i = 0; i < $scope.CmnEntity.MethodName.length; i++) { $scope[$scope.CmnEntity.MethodName[i]]($scope.CmnEntity.rowEntity); } } if (CmnNum == 3) { $scope.cmnbtnShowHideEnDisable(num = (toast = $('.toast-warning').attr("style")) == undefined ? $scope.CmnEntity.num : 7); } }
        //***************************************************Start Common Task for all**************************************************
        frmName = 'frmPI'; DelFunc = ''; DelMsg = 'PINO'; EditFunc = 'Edit';
        $scope.UserCommonEntity = conversion.UserCmnEntity($scope.menuManager.LoadPageMenu(window.location.pathname), frmName, DelFunc, DelMsg, EditFunc);
        $scope.HeaderToken = conversion.Tokens($scope.tokenManager); $scope.DelParam = {};
        $scope.cmnParam = function () { objcmnParam = conversion.cmnParams(); }
        $scope.CmnMethod = function (FuncEntity, CmnNum) { $scope.CmnEntity = {}; $scope.CmnEntity = conversion.ExecuteCmnFunc(FuncEntity, CmnNum); if (CmnNum != 0 && CmnNum != 2 && CmnNum != 6) { $scope[$scope.CmnEntity.MethodName]($scope.CmnEntity.rowEntity); } if (CmnNum == 2) { for (var i = 0; i < $scope.CmnEntity.MethodName.length; i++) { $scope[$scope.CmnEntity.MethodName[i]]($scope.CmnEntity.rowEntity); } } if (CmnNum == 3) { conversion.SaveUpdatBehave($scope.CmnEntity.num); } }
        $scope.cmnbtnShowHideEnDisable = function (num) { $scope.UserCommonEntity = conversion.btnBehave(num, $scope.UserCommonEntity.IsbtnSaveDisable); }
        $scope.cmnbtnShowHideEnDisable(0);//0=default/reset, 1=Create, 2=Update, 3=Unchange on Update mode btn text, 4=only disable save button, 5=only enable save button
        //****************************************************End Common Task for all***************************************************        

        //************************************************Start Show List Information Dynamic Grid******************************************************       
        $scope.IsHidden = true;
        $scope.IsShow = true;
        $scope.isDetailsShow = false;
        $scope.IsUpdate = false;
        ////////////////////////PIAPPROVAL//////////////////
        $scope.IsHidden = false;
        $scope.IsShow = false;
        $scope.isDetailsShow = false;
        $scope.IsUpdate = false;
        $scope.ListBtn = true;
        $scope.ShowListBtn = false;
        $scope.btnApproveReject = false;
        var Pending = 0;


        $scope.IsHiddenDetail = true;
        $scope.ShowHide = function () {
            $scope.IsHidden = $scope.IsHidden == true ? false : true;
            $scope.IsHiddenDetail = true;

            $scope.btnPendingClick = true;

            $scope.btnApprovedClick = false;
            $scope.btnRejectedClick = false;

            Pending = 0;
            LoadListData(0);
            $scope.IsShow = false;
            $scope.ListBtn = true;
            $scope.ShowListBtn = false;
            $scope.btnApproveReject = false;

            if ($scope.IsHidden == true) {
                $scope.btnMrrShowText = "Show List";
                $scope.IsShow = true;
                $scope.isDetailsShow = false;

                $scope.IsCreateIcon = false;
                $scope.IsListIcon = true;
                $scope.clear();
            }
            else {
                $scope.btnMrrShowText = "Create";
                $scope.IsShow = false;
                $scope.isDetailsShow = false;
                /////Edit
                $scope.RefreshMasterList();
                $scope.IsbtReviseShow = false;
                $scope.IsbtSplitShow = false;

                $scope.IsHidden = false;

                $scope.IsCreateIcon = true;
                $scope.IsListIcon = false;
                LoadListData(0);
            }
        }

        $scope.ListBtn = true;
        $scope.ShowListBtn = false;
        $scope.btnPendingClick = true;
        $scope.btnApprovedClick = false;



        $scope.ShowVendorHover = function () {
            $scope.VendorHover = true;
        }

        $scope.HideVendorHover = function () {
            $scope.VendorHover = false;
        }
        $scope.ShowBuyerHover = function () {
            $scope.BuyerHover = true;
        }

        $scope.HideBuyerHover = function () {
            $scope.BuyerHover = false;
        }

        $scope.btnPndingClick = function () {
            $scope.btnPendingClick = true;
            $scope.btnApprovedClick = false;
            $scope.btnRejectedClick = false;
            Pending = 0;
            LoadListData(0);
        }

        $scope.btnAprvedClick = function () {
            $scope.btnApprovedClick = true;
            $scope.btnPendingClick = false;
            $scope.btnRejectedClick = false;
            Pending = 1;
            LoadListData(0);
        }

        $scope.btnRjctdClick = function () {
            $scope.btnRejectedClick = true;
            $scope.btnPendingClick = false;
            $scope.btnApprovedClick = false;
            Pending = 2;
            LoadListData(0);
        }
        ////////////////////////PIAPPROVAL//////////////////


        //**********---- Get All Buyer Records ----*************** //
        function loadBuyerRecords(isPaging) {

            var apiRoute = baseUrl + 'GetPIBuyer/';
            var listBuyer = crudService.getModel(apiRoute, page, pageSize, isPaging, $scope.HeaderToken.get);
            listBuyer.then(function (response) {
                $scope.listBuyer = response.data;
            },
            function (error) {
                console.log("Error: " + error);
            });
        }
        loadBuyerRecords(0);




        //**********----Get Company Record and filter by LoginCompanyID and cascading with Advising bank and branch record ----***************//
        var defaultCompanyID = "";

        function loadCompanyRecords(isPaging) {

            var apiRoute = baseUrl + 'GetPICompany/';
            $scope.listBankAdvising = [];
            $scope.listBankBranch = [];
            $scope.lstBankAdvisingList = '';
            $scope.lstBankBranchList = '';


            var listCompany = crudService.getUserWiseCompany(apiRoute, $scope.UserCommonEntity.loggedUserID, $scope.HeaderToken.get);
            listCompany.then(function (response) {
                $scope.listCompany = response.data;
                angular.forEach($scope.listCompany, function (item) {
                    if (item.CompanyID == $scope.UserCommonEntity.loggedCompnyID) {
                        defaultCompanyID = item.CompanyID;
                        $scope.lstCompanyList = item.CompanyID;
                        $("#ddlCompany").select2("data", { id: item.CompanyID, text: item.CompanyName });
                        //$scope.LoadBankAdvisingByCompanyID();

                        return false;
                    }
                });
            },
            function (error) {
                console.log("Error: " + error);
            });
        }
        loadCompanyRecords(0);



        var defaultBankID = "";



        $scope.LoadDetailByBookingID = function () {
            //$scope.IsHiddenDetail = false;
            $scope.ListPIDetails = [];
            var groupID = $scope.lstBookingNG;
            var apiRoute = baseUrl + 'GetBookingDetailByID/';
            var listItemMaster = crudService.getItemMasterByGroup(apiRoute, objcmnParam, groupID, $scope.HeaderToken.get);
            listItemMaster.then(function (response) {
                $scope.ListPIDetails = response.data.objPIItemMaster;
                //$scope.isDetailsShow = $scope.ListPIDetails.length > 0 ? true : false;
                $scope.isDetailsShow = true;

                /// for adding total quantity and amount

                $scope.TotalQuantity = 0;
                $scope.TotalAmount = 0;
                angular.forEach($scope.ListPIDetails, function (item) {
                    item.lstUOMName = 'Yds';
                    item.RemainingQty = parseFloat(item.RemainingQty).toFixed(2);
                    item.BookingQty = parseFloat(item.BookingQty).toFixed(2);
                    item.Selected = false;
                    $scope.TotalQuantity = parseFloat($scope.TotalQuantity) + parseFloat(item.InputQty);
                    $scope.TotalAmount = parseFloat($scope.TotalAmount) + parseFloat(item.Amount);
                })

                //$scope.showDtgrid = $scope.ListPIDetails.length;
            },
            function (error) {
                console.log("Error: " + error);
            });
        }

        //**********----Pagination----***************
        ////////////////////////PIAPPROVAL//////////////////
        $scope.pagination = {
            paginationPageSizes: [15, 25, 50, 75, 100, 500, 1000, "All"],
            ddlpageSize: 500, pageNumber: 1, pageSize: 500, totalItems: 0,

            getTotalPages: function () {
                return Math.ceil(this.totalItems / this.pageSize);
            },
            pageSizeChange: function () {
                if (this.ddlpageSize == "All")
                    this.pageSize = $scope.pagination.totalItems;
                else
                    this.pageSize = this.ddlpageSize

                this.pageNumber = 1
                LoadListData(1);
            },
            firstPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber = 1
                    LoadListData(1);
                }
            },
            nextPage: function () {
                if (this.pageNumber < this.getTotalPages()) {
                    this.pageNumber++;
                    LoadListData(1);
                }
            },
            previousPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                    LoadListData(1);
                }
            },
            lastPage: function () {
                if (this.pageNumber >= 1) {
                    this.pageNumber = this.getTotalPages();
                    LoadListData(1);
                }
            }
        };

        //**********----Get All Active PI Records----***************
        function LoadListData(isPaging) {

            $scope.gridOptionsActivePI.enableFiltering = true;
            // For Loading
            //if (isPaging == 0)
            //    $scope.pagination.pageNumber = 1;

            // For Loading
            $scope.loaderMore = true;
            $scope.lblMessage = 'loading please wait....!';
            $scope.result = "color-red";

            //Ui Grid
            $scope.cmnParam();


            $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
                if (col.filters[0].term) {
                    return 'header-filtered';
                } else {
                    return '';
                }
            };

            $scope.gridOptionsActivePI = {
                columnDefs: [
                    //{ name: "PIID", displayName: "PI ID", visible: false, headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Type", displayName: "Type", title: "Type", width: '40%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "BeamCan_No", displayName: "BeamCan No", title: "BeamCan No", width: '40%', headerCellClass: $scope.highlightFilteredHeader },
                    //{ name: "PIDate", displayName: "PI Date", cellFilter: 'date:"dd-MM-yyyy"', width: '10%', headerCellClass: $scope.highlightFilteredHeader },
                  
                    //{ name: "LCStatus", displayName: "LC Status", visible: false, title: "LC Status", width: '7%', headerCellClass: $scope.highlightFilteredHeader },
                    //{ name: "HDOStatus", displayName: "HDO Status", visible: false, title: "HDO Status", width: '7%', headerCellClass: $scope.highlightFilteredHeader },
                    //{
                    //    name: "PIQunatity", displayName: "PI Qunatity", title: "PI Qunatity", width: '15%', headerCellClass: $scope.highlightFilteredHeader,
                    //    cellTemplate: '<div style="text-align: center;margin-top:5%;">{{row.entity.PIQunatity + " " + row.entity.UomName }}</div>'
                    //},
                    //{ name: "PIAmount", displayName: "PI Amount", title: "PI Amount", width: '10%', headerCellClass: $scope.highlightFilteredHeader },
                    //{ name: "BookingID", displayName: "BookingID", visible: false, headerCellClass: $scope.highlightFilteredHeader },
                    //{ name: "BookingNo", displayName: "Booking No", title: "Booking No", visible: false, width: '13%', headerCellClass: $scope.highlightFilteredHeader },
                    {
                        name: 'Action',
                        displayName: "Action",
                        enableColumnResizing: false,
                        enableFiltering: false,
                        enableSorting: false,
                        width: '20%',
                        headerCellClass: $scope.highlightFilteredHeader,
                        visible: $scope.UserCommonEntity.visible,
                        cellTemplate: '<span class="label label-warning label-mini" style="text-align:center !important;">' +
                                          '<a href="" title="Select" ng-click="grid.appScope.Edit(row.entity)">' +
                                            '<i class="icon-check" aria-hidden="true"></i> View' +
                                          '</a>' 
                                         // +
                                          //'</span>' +
                                          //'<span class="label label-success label-mini" style="text-align:center !important;">' +
                                          //'<a href="" title="Select" ng-click="grid.appScope.LoadHistoryModal(row.entity)">' +
                                          //  '<i class="icon-check" aria-hidden="true"></i> Appr Hist' +
                                          //'</a>' +
                                          //'</span>'


                    }

                ],

                enableFiltering: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterCsvFilename: 'ActivePIMaster.csv',
                exporterPdfDefaultStyle: { fontSize: 9 },
                exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
                exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
                exporterPdfHeader: { text: "ActivePIMaster", style: 'headerStyle' },
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
                pageNumber: $scope.pagination.pageNumber,
                pageSize: $scope.pagination.pageSize,
                IsPaging: isPaging,
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID,
                step:step
            };

            var apiRoute = baseUrl + 'GetPIMasterPendingApproval/';
            var cmnParam = "[" + JSON.stringify(objcmnParam) + ',' + JSON.stringify(Pending) + "]";
            var listActivePIMaster = crudService.GetPost(apiRoute, cmnParam);
            listActivePIMaster.then(function (response) {
                $scope.pagination.totalItems = response.data.recordsTotal > 0 ? response.data.objVmPIMaster[0].TotalRecords : 0;
                $scope.gridOptionsActivePI.data = response.data.objVmPIMaster;
                $scope.loaderMoreActivePIMaster = false;
                $scope.loaderMore = false;
            },
            function (error) {
                console.log("Error: " + error);
            });
        };
        LoadListData(0);

        function LoadListDataApproved(isPaging) {

            $scope.gridOptionsActivePI.enableFiltering = true;
            // For Loading
            //if (isPaging == 0)
            //    $scope.pagination.pageNumber = 1;

            // For Loading
            $scope.loaderMore = true;
            $scope.lblMessage = 'loading please wait....!';
            $scope.result = "color-red";

            //Ui Grid
            $scope.cmnParam();


            $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
                if (col.filters[0].term) {
                    return 'header-filtered';
                } else {
                    return '';
                }
            };

            $scope.gridOptionsActivePI = {
                columnDefs: [
                    { name: "PIID", displayName: "PI ID", visible: false, headerCellClass: $scope.highlightFilteredHeader },
                    //{ name: "IsLcCompleted", visible: false, headerCellClass: $scope.highlightFilteredHeader },
                    { name: "PINO", displayName: "PI NO", title: "PI NO", width: '16%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "PIDate", displayName: "PI Date", cellFilter: 'date:"dd-MM-yyyy"', width: '7%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "BuyerFirstName", displayName: "Buyer Name", title: "Buyer Name", width: '20%', headerCellClass: $scope.highlightFilteredHeader },

                    //{ name: "ComboNameShipment", displayName: "Shipment", title: "Shipment", width: '7%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "LCStatus", displayName: "LC Status", title: "LC Status", width: '7%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "HDOStatus", displayName: "HDO Status", title: "HDO Status", width: '7%', headerCellClass: $scope.highlightFilteredHeader },
                    {
                        name: "PIQunatity", displayName: "PI Qunatity", title: "PI Qunatity", width: '10%', headerCellClass: $scope.highlightFilteredHeader,
                        cellTemplate: '<div style="text-align: center;margin-top:5%;">{{row.entity.PIQunatity + " " + row.entity.UomName }}</div>'
                    },
                    { name: "PIAmount", displayName: "PI Amount", title: "PI Amount", width: '10%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "BookingID", displayName: "BookingID", visible: false, headerCellClass: $scope.highlightFilteredHeader },
                    { name: "BookingNo", displayName: "Booking No", title: "Booking No", width: '13%', headerCellClass: $scope.highlightFilteredHeader },
                    {
                        name: 'Action',
                        displayName: "Action",
                        enableColumnResizing: false,
                        enableFiltering: false,
                        enableSorting: false,
                        width: '10%',
                        headerCellClass: $scope.highlightFilteredHeader,
                        visible: $scope.UserCommonEntity.visible,
                        cellTemplate: '<span class="label label-warning label-mini" style="text-align:center !important;">' +
                                          '<a href="" title="Select" ng-click="grid.appScope.Edit(row.entity)">' +
                                           '<i class="icon-check" aria-hidden="true"></i> View' +
                                          '</a>' +

                                          '</span>' +
                                          '<span class="label label-success label-mini" style="text-align:center !important;">' +
                                          '<a href="" title="Select" ng-click="grid.appScope.LoadHistoryModal(row.entity)">' +
                                            '<i class="icon-check" aria-hidden="true"></i> Appr Hist' +
                                          '</a>' +
                                          '</span>'


                    }

                ],

                enableFiltering: true,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterCsvFilename: 'ActivePIMaster.csv',
                exporterPdfDefaultStyle: { fontSize: 9 },
                exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
                exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
                exporterPdfHeader: { text: "ActivePIMaster", style: 'headerStyle' },
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
                pageNumber: $scope.pagination.pageNumber,
                pageSize: $scope.pagination.pageSize,
                IsPaging: isPaging,
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
            };

            var apiRoute = baseUrl + 'GetPIMasterApprovedList/';
            var cmnParam = "[" + JSON.stringify(objcmnParam) + "]";
            var listActivePIMaster = crudService.GetPost(apiRoute, cmnParam);
            listActivePIMaster.then(function (response) {
                $scope.pagination.totalItems = response.data.recordsTotal > 0 ? response.data.objVmPIMaster[0].TotalRecords : 0;
                $scope.gridOptionsActivePI.data = response.data.objVmPIMaster;
                $scope.loaderMoreActivePIMaster = false;
                $scope.loaderMore = false;
            },
            function (error) {
                console.log("Error: " + error);
            });
        };



        $scope.Edit = function (dataModel) {
            $scope.btnMrrShowText = "Show List";
            $scope.ListBtn = false;
            $scope.ShowListBtn = true;
            $scope.btnApproveReject = true;
            $scope.IsShow = true;
            $scope.isDetailsShow = true;
            $scope.IsHidden = true;
            $scope.loadPIMasterDetailsByActivePI(dataModel);

            $scope.Changes = '';
            $scope.ReviseHistoryList = [];
            var objcmnParam = {
                pageNumber: $scope.pagination.pageNumber,
                pageSize: $scope.pagination.pageSize,
                IsPaging: isPaging,
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
            };
            var RevisionRemarks = '';
            var apiRoute = baseUrl + 'GetBeamCanSummary/';
            var CmnParam = "[" + JSON.stringify(objcmnParam) + "," + JSON.stringify(dataModel.ID) + "]";
            var listPISummary = crudService.compositionSaveUpdate(apiRoute, CmnParam);
            listPISummary.then(function (response) {

                $scope.ReviseHistoryList = [];
                angular.forEach(response.data.objVmPI, function (Revision) {
                    RevisionRemarks = RevisionRemarks + '\r\n' + Revision.Remarks;
                    $scope.ReviseHistoryList.push(Revision.Remarks);
                    $scope.Beamdrop = dataModel.Type;
                    $("#DyingProcessId").select2("data", { data: dataModel.Type, text: dataModel.Type });
                    $scope.Beamfield = dataModel.BeamCan_No;
                    $scope.ID = dataModel.ID;
                })

                $scope.Changes = RevisionRemarks;


                var text = document.getElementById('txtChanges');


                let numberOfLineBreaks = ($scope.Changes.match(/\n/g) || []).length;

                let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
                text.style.height = newHeight;
                text.style.height = newHeight + 'px';

            },
            function (error) {
                console.log("Error: " + error);
            });



            //---------------get Pi Progress--------------------

            $scope.PIProgressList = [];
            var objcmnParam = {
                pageNumber: $scope.pagination.pageNumber,
                pageSize: $scope.pagination.pageSize,
                IsPaging: isPaging,
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
            };
            var apiRoute = '/Sales/api/PIProgress/' + 'GetPIProgressDetails/';
            var CmnParam = "[" + JSON.stringify(objcmnParam) + "," + JSON.stringify(dataModel.PIID) + "]";
            var listPIProgress = crudService.compositionSaveUpdate(apiRoute, CmnParam);
            listPIProgress.then(function (response) {

                $scope.PIProgressList = response.data.objPIProgressList;
                //angular.forEach(response.data.objPIProgressList, function (PIProgress) {
                //    //RevisionRemarks = RevisionRemarks + '\r\n' + Revision.Remarks
                //    $scope.PIProgressList.push(PIProgress.StatusName + ' (' + PIProgress.ApprovalDate+')');
                //})
                //$("textarea#txtChanges").val(RevisionRemarks);

            },
            function (error) {
                console.log("Error: " + error);
            });
        }




        $scope.RefreshMasterList = function () {
            $scope.pagination.pageNumber = 1;
            LoadListData(0);
        }
        $scope.RefreshMasterList();
        ////////////////////////PIAPPROVAL//////////////////
        //**********---- Get Shipment Record ----*************** //
        function loadShipmentRecords(isPaging) {

            var apiRoute = baseUrl + 'GetPIShipment/';
            var listShipment = crudService.getModel(apiRoute, page, pageSize, isPaging, $scope.HeaderToken.get);
            listShipment.then(function (response) {
                $scope.listShipment = response.data
                angular.forEach($scope.listShipment, function (item) {
                    if (item.IsDefault == true) {

                        // $("#ddlShipment").select2("data", { id: item.ComboID, text: item.ComboName });
                        $scope.lstShipmentList = item.ComboID;
                        $("#ddlShipment").select2("data", { id: item.ComboID, text: item.ComboName });

                        return false;
                    }
                });
            },
            function (error) {
                console.log("Error: " + error);
            });
        }
        loadShipmentRecords(0);

        //**********---- Get Validity Record ----*************** //

        function loadValidityRecords(isPaging) {

            var apiRoute = baseUrl + 'GetPIValidity/';
            var listValidity = crudService.getModel(apiRoute, page, pageSize, isPaging, $scope.HeaderToken.get);
            listValidity.then(function (response) {
                $scope.listValidity = response.data
                angular.forEach($scope.listValidity, function (item) {
                    if (item.IsDefault == true) {
                        //  $("#ddlValidity").select2("data", { id: item.ComboID, text: item.ComboName });

                        $scope.lstValidityList = item.ComboID;
                        $("#ddlValidity").select2("data", { id: item.ComboID, text: item.ComboName });
                        return false;
                    }
                });
            },
            function (error) {
                console.log("Error: " + error);
            });
        }
        loadValidityRecords(0);

        //**********---- Get PI Status Record ----*************** //



        //**********---- Get Incerm Record ----*************** //

        function loadIncotermRecords(isPaging) {

            var apiRoute = baseUrl + 'GetIncoterm/';
            var listIncoterm = crudService.getModel(apiRoute, page, pageSize, isPaging, $scope.HeaderToken.get);
            listIncoterm.then(function (response) {
                $scope.listIncoterm = response.data
                angular.forEach($scope.listIncoterm, function (item) {
                    if (item.IsDefault == true) {
                        $scope.lstIncoNG = item.IncoTermID;
                        $("#ddlIncoterm").select2("data", { id: item.IncoTermID, text: item.IncotermName });
                        return false;
                    }
                });
            },
            function (error) {
                console.log("Error: " + error);
            });
        }
        loadIncotermRecords(0);




        //**********---- Get Booking Record ----*************** //

        $scope.LoadBookingNoByBuyerID = function () {
            $scope.cmnParam();
            objcmnParam.id = $scope.lstBuyerList;
            $scope.listBooking = [];
            $scope.lstBookingNG = '';
            $("#ddlBookingList").select2("data", { id: '', text: '--Select Booking--' });
            //var buyerID = $scope.lstBuyerList;
            //var companyID = $scope.lstCompanyList;
            var cmnParam = "[" + JSON.stringify(objcmnParam) + "," + JSON.stringify($scope.lstBuyerList) + "]";
            //ModelsArray = [objcmnParam];
            var apiRoute = baseUrl + 'GetBookingList/';
            var listBooking = crudService.GetPost(apiRoute, cmnParam);
            listBooking.then(function (response) {
                $scope.listBooking = response.data.objIncoterm;
            },
            function (error) {
                console.log("Error: " + error);
            });
        }


        //**********---- Get Sales Person Records and filter by LoginUserID ----*************** //

        function loadSalesPersonRecords(isPaging) {
            $scope.listSalesPerson = [];
            var apiRoute = baseUrl + 'GetPISalesPerson/';
            var listSalesPerson = crudService.getModel(apiRoute, page, pageSize, isPaging, $scope.HeaderToken.get);
            listSalesPerson.then(function (response) {
                // $scope.listSalesPerson = response.data;
                //  $scope.listSalesPerson = $filter('filter')($scope.listSalesPerson, { UserID: LCompanyID });
                angular.forEach(response.data, function (item) {
                    if (item.UserID == $scope.UserCommonEntity.loggedUserID) {
                        $scope.listSalesPerson.push({ UserID: item.UserID, UserFullName: item.UserFullName });

                        // $("#ddlSalesPerson").select2("data", { id: item.UserID, text: item.UserFullName });
                        $scope.lstSalesPersonList = item.UserID;
                        $("#ddlSalesPerson").select2("data", { id: item.UserID, text: item.UserFullName });
                    }
                });
            },
            function (error) {
                console.log("Error: " + error);
            });
        }
        loadSalesPersonRecords(0);


        $scope.checkAll = function () {
            //if ($scope.selectedAll) {
            //    $scope.selectedAll = true;
            //} else {
            //    $scope.selectedAll = false;
            //}
            //angular.forEach($scope.ListPIDetails, function (dataModel) {
            //    dataModel.Selected = $scope.selectedAll;
            //});
        };

        //**********----get Item  Record from itemList popup ----***************//

        $scope.getListItemMaster = function (dataModel) {

            //$scope.IsHiddenDetail = false;            
            var existItem = dataModel.ItemID;
            var duplicateItem = 0;
            angular.forEach($scope.ListPIDetails, function (item) {
                if (existItem == item.ItemID) {
                    duplicateItem = 1;
                    return false;
                }
            });

            if (duplicateItem === 0) {
                $scope.ListPIDetails.push({
                    PIID: 0, PIDetailID: 0, ItemID: dataModel.ItemID, ArticleNo: dataModel.ArticleNo, ItemName: dataModel.ItemName,
                    CompanyID: dataModel.CompanyID, Description: dataModel.Description, CuttableWidth: dataModel.CuttableWidth,
                    Construction: dataModel.Construction, BuyerStyle: '', InputQty: 0.00, ExRate: 0, UnitPrice: 0.00, Amount: 0.00,
                    CreateBy: $scope.UserCommonEntity.loggedUserID, IsActive: true
                });
            }
            else if (duplicateItem === 1) {
                    Command: toastr["warning"]("Item Already Exists!!!!");
            }
            $scope.showDtgrid = $scope.ListPIDetails.length;
            $scope.IsShow = $scope.ListPIDetails.length > 0 ? true : false;
        }

        //******************************* Get Item Construction Type ****************************************************//

        $scope.loadSalesItemConstructionType = function (dataModel) {

            var apiRoute = baseUrl + 'GetSalesItemConstructionType/';
            var listConstructionType = crudService.getModel(apiRoute, page, pageSize, isPaging, $scope.HeaderToken.get);
            listConstructionType.then(function (response) {
                $scope.listConstructionType = response.data
                angular.forEach($scope.listConstructionType, function (item) {

                    if (item.IsDefault == true) {
                        $scope.listConstType = item.ComboID;
                        $("#ddlConstructionType").select2("data", { id: item.ComboID, text: item.ComboName });
                        return false;
                    }
                });
            },
            function (error) {
                console.log("Error: " + error);
            });
        }
        $scope.loadSalesItemConstructionType(0);

        $scope.loadUnit = function () {
            $scope.listFabricUOM = [{ UOMID: 'Yds', UOMName: 'Yds' }, { UOMID: 'Mtr', UOMName: 'Mtr' }];
        }
        $scope.loadUnit(0);
        var lccheck = false;
        //**********----Load PI Master Form and PI Details List By select Active PI Master ----***************//

        ///////////////////////PIAPPROVAL/////////////////
        $scope.loadPIMasterDetailsByActivePI = function (dataModel) {

            $scope.IsbtReviseShow = true;
            $scope.IsbtSplitShow = true;

            modal_fadeOut();

            $scope.IsHidden = true;

            //$scope.lstlctype = dataModel.LCType;
            // $("#lstlctype").select2("data", { id: dataModel.LCType, text: dataModel.LCTypeName });
            $scope.FreightCharge = dataModel.FreightCharge;


            $scope.listPIMaster = [];
            var activePI = dataModel.PIID;
            $scope.PIID = dataModel.PIID;
            $scope.TransactionTypeID = dataModel.TransactionTypeID;

            $scope.PIDate = conversion.getDateToString(dataModel.PIDate);
            $scope.HPINO = dataModel.PINO + ' , Dt: ' + $scope.PIDate;
            $scope.SplittedPINo = dataModel.SplittedPINo;
            $scope.NewSplittedPINo = '';
            $scope.lstCompanyList = dataModel.CompanyID;
            //$("#ddlCompany").select2("data", { id: dataModel.CompanyID, text: dataModel.CompanyName });

            $scope.lstBuyerList = dataModel.BuyerFirstName;
            $("#ddlBuyer").select2("data", { id: dataModel.BuyerID, text: dataModel.BuyerFirstName });
            $scope.Vendor = dataModel.BuyerRefName;

            $scope.lstCompanyList = dataModel.CompanyID;

            $scope.lstBookingNG = dataModel.BookingID;
            $("#ddlBookingList").select2("data", { id: dataModel.BookingID, text: dataModel.BookingNo });
            $scope.PIDate = conversion.getDateToString(dataModel.PIDate);



            $scope.lstIncoNG = dataModel.IncotermID;
            $("#ddlIncoterm").select2("data", { id: dataModel.IncotermID, text: dataModel.IncotermName });
            $scope.IncotermDescription = dataModel.IncotermDescription;
            $scope.Negotiation = dataModel.NegoDay;
            $scope.OverdueInterest = parseFloat(dataModel.ODInterest).toFixed(2);
            $scope.Remarks = dataModel.Remarks;
            $scope.Discount = dataModel.Discount;

            $scope.lstSalesPersonList = dataModel.EmployeeID;
            $("#ddlSalesPerson").select2("data", { id: dataModel.EmployeeID, text: dataModel.SalesPersonFirstName });
            $scope.lstShipmentList = dataModel.ShipmentID;
            $("#ddlShipment").select2("data", { id: dataModel.ShipmentID, text: dataModel.ComboNameShipment });
            $scope.lstValidityList = dataModel.ValidityID;
            $("#ddlValidity").select2("data", { id: dataModel.ValidityID, text: dataModel.ComboNameValidity });



            //$scope.txtBuyer = dataModel.BuyerRefName;
            //$scope.txtBuyerRefID = dataModel.BuyerRefID;


            $scope.UnitName = dataModel.UomName;
            $scope.ListPIDetails = [];
            var apiRoute = baseUrl + 'GetPIDetailsListByActivePIForApproval/';
            var listPIDetails = crudService.getPIDetailsByActivePIID(apiRoute, activePI, $scope.HeaderToken.get);
            listPIDetails.then(function (response) {
                //$scope.loadUnit(0);
                lccheck = 0;
                $scope.ListPIDetails = response.data;
                $scope.isDetailsShow = $scope.ListPIDetails.length > 0 ? true : false;
                lccheck = $scope.ListPIDetails[0].IsLcCompleted;
                $scope.TotalQuantity = 0;
                $scope.TotalAmount = 0;
                angular.forEach($scope.ListPIDetails, function (item) {
                    if (item.Amount > 0) {
                        item.Selected = true;
                    }
                    else {
                        item.Selected = false;
                    }

                    $scope.TotalQuantity = parseFloat($scope.TotalQuantity) + parseFloat(item.InputQty);
                    $scope.TotalAmount = parseFloat($scope.TotalAmount) + parseFloat(item.Amount);
                })
            },
            function (error) {
                console.log("Error: " + error);
            });
            // $scope.LoadBookingNoByBuyerID();
            setTimeout(function () {

                $scope.lstBookingNG = dataModel.BookingID;
                $("#ddlBookingList").select2("data", { id: dataModel.BookingID, text: dataModel.BookingNo });

            }, 500);
        }


        //************************************************Start PI Detail Dynamic Grid******************************************************
        $scope.CallgetPIDetails = function (dataModel) {
            var tempDataModel = [];

            if (dataModel.length != 0) {
                tempDataModel = dataModel.ItemID;
            }
            else {
                tempDataModel = 0;
            }
            $scope.paginationPI.pageNumber = 1;
            $scope.getPIDetails(tempDataModel);
        }
        //Pagination
        $scope.paginationPI = {
            paginationPageSizes: [15, 25, 50, 75, 100, 500, 1000, "All"],
            ddlpageSize: 15,
            pageNumber: 1,
            pageSize: 15,
            totalItems: 0,

            getTotalPages: function () {
                return Math.ceil(this.totalItems / this.pageSize);
            },
            pageSizeChange: function () {
                if (this.ddlpageSize == "All")
                    this.pageSize = $scope.paginationPI.totalItems;
                else
                    this.pageSize = this.ddlpageSize

                this.pageNumber = 1
                $scope.getPIDetails(PIMasterIDHold);
            },
            firstPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber = 1
                    $scope.getPIDetails(PIMasterIDHold);
                }
            },
            nextPage: function () {
                if (this.pageNumber < this.getTotalPages()) {
                    this.pageNumber++;
                    $scope.getPIDetails(PIMasterIDHold);
                }
            },
            previousPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                    $scope.getPIDetails(PIMasterIDHold);
                }
            },
            lastPage: function () {
                if (this.pageNumber >= 1) {
                    this.pageNumber = this.getTotalPages();
                    $scope.getPIDetails(PIMasterIDHold);
                }
            }
        };

        $scope.getPIDetails = function (dataModel) {

            //$scope.pagination.pageNumberFdod = 1;
            $scope.gridOptionsPID.enableFiltering = true;
            $scope.gridOptionsPID.showColumnFooter = true;
            // $scope.gridOptionsPID.showGridFooter = true;

            $scope.loaderMore = true;
            $scope.lblMessage = 'loading please wait....!';
            $scope.result = "color-red";

            objcmnParam = {
                pageNumber: (($scope.paginationPI.pageNumber - 1) * $scope.paginationPI.pageSize),
                pageSize: $scope.paginationPI.pageSize,
                IsPaging: 1,    //isPaging
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                menuId: $scope.UserCommonEntity.currentMenuID,
                tTypeId: $scope.UserCommonEntity.currentTransactionTypeID,
                selectedCompany: $scope.lstCompanyList
            };
            $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
                if (col.filters[0].term) {
                    return 'header-filtered';
                } else {
                    return '';
                }
            };
            $scope.gridOptionsPID = {
                enableGridMenu: true,

                enableFiltering: true,
                enableRowSelection: false,
                enableSelectAll: true,
                showFooter: true,
                // showGridFooter: true,
                showColumnFooter: true,
                columnDefs: [
                   { name: "UniqueCode", displayName: "Sample ID", visible: false, headerCellClass: $scope.highlightFilteredHeader },
                    { name: "ItemID", displayName: "Item ID", title: "Item ID", visible: false, headerCellClass: $scope.highlightFilteredHeader },
                    { name: "CompanyID", displayName: "Company ID", visible: false, headerCellClass: $scope.highlightFilteredHeader },
                    { name: "ArticleNo", displayName: "Style No", title: "Article No", width: '10%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Description", displayName: "F.Description", title: "Description", width: '27%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Construction", displayName: "Construction", title: "Construction", width: '18%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "ItemGroupName", displayName: "F.Type", title: "Width", width: '10%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "FinishingWeight", displayName: "F.Weight", title: "Weight", cellFilter: 'number: 2', width: '8%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "ColorName", displayName: "Color", title: "Color Name", width: '10%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "Weave", displayName: "Weave", title: "Weave", width: '8%', headerCellClass: $scope.highlightFilteredHeader },
                    { name: "CuttableWidth", displayName: "C.Width", title: "C.Width", width: '9%', headerCellClass: $scope.highlightFilteredHeader },

                ],
                exporterAllDataFn: function () {
                    return getPage(1, $scope.paginationPI.totalItems, pagination.sort)
                    .then(function () {

                        $scope.gridOptionsPID.useExternalPagination = false;
                        $scope.gridOptionsPID.useExternalSorting = false;
                        getPage = null;
                    });
                },
            };



            objcmnParam.ItemID = dataModel;
            var apiRoute = deliveryController + 'GetPIDetailsById/';
            var ListPIDetails = crudService.getModelHDO(apiRoute, objcmnParam, $scope.HeaderToken.get);
            ListPIDetails.then(function (response) {

                $scope.paginationPI.totalItems = response.data.recordsTotal;
                $scope.gridOptionsPID.data = response.data.objPIDetail;

                $scope.loaderMore = false;
            },
            function (error) {
                console.log("Error: " + error);

            });

        }
        $scope.getPIDetails(0);
        //***************************************************End PI Detail Dynamic Grid******************************************************



        //**********----delete  Record from ListPIDetails----***************//

        $scope.deleteRow = function (index) {
            // $scope.ListPIDetails.splice($scope.ListPIDetails.indexOf($scope.data), 1);
            $scope.ListPIDetails.splice(index, 1);
            $scope.showDtgrid = $scope.ListPIDetails.length;
        };

        //**********----Create Calculation----***************//
        $scope.calculation = function (dataModel) {
            $scope.ListPIDetails1 = [];
            angular.forEach($scope.ListPIDetails, function (item) {

                var amountInDec = parseFloat(parseFloat(item.InputQty) * parseFloat(item.UnitPrice == null || item.UnitPrice == '' ? 0 : item.UnitPrice)).toFixed(2);
                $scope.ListPIDetails1.push({
                    PIID: item.PIID, PIDetailID: item.PIDetailID, ItemID: item.ItemID, ArticleNo: item.ArticleNo, ItemConstructionTypeID: item.ItemConstructionTypeID,
                    ItemName: item.ItemName, CompanyID: item.CompanyID, Description: item.Description, CuttableWidth: item.CuttableWidth,
                    Construction: item.Construction, BuyerStyle: item.BuyerStyle, lstUOMName: item.lstUOMName,
                    BookingQty: item.BookingQty, RemainingQty: item.RemainingQty, InputQty: item.InputQty, CostingPrice: item.CostingPrice,
                    UnitPrice: item.UnitPrice, Amount: amountInDec, CreateBy: item.CreateBy, IsActive: item.IsActive, Selected: item.Selected

                });
                $scope.ListPIDetails = $scope.ListPIDetails1;

                // adding quantity and amount

                $scope.TotalQuantity = 0;
                $scope.TotalAmount = 0;
                angular.forEach($scope.ListPIDetails, function (item) {

                    $scope.TotalQuantity = parseFloat($scope.TotalQuantity) + parseFloat(item.InputQty);
                    $scope.TotalAmount = parseFloat($scope.TotalAmount) + parseFloat(item.Amount == null || item.Amount == '' ? 0 : item.Amount);
                    $scope.lstUOMName = item.lstUOMName;
                })

            });
        }

        //$scope.SaveRevise = function () {
        //    IsReviseClick = 1;
        //    $scope.Save();
        //}
        //**********----Save and Update SalPIMaster and SalPIDetail  Records----***************//

        //$scope.ConfirmRejectModalShow = function () {
        //    $scope.btnConfirmReject = true;
        //    $("#ConfirmRejectModal").fadeIn(200, function () { $('#ConfirmRejectModal').modal('show'); });
        //}

        $scope.ConfirmApprovalModalShow = function () {
            $scope.RejectRemarks = null;
            $scope.btnConfirmReject = false;
            $scope.btnConfirmApprove = true;
            $("#ConfirmRejectModal").fadeIn(200, function () { $('#ConfirmRejectModal').modal('show'); });
            $scope.ConfirmationationModalTitle = 'Confirm Approval';
            $scope.GetPIProgressHistory();
        }

        $scope.ConfirmRejectModalShow = function () {
            $scope.RejectRemarks = null;
            $scope.btnConfirmReject = true;
            $scope.btnConfirmApprove = false;
            $("#ConfirmRejectModal").fadeIn(200, function () { $('#ConfirmRejectModal').modal('show'); });
            $scope.ConfirmationationModalTitle = 'Confirm Rejection';
            $scope.GetPIProgressHistory();
        }

        $scope.GetPIProgressHistory = function () {
            if ($scope.PIID > 0) {
                var apiRoute = '/Sales/api/PIProgress/' + 'GetPIProgressDetails/';
                var objcmnParam = {
                    pageNumber: 1,
                    pageSize: 1,
                    IsPaging: 1,
                    loggeduser: $scope.UserCommonEntity.loggedUserID,
                    loggedCompany: $scope.UserCommonEntity.loggedCompnyID,
                    menuId: $scope.UserCommonEntity.currentMenuID,
                    tTypeId: $scope.UserCommonEntity.currentTransactionTypeID
                };

                var cmnParam = "[" + JSON.stringify(objcmnParam) + "," + JSON.stringify($scope.PIID) + "]";


                var ObjPI = crudService.GetPost(apiRoute, cmnParam);

                ObjPI.then(function (response) {
                    $scope.ListPIProgressDetails = response.data.objPIProgressList;
                },
                function (error) {
                    console.log("Error: " + error);
                });
            }
            else {
                $scope.ListPIProgressDetails = [];
            }
        }
        ///////////////////////PIAPPROVAL/////////////////
        $scope.Save = function (status) {

            if (status == 2) {
                if ($scope.RejectRemarks == null || $scope.RejectRemarks == '') {
                    Command: toastr["warning"]("Please Write Comments/Reason...");
                    return;
                }
                else {


                    var itemMaster = {
                        //PIID: $scope.PIID,
                        step : step,
                        ID :  $scope.ID,
                        StatusID: status,
                        //Remarks: $scope.RejectRemarks
                    };
                }
            }

            else {
                var itemMaster = {
                    //PIID: $scope.PIID,
                    step: step,
                    ID: $scope.ID,
                    StatusID: status,
                    //Remarks: $scope.RejectRemarks
                };
            }

            if ($scope.RejectRemarks == null || $scope.RejectRemarks == "" || $scope.RejectRemarks == undefined) {
                itemMaster.Remarks = null;
            }

            $scope.cmnParam();

            var objcmnParam = {
                loggeduser: $scope.UserCommonEntity.loggedUserID,
                loggedCompany: $scope.UserCommonEntity.loggedCompnyID
            };

            var cmnParam = "[" + JSON.stringify(itemMaster)
                     + "," + JSON.stringify(objcmnParam) + "]";
            var apiRoute = baseUrl + 'ApproveBeamCanIMaster/';
            var PIItemMasterNdetailsCreateUpdate = crudService.GetPost(apiRoute, cmnParam);
            PIItemMasterNdetailsCreateUpdate.then(function (response) {
                var result = 0;
                if (response.data == 'Success') {
                    if (status == 1) {
                        Command: toastr["success"]("Approved Successfully!!!!");
                        $("#ConfirmRejectModal").fadeOut(200, function () { $('#ConfirmRejectModal').modal('hide'); });
                        $scope.ShowHide();

                        var cmnParam_Notification = "[" + JSON.stringify(objcmnParam)
                        + "," + JSON.stringify(1)  //transactiontypeid
                        + "," + JSON.stringify(2)  //sequence
                        + "," + JSON.stringify(1)  // IsNotification
                        + "," + JSON.stringify(0)  // IsSMS
                        + "," + JSON.stringify(0)  // IsEmail
                        + "]";

                        var apiRoute_notification = '/SystemCommon/api/NotificationPermission/' + 'BroadCastNotificationData/';
                        var SendNotification = crudService.GetPost(apiRoute_notification, cmnParam_Notification);
                        SendNotification.then(function (response) {
                            //$scope.listBooking = response.data.objIncoterm;
                        },
                        function (error) {
                            console.log("Error: " + error);
                        });
                    }

                    else if (status == 2) {
                            Command: toastr["success"]("Rejected Successfully!!!!");
                        $("#ConfirmRejectModal").fadeOut(200, function () { $('#ConfirmRejectModal').modal('hide'); });
                        $scope.ShowHide();

                        var cmnParam_Notification = "[" + JSON.stringify(objcmnParam)
                        + "," + JSON.stringify(1)  //transactiontypeid
                        + "," + JSON.stringify(3)  //sequence
                        + "," + JSON.stringify(1)  // IsNotification
                        + "," + JSON.stringify(0)  // IsSMS
                        + "," + JSON.stringify(0)  // IsEmail
                        + "]";

                        var apiRoute_notification = '/SystemCommon/api/NotificationPermission/' + 'BroadCastNotificationData/';
                        var SendNotification = crudService.GetPost(apiRoute_notification, cmnParam_Notification);
                        SendNotification.then(function (response) {
                            //$scope.listBooking = response.data.objIncoterm;
                        },
                        function (error) {
                            console.log("Error: " + error);
                        });
                    }


                }

                else if (response.data == 'Already Approved') {

                        Command: toastr["warning"]("Already Approved!!!!");
                }

                else if (response.data.length > 0) {
                        Command: toastr["warning"](response.data);
                    $("#ConfirmRejectModal").fadeOut(200, function () { $('#ConfirmRejectModal').modal('hide'); });
                }
                else {
                    Command: toastr["warning"]("Approved Not Successful!!!!");
                }

            },
            function (error) {
                Command: toastr["warning"]("Save Not Successful!!!!");
            });

        };
        ///////////////////////PIAPPROVAL/////////////////


        $scope.SendMultipleEmail = function () {
            $scope.cmnParam();
            ModelsArray = [objcmnParam];
            var apiRoute = baseUrl + 'SendMultiMail/';
            var MailPI = crudService.postMultipleModel(apiRoute, ModelsArray, $scope.HeaderToken.get);
            MailPI.then(function (response) {
            },
            function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.DeletePIMasterDetail = function (dataModel) {
            $scope.cmnParam();
            objcmnParam.id = dataModel.PIID;
            ModelsArray = [objcmnParam];
            var apiRoute = baseUrl + 'DeleteMasterDetail/';
            var delPI = crudService.postMultipleModel(apiRoute, ModelsArray, $scope.HeaderToken.delete);
            delPI.then(function (response) {
                if (response.data.result != "") {
                    $scope.RefreshMasterList();
                    Command: toastr["success"](dataModel.PINO + " has been Deleted Successfully!!!!");
                }
                else {
                    Command: toastr["warning"](dataModel.PINO + " not Deleted, Please Check and Try Again!");
                }
            },
            function (error) {
                Command: toastr["warning"](dataModel.PINO + " not Deleted, Please Check and Try Again!");
                console.log("Error: " + error);
            });
        }

        ///////////////////////PIAPPROVAL/////////////////
        $scope.LoadHistoryModal = function (datamodel) {
            var a = 1;
            $scope.ListApprovalHistory = [];
            var itemMaster = {
                PIID: datamodel.PIID
            };

            var objcmnParam = {
                loggeduser: $scope.UserCommonEntity.loggedUserID
            };

            var cmnParam = "[" + JSON.stringify(itemMaster)
                     + "," + JSON.stringify(objcmnParam) + "]";

            var apiRoute = baseUrl + 'GetApprovalHistory/';
            var listQuotationMaster = crudService.post(apiRoute, cmnParam);
            listQuotationMaster.then(function (response) {
                $scope.ListApprovalHistory = response.data;
                $("#ApprovalHistoryModal").fadeIn(200, function () { $('#ApprovalHistoryModal').modal('show'); });
            },
            function (error) {
                console.log("Error: " + error);
            });

        }



        //**********----Reset Record----***************//
        $scope.clear = function () {

            $scope.txtBuyer = '';
            $scope.txtBuyerRefID = '';
            $scope.IsbtReviseShow = false;
            $scope.IsbtSplitShow = false;

            $scope.IsContinue = '1';
            IsReviseClick = 0;

            $scope.HPINO = '';
            $scope.PIID = '0';
            $scope.showDtgrid = 0;//$scope.ListPIDetails.length;

            $scope.IsHidden = false;
            $scope.IsShow = false;
            $scope.isDetailsShow = false;

            $scope.btnMrrSaveText = "Save";
            $scope.btnMrrShowText = "Show List";

            $scope.IsHiddenDetail = true;
            $scope.IsUpdate = false;
            //$scope.IsHiddenDetail = true;
            //$scope.btnPIShowText = "Show List";
            //$scope.btnPISaveText = "Save";
            $scope.listPIMaster = [];
            $scope.ListPIDetails = [];
            $scope.bool = true;
            $scope.listBuyer = [];
            $scope.Vendor = '';
            $scope.UnitName = '';

            //$scope.lstIncoNG = '';
            //$("#ddlIncoterm").select2("data", { id: '', text: '--Select Inco.--' });
            //$scope.listIncoterm = [];
            loadIncotermRecords(0);


            $scope.Negotiation = 15;
            $scope.OverdueInterest = 14;
            $scope.IncotermDescription = '';
            $scope.Remarks = '';
            $scope.Discount = 0;
            //$scope.loadActivePIRecords(0);
            // loadSampleNoRecords(0);
            loadBuyerRecords(0);
            loadCompanyRecords(0);
            loadShipmentRecords(0);
            loadValidityRecords(0);
            loadPIStatusRecord(0);
            loadSightRecords(0);
            loadSalesPersonRecords(0);
            $scope.SplittedPINo = '';
            $scope.NewSplittedPINo = '';

            $scope.lstBuyerList = '';
            //   $scope.lstSampleNoList = '';

            $("#ddlBuyer").select2("data", { id: '', text: '--Select Buyer--' });

            $scope.lstBookingNG = '';
            $("#ddlBookingList").select2("data", { id: '', text: '--Select Booking--' });

            //   $("#ddlSampleNo").select2("data", { id: '', text: '--Select Sample/Article No--' });

            //$scope.PIDate = conversion.NowDateCustom();
            $scope.PIDate = $filter('date')(new Date(), 'dd/MM/yyyy');
            $scope.RejectRemarks = '';
            Pending = 0;

            LoadListData(0);///////////////////////PIAPPROVAL/////////////////
            $scope.ListPIProgressDetails = [];

        };


        $scope.ChkApprovalOrUpdateMode = false;
        $scope.IsApproveChoosen = false;
        $scope.IsDeclinChoosen = false;
        $scope.IsApprovalAsync = false;
        $scope.IsDeclinedAsync = false;
        $scope.CallApproveAfterSuccessUpdate = false;


        $scope.ApprovalButtonShow = false;
        $scope.NonApprovalButtonShow = true;

        // End Code for Approval


        var ApprovalModel = $localStorage.notificationStorageModel;
        var ApprovalMenuID = $localStorage.notificationStorageMenuID;

        //IsApproval Allowed When User go through Notifiction bar .It will be false when user navigate with side bar menu
        var IsApproval = $localStorage.notificationStorageIsApproved;

        //IsDelaine Allowed When User go through Notifiction bar .It will be false when user navigate with side bar menu
        var IsDelaine = $localStorage.notificationStorageIsDeclained;
        try {
            $scope.APModalPageTitle = ApprovalModel.CustomCode;
            $scope.DCModalPageTitle = ApprovalModel.CustomCode;
        }
        catch (e) {

        }

        $scope.IsApproved = IsApproval;
        $scope.IsDelained = IsDelaine;

        //Page Display will be false after execution of approved/declined event

        if ($scope.IsApproved) {

            $scope.ApprovalButtonShow = true;
            $scope.NonApprovalButtonShow = false;

            $scope.ChkApprovalOrUpdateMode = true; //  my check  
            //$scope.PIMasterById(ApprovalModel);
            //$scope.GetPIDetailById(ApprovalModel);
        }

        $scope.IsApprovalAsync = false;
        $scope.ApprovedMethod = function () {
            $scope.IsApprovalAsync = true;
            $scope.IsApproveChoosen = true;
            $scope.IsDeclinChoosen = false;

            if ($scope.CallApproveAfterSuccessUpdate == false) {
                $scope.UserCommonEntity.message = "Approved";
                $scope.Save();
            }

            if ($scope.CallApproveAfterSuccessUpdate == true) {

                $scope.IsApprovalAsync = false;
                $scope.IsApproveChoosen = false;
                $scope.IsDeclinChoosen = false;

                ApprovalModel.Comments = $scope.commentsModle;
                ApprovalModel.CreatorID = $scope.UserCommonEntity.loggedUserID;
                ApprovalModel.LoggedCompanyID = $scope.UserCommonEntity.loggedCompnyID;
                ApprovalModel.LoggedUserID = $scope.UserCommonEntity.loggedUserID;
                $scope.commentsModle = "";
                modal_fadeOutApproved();
                var apiRoute = '/SystemCommon/api/SystemCommonLayout/ApproveNotification/';
                var approvalProcess = crudService.post(apiRoute, ApprovalModel);
                approvalProcess.then(function (response) {
                    if (response.data == 200) {
                        $scope.IsApprovalAsync = false;

                        $scope.CallApproveAfterSuccessUpdate == false;
                        ShowCustomToastrMessage(response);
                    }
                },
                function (error) {
                    $scope.CallApproveAfterSuccessUpdate == false;
                    ("Error: " + error);

                });
            }
        }

        $scope.IsDeclinedAsync = false;
        $scope.DeclinedMethod = function () {
            $scope.IsDeclinedAsync = true;
            $scope.IsApproveChoosen = false;
            $scope.IsDeclinChoosen = true;
            if ($scope.CallApproveAfterSuccessUpdate == false) {
                $scope.Save();
            }

            if ($scope.CallApproveAfterSuccessUpdate == true) {

                $scope.IsDeclinedAsync = false;
                $scope.IsApproveChoosen = false;
                $scope.IsDeclinChoosen = false;

                ApprovalModel.Comments = $scope.commentsModle;
                ApprovalModel.CreatorID = $scope.UserCommonEntity.loggedUserID;
                ApprovalModel.LoggedCompanyID = $scope.UserCommonEntity.loggedCompnyID;
                ApprovalModel.LoggedUserID = $scope.UserCommonEntity.loggedUserID;
                $scope.commentsModle = "";
                modal_fadeOutDeclained();
                var apiRoute = '/SystemCommon/api/SystemCommonLayout/DeclainedNotification/';
                var declaineProcess = crudService.post(apiRoute, ApprovalModel);
                declaineProcess.then(function (response) {
                    if (response.data == 201) {
                        $scope.IsDeclinedAsync = false;
                        //$scope.IsApproveChoosen = false;
                        //$scope.IsDeclinChoosen = true;
                        //$scope.save();
                        $scope.CallApproveAfterSuccessUpdate == false;
                        //Hide Form

                        ShowCustomToastrMessage(response);
                        // modal_fadeOut_Company();
                    }
                },
                function (error) {
                    $scope.CallApproveAfterSuccessUpdate == false;
                    ("Error: " + error);
                });
            }
        }

    }]);



function modal_fadeOut() {
    $("#PIModal").fadeOut(200, function () {
        $('#PIModal').modal('hide');
    });
}

function modal_fadeOutApproved() {
    $("#approveNotificationModal").fadeOut(200, function () {
        $('#approveNotificationModal').modal('hide');
    });
}
function modal_fadeOutDeclained() {
    $("#declainedNotificationModal").fadeOut(200, function () {
        $('#declainedNotificationModal').modal('hide');
    });
}
﻿/*!@license
 * Infragistics.Web.ClientUI Tree Grid 15.2.20152.2081
 *
 * Copyright (c) 2011-2015 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *	jquery-1.4.4.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.dataSource.js
 *	infragistics.ui.shared.js
 *	infragistics.ui.treegrid.js
 *	infragistics.util.js
 *	infragistics.ui.grid.framework.js
 *	infragistics.ui.grid.columnfixing.js
 */
if(typeof jQuery!=="function"){throw new Error("jQuery is undefined")}(function($){$.widget("ui.igTreeGridColumnFixing",$.ui.igGridColumnFixing,{_create:function(){this.element.data($.ui.igGridColumnFixing.prototype.widgetName,this.element.data($.ui.igTreeGridColumnFixing.prototype.widgetName));$.ui.igGridColumnFixing.prototype._create.apply(this,arguments)},_renderFixedRecords:function($table,start,end,onlyRows,$trsUnfixed){if(onlyRows===true){$.ui.igGridColumnFixing.prototype._renderFixedRecords.apply(this,arguments);return}var ds,d="",grid=this.grid;ds=grid.dataSource.flatDataView();d=grid._renderRecordsByFlatDataView(ds,true,start,end);$table.find("tbody").html(d)},_syncHeigthsOnToggle:function(){if(!this.grid.hasFixedColumns()){return}this._checkAndRenderHScrlbarCntnr();this._syncContainersHeights();if($.ig.util.isIE&&$.ig.util.browserVersion>=9){this._syncTableHeights()}},_rowExpanded:function(){this._syncHeigthsOnToggle()},_rowCollapsed:function(){this._syncHeigthsOnToggle()},_renderFixedRecord:function(data,rowIndex,onlyRows,tr){if(onlyRows){return $.ui.igGridColumnFixing.prototype._renderFixedRecord.apply(this,arguments)}return this.grid._renderRecord(data,rowIndex,true)},_rowShown:function(e,args){if(!this.options.syncRowHeights){return}var fRow=args.fRow,ufRow=args.ufRow;if(this.grid.hasFixedColumns()){this.syncRowsHeights(fRow,ufRow)}},_syncContainersHeights:function(){if(!this.grid.hasFixedColumns()){return}var grid=this.grid,id=grid.id(),scrollContainer;$("#"+id+"_fixedBodyContainer").find("table")[0].style.height="";if(grid._rowVirtualizationEnabled()){scrollContainer=grid._vdisplaycontainer()}else{scrollContainer=grid.scrollContainer()}if(scrollContainer.length===0){scrollContainer=grid.element}scrollContainer.find("table")[0].style.height=""},_renderRow:function(rec,tr,rowId){if(!this.grid.hasFixedColumns()){return $.ui.igGridColumnFixing.prototype._renderRow.apply(this,arguments)}var rows,$fRow,$ufRow,$tr=$(tr),col,funcCallback;rows=this.grid._getRows($tr);$fRow=rows.fixedRow;$ufRow=rows.unfixedRow;funcCallback=function(rec,tr){return this._updateRowContent(rec,tr)};this.grid._persistExpansionIndicator(rec,$fRow[0],funcCallback,this);this.grid._persistExpansionIndicator(rec,$ufRow[0],funcCallback,this)},_buildDOMOnToggle:function(e,args){if(!this.grid.hasFixedColumns()||!this.options.syncRowHeights){return}var $fRows=args.fRows,me=this,$ufRows=args.ufRows;if(!$fRows||!$ufRows||$fRows.length!==$ufRows.length){return}$fRows.each(function(ind){var $fRow=$($fRows[ind]),$ufRow=$($ufRows[ind]);me.syncRowsHeights($fRow,$ufRow)});this._syncHeigthsOnToggle()},_updateRowContent:function(rec,tr){var $this=this,grid=this.grid,$tr=$(tr),cells=$tr.children(":visible:not([data-skip])");cells.each(function(ind){var $td=$(this),content,col=grid._getColumnByTD($td);if(!col){return true}col=col.column;if(col.template&&col.template.length){content=grid._renderTemplatedCell(rec,col);if(content.indexOf("<td")===0){$td.html($(content).html())}else{$td.html(content)}}else{$td.html(String(grid._renderCell(rec[col.key],col,rec)))}});return tr},_onColumnFixed:function(isFixed,args){this._onColumnFixedUnfixed(true,args)},_onColumnUnfixed:function(isFixed,args){this._onColumnFixedUnfixed(false,args)},_onColumnFixedUnfixed:function(isFixed,args){if(args.columnIdentifier===undefined){return}var $td,$span,rerender=false,$container,hasVirtualization=this._isContinuousVirtualization();if(this.options.fixingDirection==="left"){$container=this.grid.fixedBodyContainer();if(!$container.length||!this.grid._fixedColumns||!this.grid._fixedColumns.length){$container=this.grid.element}}else{$container=this.grid.element}$td=$container.find("tbody>tr:first>td:not([data-skip])").eq(0);$span=$td.find("[data-shift-container],[data-expand-cell]");if($span.length===1){return}if(hasVirtualization){this.grid._renderVirtualRecords()}else{this.grid._renderRecords();this.grid._fireInternalEvent("_dataRendered")}},_detachEvents:function(){$.ui.igGridColumnFixing.prototype._detachEvents.apply(this,arguments);if(this._rowShownHandler){this.grid.element.unbind("igtreegrid_rowshown",this._rowShownHandler)}if(this._onColumnFixedHandler){this.grid.element.unbind("igtreegridcolumnfixing_columnfixed",this._onColumnFixedHandler)}if(this._onColumnUnfixedHandler){this.grid.element.unbind("igtreegridcolumnfixing_columnunfixed",this._onColumnUnfixedHandler)}if(this._buildDOMOnToggleHandler){this.grid.element.unbind("igtreegrid_builddomontoggle",this._buildDOMOnToggleHandler)}},_attachEvents:function(){this._rowShownHandler=$.proxy(this._rowShown,this);this.grid.element.bind("igtreegrid_rowshown",this._rowShownHandler);this._onColumnFixedHandler=$.proxy(this._onColumnFixed,this);this._onColumnUnfixedHandler=$.proxy(this._onColumnUnfixed,this);this.grid.element.bind("igtreegridcolumnfixing_columnfixed",this._onColumnFixedHandler);this.grid.element.bind("igtreegridcolumnfixing_columnunfixed",this._onColumnUnfixedHandler);this._buildDOMOnToggleHandler=$.proxy(this._buildDOMOnToggle,this);this.grid.element.bind("igtreegrid_builddomontoggle",this._buildDOMOnToggleHandler)},destroy:function(){$.ui.igGridColumnFixing.prototype.destroy.apply(this,arguments);this.element.removeData($.ui.igGridColumnFixing.prototype.widgetName)},_injectGrid:function(grid,isRebind){$.ui.igGridColumnFixing.prototype._injectGrid.apply(this,arguments);this._attachEvents()}});$.extend($.ui.igTreeGridColumnFixing,{version:"15.2.20152.2081"})})(jQuery);(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$('<div id="__ig_wm__"></div>').appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})})(jQuery);
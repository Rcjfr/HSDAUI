/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ILookupData, ISdaListView, IBaseLookUp, Status } from '@app/common/models';
import { Observable } from 'rxjs/Observable';
import * as constants from '@app/common/constants';
import * as moment from 'moment-timezone';
import * as pdfMake from 'pdfmake/build/pdfmake';
import {TDocumentDefinitions, pdfMakeStatic } from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as models from '@app/common/models';

//https://github.com/bpampuch/pdfmake/issues/948#issuecomment-293542550
//https://github.com/bpampuch/pdfmake/issues/948
//http://dataurl.net/#dataurlmaker
/*tslint:disable:max-line-length*/

@Injectable()
export class TwdExportService {
  pdf: pdfMakeStatic;
  CST = 'America/Chicago';
  constructor() {
    this.pdf = pdfMake;
    this.pdf.vfs = pdfFonts.pdfMake.vfs;
  }
  exportTwdPdf(searchResult: models.ISdaListResult): any {
    const dd: TDocumentDefinitions = {
      info: {
        title: 'Time When Due Report',
        author: 'American Airlines',
        subject: 'TWD',
        keywords: 'HSDA, Major Repair'
      },
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [20, 85, 20, 35],
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      header: {
        margin: [25, 30, 25, 30],
        columns: [
          {

            table: {
              widths: ['30%', '70%'],

              body: [
                [
                  {
                    margin: [-590, -10, 0, 0],
                    alignment: 'left',
                    image: constants.AALogo,
                  },
                  { text: 'Time When Due Report', alignment: 'left', style: 'header' }
                ],
                [ {   colSpan: 2,
                      text: `${this.getHeaderText(searchResult)} Major Repair Count: ${searchResult.records.length}`,
                      style: 'subheader',
                    },
                 ],
              ]
            },
              layout: 'noBorders'
          }
        ]
      },
      footer: (currentPage, pageCount) => {
        return {
          margin: [30, 5, 25 , 5],
          columns: [
            {
              table: {
                widths: ['15%', '60%', '25%'],

                body: [
                  [
                    { fontSize: 6, text: moment.utc(new Date).tz(this.CST).format('dddd, LL') , alignment: 'left' },
                    { },
                    { text: `Page ${currentPage} of ${pageCount}`, fontSize: 6, alignment: 'right' }
                  ]
                ]
              },
              layout: 'noBorders'
            }
          ]
        };
      },
      content: [],
      styles: {
        header: {
          fontSize: 18,
          bold: false,

        },
        subheader: {
          fontSize: 8 ,
          bold: true,
          background: '#4682B4',
          color: '#ffffff',
          fillColor: '#4682B4',
          alignment: 'left',
        },
        tableHeader: {
          fontSize: 9,
          bold: true,
          alignment: 'left',
          fillColor: '#a2c5ef'
        },
          regular: {
          fontSize: 8,
          alignment: 'left',
        },
      }
    };
    const final = this.getPdf(searchResult);


 return final.subscribe((result => {
    dd.content = [result];
    this.pdf.createPdf(dd).download('TwdReport.pdf');
  }), function(error) {
    console.log(error);
    },
  function() { });
  }
  getPdf(searchResult: models.ISdaListResult): Observable<any> {

    const pdfDefinition: Array<any> = [];

const Table = {
            columns: [
            {
            margin: [5 , 0, 5, 0],
            alignment: 'center',
            unbreakable: false,
            table: {
              headerRows: 1,
              widths: ['10%', '10%', '12%', '12%', '12%', '12%', '15%','20%'],
              body: [
                [
                  { text: `SDA ID#`, style: 'tableHeader' },
                  // { text: `MRT #`,  style: 'tableHeader' },
                  { text: `AC Nose#`, style: 'tableHeader' },
                  // { text: `Repair Date`,  style: 'tableHeader' },
                  { text: `Description`,  style: 'tableHeader' },
                  { text: `Due In Days`, style: 'tableHeader' },
                  { text: `Due In Cycles`, style: 'tableHeader' },
                  { text: `Due In Hours`, style: 'tableHeader' },
                  { text: `Location`, style: 'tableHeader' },
                  { text: `Repair Inspecton Status`, style: 'tableHeader' }                  
                ]
              ]}}]};

     searchResult.records.forEach( (result: ISdaListView, index: number) => {
      Table.columns[0].table.body.push(this.getTableRows(result))
    });
    
    pdfDefinition.push([Table]);

    return Observable.of(pdfDefinition);

  }
  getTableRows(listview: ISdaListView)  {
   return     [

                {  text: listview.id || '', style: 'regular' },
                // {  text: listview.mrtNumber || '',  style: 'regular' },
                {  text: listview.aircraftNo || '' ,  style: 'regular' },
                {  text: listview.repairDate ? moment(listview.repairDate).format('MM/DD/YY') : '', style: 'regular' },
                {  text: listview.repairDescriptionTypeDesc || listview.defectivePartDescription || listview.modifiedPartDescription || '' ,  style: 'regular' },
                {  text: listview.dueInDays > 0 ? listview.dueInDays : listview.dueInDays != null ? 'Now' : '',  style: 'regular' },
                {  text: listview.dueInCycles > 0 ? listview.dueInCycles : listview.dueInCycles != null ? 'Now' : '',  style: 'regular' },
                {  text: listview.dueInHours > 0 ? listview.dueInHours : listview.dueInHours != null ? 'Now' : '',  style: 'regular' },
                {  text: listview.repairLocation || '', style: 'regular' },
                // {  text: listview.repairInspectionStatusDesc || '', style: 'regular' } 
              ]
    }

getHeaderText(result: models.ISdaListResult ) {

if (result.records.length) {

  const text = `Fleet: ${result.records[0].fleet && result.records[0].fleet.includes('-') ? result.records[0].fleet.split('-')[0] : result.records[0].fleet }\t\t\t\t\t`

  return text
    }

    return '';
}

}

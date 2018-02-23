import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ILookupData, ISdaListView, IBaseLookUp, Status } from '@app/common/models';
import { Observable } from 'rxjs/Observable';
import * as constants from '@app/common/constants';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as models from '@app/common/models';


pdfMake.vfs = pdfFonts.pdfMake.vfs;
//https://github.com/bpampuch/pdfmake/issues/948#issuecomment-293542550
//https://github.com/bpampuch/pdfmake/issues/948
//http://dataurl.net/#dataurlmaker
/*tslint:disable:max-line-length*/

@Injectable()
export class MrlExportService {
  pdf: any;
  constructor() {
    this.pdf = pdfMake;
  }
  exportMrlPdf(searchResult: models.ISdaListResult): any {

    const dd = {
      info: {
        title: 'Major Repair List',
        author: 'American Airlines',
        subject: 'MRL',
        keywords: 'HSDA, Major Repair'
      },
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [20, 85, 20, 35],
      pageSize: 'LETTER',
      pageOrientation: 'landscape',
      header: {
        margin: [25, 30, 25, 30],
        columns: [
          {

            table: {
              widths: ['50%', '50%'],

              body: [
                [
                  {
                    margin: [-585, 0, 0, 0],
                    alignment: 'left',
                    image: constants.AALogo,
                  },
                  { text: 'Major Repair List', alignment: 'right', style: 'header' }
                ],
                [
                    {
                      colSpan: 2,
                      text: `${this.getHeaderText(searchResult)} Major Repair Count: ${searchResult.records.length}`,
                      style: 'subheader',
                    },
                ]
              ]
            },
              layout: 'noBorders'
          }
        ]
      },
      footer: function (currentPage, pageCount) {
        return {
          margin: [30, 5, 25 , 5],
          columns: [
            {
              table: {
                widths: ['15%', '60%', '25%'],

                body: [
                  [
                    { fontSize: 6, text: moment(Date.now()).format('dddd, LL'), alignment: 'left' },
                    { fontSize: 6, text: '* Any comments after || denotes historical data.', alignment: 'center', bold: true },
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
          alignment: 'left'
        },
        tableHeader: {
          fontSize: 9,
          bold: true,
          alignment: 'left'
        },
          regular: {
          fontSize: 8,
          alignment: 'left',
        },
      }
    };
    const final = this.getSdaPdf(searchResult);


 return final.subscribe((result => {
    dd.content = [result];
    this.pdf.createPdf(dd).download('MrlReport.pdf');
  }), function(error){
    console.log(error);
    },
  function(){ });
  }

  getSdaPdf(searchResult: models.ISdaListResult): Observable<any> {

    const pdfDefinition: Array<any> = [];

    searchResult.records.forEach( (result: ISdaListView, index: number) => {
     pdfDefinition.push(this.getTableRows(result))
    } )

    return Observable.of(pdfDefinition);

  }
  getTableRows(listview: ISdaListView)  {
   return  {
        columns: [
        {
        margin: [10 , 0, 10, 0],
        alignment: 'center',
        layout: 'noBorders',
        unbreakable: true,
        table: {
          widths: ['5%', '10%', '6%', '5%', '5%', '5%', '10%', '10%', '12%', '8%', '5%', '5%', '7%', '7%'],
         // heights: 15,
          body: [
            [
              { text: `SDA ID#`, style: 'tableHeader' },
              { text: `\nSDR #`,  style: 'tableHeader' },
              { text: `SDA\nDATE`, style: 'tableHeader' },
              { text: `\nATA`,  style: 'tableHeader' },
              { text: `\nSTA`,  style: 'tableHeader' },
              { text: `\nCheck`, style: 'tableHeader' },
              { text: `Defect \nSize/Type *`, style: 'tableHeader' },
              { text: `\nPart Name`, style: 'tableHeader' },
              { text: `\nBody Station`, style: 'tableHeader' },
              { text: `\nStringer`, style: 'tableHeader' },
              { text: `Water \nLine`, style: 'tableHeader' },
              { text: `Butt \nLine`, style: 'tableHeader' },
              { text: `\nLogPage`, style: 'tableHeader' },
              { text: `MON \nStatus`, style: 'tableHeader' },
            ],
            [
              { text: listview.id || '', style: 'regular' },
              { text: listview.sdrNumber || '',  style: 'regular' },
              { text: listview.completedOn ? moment(listview.completedOn).format('MM/DD/YY') : '', style: 'regular' },
              { text: listview.ataCode2 || '' ,  style: 'regular' },
              { text: listview.station || '',  style: 'regular' },
              { text: listview.checkTypeDesc || '', style: 'regular' },
              { text: `L=${listview.length.toFixed(3)}", W=${listview.width.toFixed(3)}", D=${listview.depth.toFixed(3)}", ${listview.damageTypeDesc}`, style: 'regular' },
              { text: listview.partDefective || '', style: 'regular' },
              { text: listview.aircraftStation || '', style: 'regular' },
              { text: listview.stringer || '', style: 'regular' },
              { text: listview.waterLine || '', style: 'regular' },
              { text: listview.buttLine || '', style: 'regular' },
              { text: listview.micNo || listview.nonRoutineNo || listview.routineNo, style: 'regular' },
              { text: `${listview.deferralCode ? listview.deferralCode + ', ' : '' } ${listview.deferralNo || ''}` , style: 'regular' },
            ],
            [
              { colSpan: 14,
                heights: 1,
                stack: [
                  this.getLineDashed(730)
                ]
              }
            ],
            [
              { colSpan: 8,
                text: [{ text: 'Repair Description: ', style: 'tableHeader' },
                {text: listview.defectivePartDescription || listview.modifiedPartDescription || listview.repairDescriptionTypeDesc || '', style: 'regular' }] , style: 'regular'
              }, {}, {}, {}, {}, {}, {}, {},
              { colSpan: 6,
                text: [{ text: 'Repair Document: ', style: 'tableHeader' },
                {text: `${listview.repairDocumentTypeDesc ? listview.repairDocumentTypeDesc + ', ' : '' }${listview.chapFigRepairText || ''}`, style: 'regular' }] , style: 'regular'
              }
            ],
            [
              { colSpan: 14,
                stack: [
                  this.getLine(730)
                ]
              }
            ]
          ]
        }}]
      }

    }

  getLine(maxLength: number) {
    return { canvas: [{ type: 'line', x1: 0, y1: 3, x2: maxLength, y2: 3, lineWidth: 0.4 }]}
  }

  getLineDashed(maxLength: number) {
    return { canvas: [{ type: 'line', x1: 0, y1: 3, x2: maxLength, y2: 3, lineWidth: 0.3, dash: { length: 5, space: 1 }  }]}
  }

getHeaderText(result: models.ISdaListResult ) {

if (result.records.length) {

  const text = `Nose Number: ${result.records[0].aircraftNo}\t\t\t\tSerial Number: ${result.records[0].serialNo}\t\t\t\tManufacturer: ${result.records[0].manufacturer}\t\t\t\tAircraft Model: ${result.records[0].model}\t\t\t\t`

  return text
    }

    return '';
}

}
